import zod from "zod";
export const userSignupValidation = (req, res, next) => {
  const userSignupSchema = zod.object({
    email: zod
      .email("Email entered is invalid")
      .min(1, "Email is required")
      .trim(),
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
  const result = userSignupSchema.safeParse(req.body);
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
