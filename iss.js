/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body).ip;
  
    callback(null, ipAddress);

  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {

      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo-cordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });

  });


};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {

      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Flyover Times for ISS. Response: ${body}`), null);
      return;
    }

    const flyTimes = JSON.parse(body).response;

    callback(null, flyTimes);

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ipAddress) => {
    if (error) {
      return callback(error, null);
    } else {
      fetchCoordsByIP(ipAddress, (error, coordinates) => {
        if (error) {
          return callback(error, null);
        } else {
          fetchISSFlyOverTimes(coordinates, (error, pastTimes) => {
            if (error) {
              return callback(error, null);
            } else {
              callback(null, pastTimes);
            }
          });
        }
      });
    }
  });
};

module.exports = { nextISSTimesForMyLocation };