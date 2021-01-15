const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('99.225.249.188', (error, geoLocation) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned Geolocation:", geoLocation);
// });

// fetchISSFlyOverTimes(({ latitude: 43.5181, longitude: -80.1873 }), (error, coordinates) => {

//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned Flyover Times:", coordinates);
// });



// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!

const timeConverter = function(pastTimes) {

  for (let time of pastTimes) {
    const convertedTime = new Date(0);

    convertedTime.setUTCSeconds(time.risetime);

    const duration = time.duration;


    console.log(`Next pass at ${convertedTime} for ${duration} seconds!`);
  }

};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  // timeConverter(passTimes); // commented out to not double execute when exported to index2.js,
  // comment line 55 back in for functionality for iss.js/index.js case
});


module.exports = { timeConverter };