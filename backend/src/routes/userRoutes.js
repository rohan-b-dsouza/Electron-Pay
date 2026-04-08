import {Router} from "express"
import { userSignupValidation } from "../middlewares/userSignupValidation.js";
import { signup } from "../controllers/signup.js";
import { userSigninValidation } from "../middlewares/userSigninValidation.js";
import { signin } from "../controllers/signin.js";
import { authMiddleware } from "../middlewares/auth.js";
import { userUpdateValidation } from "../middlewares/userUpdateValidation.js";
import { updateUser } from "../controllers/updateUser.js";
import { searchUsers } from "../controllers/searchUsers.js";
import { me } from "../controllers/me.js";
import { getUser } from "../controllers/getUser.js";
import { userValidation } from "../middlewares/userValidation.js";

const userRouter = Router();

userRouter.post('/signup', userSignupValidation, signup);

userRouter.post('/signin', userSigninValidation, signin);

userRouter.put('/update', authMiddleware, userUpdateValidation, updateUser);

userRouter.get('/search', authMiddleware, searchUsers);

userRouter.get('/me', authMiddleware, me);

userRouter.get('/:id', authMiddleware, userValidation, getUser);

export default userRouter;