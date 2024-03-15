import { Router } from "express";
import { addPlace, getAllPlaces, getSinglePlace, updatePlace, userPlaces , uploadPhoto, deletePlace, deletePhoto, queryPlaces} from "../controllers/place.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router  = Router();

router.route('/places').post(addPlace);

router.route('/upload').post(upload.fields([{ name:"photos", maxCount:1}]), uploadPhoto)
router.route('/deletePlace').delete(deletePlace);
router.route('/user-places').get(userPlaces);
router.route('/deletePhoto').delete(deletePhoto);
router.route('/places/:id').get(getSinglePlace);

router.route('/places').put(updatePlace);

router.route('/places').get(getAllPlaces);
router.route('/search').post(queryPlaces)
export default router;