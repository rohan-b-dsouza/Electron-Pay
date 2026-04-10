import zod from "zod";
export const userSignupValidation = (req, res, next) => {
  const userSignupSchema = zod.object({
    email: zod
      .email("Email entered is invalid")
      .min(1, "Email is required")
      .max(100, "Email is too long")
      .trim(),
    username: zod
      .string()
      .min(3, "Username must be atleast 3 characters")
      .max(30, "Username too long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscores",
      ),
    password: zod
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Must contain a mix of letters, numbers & symbols (min 8 characters)",
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
