const covid19ImpactEstimator = (data) => {
  const covidData = {
    data,
    impact: {},
    severeImpact: {}
  };

  let numberOfDays = 0;

  switch (data.periodType) {
    case 'weeks':
      numberOfDays = data.timeToElapse * 7;
      break;
    case 'months':
      numberOfDays = data.timeToElapse * 30;
      break;
    default:
      numberOfDays = data.timeToElapse;
  }

  const calcEstimation = (days, severe = false) => {
    const impactGrp = severe ? ['severeImpact', 50] : ['impact', 10];
    const impactData = covidData[impactGrp[0]];

    impactData.currentlyInfected = covidData.data.reportedCases * impactGrp[1];
    impactData.infectionsByRequestedTime = impactData.currentlyInfected
      * (2 ** Math.floor(days / 3));
    impactData.severeCasesByRequestedTime = Math.ceil((impactData.infectionsByRequestedTime
      * 15) / 100);
    impactData.hospitalBedsByRequestedTime = Math.floor((covidData.data.totalHospitalBeds
      * 35) / 100) - impactData.severeCasesByRequestedTime;
  };

  calcEstimation(numberOfDays);
  calcEstimation(numberOfDays, true);

  return covidData;
};

export default covid19ImpactEstimator;
