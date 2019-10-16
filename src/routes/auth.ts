import { Router } from "express";
import { validation } from "../helpers/verifyToken";
import { signin, signup, profile } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", validation, profile);

export default router;
