import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES USERS --
import { UserCreateController } from "./controllers/user/UserCreateController";
import { UserUpdateDataController } from "./controllers/user/UserUpdateDataController";
import { UserAuthController } from "./controllers/user/UserAuthController";
import { UserDetailController } from "./controllers/user/UserDetailController";
import { RequestPasswordUserRecoveryController } from "./controllers/user/RequestPasswordUserRecoveryController";
import { PasswordRecoveryUserController } from "./controllers/user/PasswordRecoveryUserController";
import { UserPhotoDeleteController } from "./controllers/user/UserPhotoDeleteController";
import { UserDeleteController } from "./controllers/user/UserDeleteController";
import { AllUserController } from "./controllers/user/AllUserController";

// -- ROUTES CATEGORY --
import { CategoryCreateController } from "./controllers/category/CategoryCreateController";
import { CategoryUpdateDataController } from "./controllers/category/CategoryUpdateDataController";
import { CategoryDeleteImageController } from "./controllers/category/CategoryDeleteImageController";
import { CategoryDeleteController } from "./controllers/category/CategoryDeleteController";
import { CategoryPagesController } from "./controllers/category/CategoryPagesController";

// -- ROUTES POST --
import { PostCreateController } from "./controllers/post/PostCreateController";
import { PostUpdateDataController } from "./controllers/post/PostUpdateDataController";



const router = Router();
const upload = multer(uploadConfig.upload("./images"));

// -- ROUTES USERS --
router.post('/user/create', upload.single('file'), new UserCreateController().handle);
router.post('/user/session', new UserAuthController().handle);
router.get('/user/me', isAuthenticated, new UserDetailController().handle);
router.put('/user/update', isAuthenticated, upload.single('file'), new UserUpdateDataController().handle);
router.put('/user/delete_photo', isAuthenticated, new UserPhotoDeleteController().handle);
router.post('/user/email_recovery_password', new RequestPasswordUserRecoveryController().handle);
router.put('/user/recovery_password', new PasswordRecoveryUserController().handle);
router.delete('/user/delete_user', isAuthenticated, new UserDeleteController().handle);
router.get('/user/all_users', isAuthenticated, new AllUserController().handle);

// -- ROUTES CATEGORY --
router.post('/category/create', isAuthenticated, upload.single('file'), new CategoryCreateController().handle);
router.put('/category/update', isAuthenticated, upload.single('file'), new CategoryUpdateDataController().handle);
router.put('/category/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.delete('/category/delete_category', isAuthenticated, new CategoryDeleteController().handle);
router.get('/category/cms', isAuthenticated, new CategoryPagesController().handle);

// -- ROUTES POST --
router.post('/post/create_post', isAuthenticated, upload.single('file'), new PostCreateController().handle);
router.put('/post/update', isAuthenticated, upload.single('file'), new PostUpdateDataController().handle);


export { router }