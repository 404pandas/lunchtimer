const router = require("express").Router();
const { Comment, Fact, User } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get all facts for homepage
router.get("/", async (req, res) => {
  try {
    // Get all comments with user data
    if (req.session.user_id) {
      const factData = await Fact.findAll({
        include: [{ model: User }, { model: Fact }, { model: Comment }],
        attributes: {},
      });

      const commentData = await Comment.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });

      const currentUser = {
        user_id: req.session.user_id,
        email: req.session.email,
        username: req.session.username,
      };
    } else {
      const factData = await Fact.findAll({
        include: [{ model: User }, { model: Fact }, { model: Comment }],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Comments AS comments
                            WHERE
                                fact.id = fact_id
                        )`),

              "commentCount",
            ],
          ],
        },
      });
      const factsU = factData.map((fact) => fact.get({ plain: true }));

      const facts = factsU.reverse();

      res.render("all-facts", {
        facts,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single fact by id
router.get("/fact/:id", withAuth, async (req, res) => {
  try {
    const factData = await Fact.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment },
        { model: Fact },
        { model: Comment, include: [{ model: User }] },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM Fact AS fact
                                WHERE
                                    fact.id = fact_id
                            )`),
            "factsCount",
          ],
          [
            Sequelize.literal(`(
                                SELECT COUNT(*) FROM Facts AS checks WHERE fact.id = fact_id AND ${req.session.user_id} = user_id
                            )`),
            "hasCommented",
          ],
        ],
      },
    });
    const fact = factData.get({ plain: true });

    const commentsData = await Comment.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const comments = commentsData.map((comment) =>
      comment.get({ plain: true })
    );

    const currentUser = {
      user_id: req.session.user_id,
      email: req.session.email,
      avatar: req.session.avatar,
      username: req.session.username,
    };

    res.render("single-comment", {
      currentUser,
      comments,
      fact,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/create-comments", withAuth, (req, res) => {
  const currentUser = {
    user_id: req.session.user_id,
    email: req.session.email,
    username: req.session.username,
  };

  res.render("create-comments", {
    currentUser,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
