import Account from "../models/Account.js";
import mongoose from "mongoose";

export const transfer = async (req, res)=> {
    const {toUserId, amount} = req.body;
    const amountInPaise = Math.round(amount * 100);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (toUserId === req.userId) {
            await session.abortTransaction();
            return res.status(400).json({
                errors: {account: "Cannot transfer to your own account"}
            });
        }
        const fromAccount = await Account.findOne({ userId: req.userId}).session(session);
        if (!fromAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                errors: {account: "Your account doesn't exist"}
            });
        }
        {console.log(toUserId)}
        const toAccount = await Account.findOne({ userId: new mongoose.Types.ObjectId(toUserId)} ).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({
                errors: {account: "Payee account not found"}
            });
        }
        const result = await Account.updateOne(
            {_id: fromAccount._id, balance: { $gte: amountInPaise}}, 
            {$inc: {balance: -amountInPaise}},
            {session}
        );
        if (!result.modifiedCount) {
            await session.abortTransaction();
            return res.status(400).json({
                errors: {account: "Transaction failed due to insufficient balance"}
            });
        }
        await Account.findByIdAndUpdate(
            toAccount._id,
            {$inc: {balance: amountInPaise}},
            {session}
        );
        await session.commitTransaction();
        return res.status(200).json({
            message: "Your transaction is successful"
        });
    }
    catch(error) {
        await session.abortTransaction();
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
    finally {
        await session.endSession();
    }

}