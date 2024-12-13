import { Router } from "express"
import { subscribe } from "../controllers/subscribe";

const router = Router()

router.post("/email", subscribe)

export default router;
