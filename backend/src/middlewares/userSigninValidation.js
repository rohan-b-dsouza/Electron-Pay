import zod from "zod";
export const userSigninValidation = (req, res, next) => {
  const userSigninSchema = zod.object({
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
  });
  const result = userSigninSchema.safeParse(req.body);
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
