import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async(req, res) => {

    try {
        const loggedInUserID = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserID}}).select("-password"); //Fetch all users ne or not equal to logged in user and no Password

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"});

    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find ({ //find all messages where I'm the sender or the other user is sending
            $or: [
                {senderId: myId, recieverId: userToChatId},
                {senderId: userToChatId, recieverId: myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});

    }
};

export const sendMessages = async (req, res) => {

    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageURL;

        if (image) { //if user sends image, upload to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);

            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            recieverId,
            text,
            image: imageURL,
        });

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);

    } catch (error) {

        console.error("Error in sendMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});

    }
};