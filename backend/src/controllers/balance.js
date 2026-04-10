import Account from "../models/Account.js";

export const balance = async (req, res)=> {
    try {
        console.log(req.userId);
        const account = await Account.findOne( { userId: req.userId });
        if (account) {
            return res.status(200).json({
                balance: account.balance
            });
        }
        return res.status(404).json({
            message: "Account doesn't exist"
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"    
        });
    }
}