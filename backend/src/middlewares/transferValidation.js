import zod from 'zod'
import mongoose from 'mongoose';

export const transferValidation = (req, res, next)=> {
    const transferSchema = zod.object({
        toUserId : zod.string().trim().refine(mongoose.Types.ObjectId.isValid, { message: "Invalid Recipient Id"}),
        amount: zod.number().positive("Amount must be greater than 0")
    });
    const result = transferSchema.safeParse(req.body);
    if (!result.success) {
        const errors = {};
        result.error.issues.forEach((err)=> {
            errors[err.path[0]] = err.message;
        });
        return res.status(400).json({
            errors
        });
    }
    next();
}