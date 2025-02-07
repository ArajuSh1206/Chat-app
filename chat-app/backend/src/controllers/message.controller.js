import User from "../models/user.model.js";

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