const { Fact } = require("../models");

const factData = [
  { fact_text: "testesetst" },
  { fact_text: "testesetst" },
  { fact_text: "testesetst" },
  { fact_text: "testesetst" },
];

const seedFacts = () => Fact.bulkCreate(factData);

module.exports = seedFacts;
