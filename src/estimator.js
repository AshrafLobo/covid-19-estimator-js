const covid19ImpactEstimator = (data) => {
  const covidData = {
    data,
    impact: {},
    severeImpact: {}
  };

  const calcEstimation = (days, severe = false) => {
    const impactGrp = severe ? ['severeImpact', 50] : ['impact', 10];
    const impactData = covidData[impactGrp[0]];
    const factor = 2 ** Math.floor(days / 3);

    impactData.confirmedCases = covidData.data.reportedCases * impactGrp[1];
    impactData.infectionsByRequestedTime = impactData.confirmedCases * factor;
  };

  calcEstimation(28);
  calcEstimation(28, true);

  return covidData;
};

export default covid19ImpactEstimator;
