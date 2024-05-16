import  express  from "express"
import UserController from "../controller/user.js"
import {Validate} from "../middleware/Validate.js"
import { AdminGaurd } from "../middleware/AdminGuard.js"

const router = express.Router()

router.get('/',Validate,AdminGaurd,UserController.getAllUsers )
router.get('/:id',Validate, UserController.getUserById)
router.post('/signup',UserController.signUp )
router.post('/login',UserController.login )
router.post('/logout',UserController.logout )

export default router