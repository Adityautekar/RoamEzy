import { Router } from "express";
import { getBookings , addBooking, deleteBooking} from "../controllers/booking.controller.js";
const router = Router();

router.route('/bookings').post(addBooking);
router.route('/deletebooking').delete(deleteBooking);
router.route('/bookings').get(getBookings);

export default router;

