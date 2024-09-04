import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES USERS --
import { UserCreateController } from "./controllers/UserCreateController";
import { UserUpdateDataController } from "./controllers/UserUpdateDataController";
import { UserAuthController } from "./controllers/UserAuthController";
import { UserDetailController } from "./controllers/UserDetailController";
import { UserUpdateStatusController } from "./controllers/UserUpdateStatusController";
import { RequestPasswordUserRecoveryController } from "./controllers/RequestPasswordUserRecoveryController";
import { PasswordRecoveryUserController } from "./controllers/PasswordRecoveryUserController";

const router = Router();
const upload = multer(uploadConfig.upload("./images"));

// -- ROUTES USERS --
router.post('/user/create', upload.single('file'), new UserCreateController().handle);
router.post('/user/session', new UserAuthController().handle);
router.get('/user/me', isAuthenticated, new UserDetailController().handle);
router.put('/user/update', isAuthenticated, upload.single('file'), new UserUpdateDataController().handle);
router.put('/user/update_status', isAuthenticated, new UserUpdateStatusController().handle);
router.post('/user/email_recovery_password', new RequestPasswordUserRecoveryController().handle);
router.put('/user/recovery_password', new PasswordRecoveryUserController().handle);


export { router }