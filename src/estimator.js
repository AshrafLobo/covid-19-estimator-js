const covid19ImpactEstimator = (data) => {
  const covidData = {
    data,
    impact: {},
    severeImpact: {}
  };

  let numberOfDays = 0;

  switch (covidData.data.periodType) {
    case 'weeks':
      numberOfDays = covidData.data.timeToElapse * 7;
      break;
    case 'months':
      numberOfDays = covidData.data.timeToElapse * 30;
      break;
    default:
      numberOfDays = covidData.data.timeToElapse;
  }

  covidData.impact.currentlyInfected = covidData.data.reportedCases * 10;
  covidData.severeImpact.currentlyInfected = covidData.data.reportedCases * 50;

  covidData.impact.infectionsByRequestedTime = covidData.impact.currentlyInfected
    * (2 ** Math.trunc(numberOfDays / 3));
  covidData.severeImpact.infectionsByRequestedTime = covidData.severeImpact.currentlyInfected
    * (2 ** Math.trunc(numberOfDays / 3));

  covidData.impact.severeCasesByRequestedTime = Math.trunc(covidData
    .impact.infectionsByRequestedTime * 0.15);
  covidData.severeImpact.severeCasesByRequestedTime = Math.trunc(covidData
    .severeImpact.infectionsByRequestedTime * 0.15);

  covidData.impact.hospitalBedsByRequestedTime = Math.trunc(covidData.data.totalHospitalBeds * 0.35)
    - covidData.impact.severeCasesByRequestedTime;
  covidData.severeImpact.hospitalBedsByRequestedTime = Math.trunc(covidData.data.totalHospitalBeds
    * 0.35) - covidData.severeImpact.severeCasesByRequestedTime;

  covidData.impact.casesForICUByRequestedTime = covidData
    .impact.infectionsByRequestedTime * 0.05;
  covidData.severeImpact.casesForICUByRequestedTime = covidData
    .severeImpact.infectionsByRequestedTime * 0.05;

  covidData.impact.casesForVentilatorsByRequestedTime = Math.trunc(covidData
    .impact.infectionsByRequestedTime * 0.02);
  covidData.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(covidData
    .severeImpact.infectionsByRequestedTime * 0.02);

  covidData.impact.dollarsInFlight = Math.trunc((covidData.impact.infectionsByRequestedTime
    * 0.65 * 1.5) / 30);
  covidData.severeImpact.dollarsInFlight = Math.trunc((covidData
    .severeImpact.infectionsByRequestedTime * 0.65 * 1.5) / 30);

  return covidData;
};

export default covid19ImpactEstimator;
