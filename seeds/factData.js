const { Fact } = require("../models");

const factData = [{}, {}, {}, {}];

const seedFacts = () => Fact.bulkCreate(factData);

module.exports = seedFacts;
