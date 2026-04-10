import User from "../models/User.js"

export const me = async (req, res)=> {
    try {
        const user = await User.findById(req.userId).select("email username firstName lastName");
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const {email, username, firstName, lastName} = user;
        return res.status(200).json({
            email,
            username, 
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