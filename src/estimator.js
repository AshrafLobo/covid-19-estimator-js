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
    impactData.severeCasesByRequestedTime = Math.floor(impactData.infectionsByRequestedTime * 0.15);
    impactData.hospitalBedsByRequestedTime = Math.floor(covidData.data.totalHospitalBeds
      * 0.35) - impactData.severeCasesByRequestedTime + 1;
    impactData.casesForICUByRequestedTime = Math.floor(impactData.infectionsByRequestedTime * 0.5);
    impactData.casesForVentilatorsByRequestedTime = Math.floor(impactData.infectionsByRequestedTime
      * 0.2);
    impactData.dollarsInFlight = Math.floor((impactData.infectionsByRequestedTime * 0.65 * 1.5)
      / days);
  };

  calcEstimation(numberOfDays);
  calcEstimation(numberOfDays, true);

  return covidData;
};

export default covid19ImpactEstimator;
