import zod from "zod";
export const userUpdateValidation = (req, res, next) => {
  const userUpdateSchema = zod.object({
    password: zod
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        "Must contain a mix of letters, numbers & symbols",
      ),
    firstName: zod
      .string()
      .min(1, "First name is required")
      .max(50, "First name too long")
      .trim(),
    lastName: zod
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name too long")
      .trim(),
  });
  const result = userUpdateSchema.safeParse(req.body);
  if (!result.success) {
    const errors = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return res.status(400).json({
      errors,
    });
  }
  next();
};
