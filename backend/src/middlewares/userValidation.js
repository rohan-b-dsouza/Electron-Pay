import zod from "zod";
import mongoose from "mongoose";

export const userValidation = (req, res, next) => {
  const userValidateSchema = zod.object({
    userId: zod
      .string()
      .trim()
      .refine(mongoose.Types.ObjectId.isValid, { message: "Invalid User Id" })
  });
  const result = userValidateSchema.safeParse({userId: req.params.id});
  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0].message,
    });
  }
  next();
};
