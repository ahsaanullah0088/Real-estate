import express from 'express';

import {  signin, signup , signout} from '../controller/auth.controller.js';

const router = express.Router();

router.post("/signup" , signup)
router.post("/signin" , signin)
router.get("/signout" , signout)
// router.post("/google", google)


export default router;