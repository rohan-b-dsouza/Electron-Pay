import User from "../models/User.js"

export const getUser = async (req, res)=> {
    try {
        const toUserId = req.params.id;
        const user = await User.findById(toUserId).select("firstName lastName");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const {firstName, lastName} = user;
        return res.status(200).json({
            firstName,
            lastName
        });
    }
    catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}