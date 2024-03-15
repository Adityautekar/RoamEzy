import { Router } from "express";
import {RegisterUser, getProfile, logoutUser, LoginUser, addProfile, uploadAvatar,wishlistPlace, getWishlist, getOwner, updatePassword, updateCredentails} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/register').post(RegisterUser);
router.route('/login').post(LoginUser);
router.route('/profile').put(addProfile);
router.route('/newpass').put(updatePassword);
router.route('/profile').get(getProfile);
router.route('/uploadAvatar').post(upload.fields([{name:"avatar", maxCount:1}]), uploadAvatar)
router.route('/wishlistplace').put(wishlistPlace);
router.route('/logout').post(logoutUser);
router.route('/user-wishlist').get(getWishlist);
router.route('/owner/:id').get(getOwner);
router.route('/credentials').put(updateCredentails);
export default router;