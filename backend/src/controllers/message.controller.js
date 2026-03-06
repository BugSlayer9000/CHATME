import User from "../models/user.model.js";
import Message from "../models/message.models.js"

export const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers)
  } catch (error) {
    console.error("Error in getUserForSideBar", error.message);
    res.status(500).json({error:"Internal server error"})
  }
};


export const getMessages = async (req,res) => {
  try {
    const {id:userToChatid} = req.params
    const myId = req.user._id

    const messages = await Message.find({
      // find all the msgs there the sender is me and reciver is the other user OR the other way
      $or:[
        {senderId:myId, reciverId:userToChatid},
        {senderId:userToChatid, reciverId:myId}
      ]
    })

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in get getMassages Controller:", error.message);
    res.status(500).json({error:"Internal Server Error"})
    
  }
}