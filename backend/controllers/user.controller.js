import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        
        const loggedInUserId = req.user._id

        //Find every user in database but the one is not equal to this loggedInUserId 
        //and the reason is when we display this users, the user connected is not display
        const filteredUsers = await User.find(({_id: {$ne: loggedInUserId} } )).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message)
        res.status(500).json({error: "Internal server error"});
    }
}