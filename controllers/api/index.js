const router = require("express").Router();

const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes.js");
const factRoutes = require("./fact-routes.js");
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/facts", factRoutes);

module.exports = router;
