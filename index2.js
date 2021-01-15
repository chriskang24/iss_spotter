
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { timeConverter } = require('./index');

nextISSTimesForMyLocation()

  .then(((pastTimes) => {
    timeConverter(pastTimes);
  }))

  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
