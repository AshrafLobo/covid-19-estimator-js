const covid19ImpactEstimator = (data) => {
  const covidData = {
    data,
    impact: {},
    severeImpact: {}
  };

  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    region: {
      avgDailyIncomeInUSD
    }
  } = covidData.data;

  let numberOfDays = 0;

  switch (periodType) {
    case 'weeks':
      numberOfDays = timeToElapse * 7;
      break;
    case 'months':
      numberOfDays = timeToElapse * 30;
      break;
    default:
      numberOfDays = timeToElapse;
  }

  const calcEstimation = (days, severe = false) => {
    const impactGrp = severe ? ['severeImpact', 50] : ['impact', 10];
    const impactData = covidData[impactGrp[0]];

    impactData.currentlyInfected = reportedCases * impactGrp[1];
    impactData.infectionsByRequestedTime = impactData.currentlyInfected
      * (2 ** Math.trunc(days / 3));
    impactData.severeCasesByRequestedTime = Math.trunc(impactData.infectionsByRequestedTime * 0.15);
    impactData.hospitalBedsByRequestedTime = Math.trunc(totalHospitalBeds * 0.35
      - impactData.severeCasesByRequestedTime);
    impactData.casesForICUByRequestedTime = Math.trunc(impactData.infectionsByRequestedTime * 0.05);
    impactData.casesForVentilatorsByRequestedTime = Math.trunc(impactData.infectionsByRequestedTime
      * 0.02);
    impactData.dollarsInFlight = Math.trunc((impactData.infectionsByRequestedTime
      * 0.65 * avgDailyIncomeInUSD) / days);
  };

  calcEstimation(numberOfDays);
  calcEstimation(numberOfDays, true);

  return covidData;
};

export default covid19ImpactEstimator;
