const express = require("express");
const router = express.Router();
const Conversation = require("../../models/conversationModel");

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.json({
      status: 200,
      error: false,
      data: savedConversation,
      msg: `Conversation created successfully`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });

    res.json({
      status: 200,
      error: false,
      data: conversation,
      msg: `Conversation fetched successfully`,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      error: true,
      msg: `${error}`,
    });
  }
});
module.exports = router;
