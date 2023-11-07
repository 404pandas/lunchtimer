const router = require("express").Router();
const { Fact } = require("../../models/");
const withAuth = require("../../utils/auth");

// /api/facts endpoint

//get single fact
router.get("/:id", async (req, res) => {
  try {
    const factData = await Fact.findByPk({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(factData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all facts
router.get("/", async (req, res) => {
  try {
    const factData = await Fact.findAll({});
    res.status(200).json(factData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
