import User from "../models/user.model.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/claudinary.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUserForSideBar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      // find all the msgs there the sender is me and reciver is the other user OR the other way
      $or: [
        { senderId: myId, reciverId: userToChatid },
        { senderId: userToChatid, reciverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get getMassages Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // upload base64 image claudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      image: imageUrl,
    });

    // todo : realtime functionality goes here => socket.io
    await newMessage.save()

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({error:"Internal Sever Error"})
  }
};
