const router = require("express").Router();
const { Comment } = require("../../models/");

// The /api/comments endpoint

// Find all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: Fact }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one comment
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Fact,
        },
      ],
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create comment
router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update comment
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    res
      .status(200)
      .json(`The following comment has been updated: ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete comment
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found!" });
      return;
    }

    res
      .status(200)
      .json(`The following comment has been deleted: ${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
