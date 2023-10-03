const express = require("express");
const router = express.Router();
const Message = require("../../models/messageModel");

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();

    res.json({
      status: 200,
      error: false,
      data: savedMessage,
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
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.json({
      status: 200,
      error: false,
      data: messages,
      msg: `Messages fetched successfully`,
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
