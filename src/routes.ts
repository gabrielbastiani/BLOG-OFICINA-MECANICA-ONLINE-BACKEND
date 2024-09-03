import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES USERS --
import { UserCreateController } from "./controllers/UserCreateController";

const router = Router();
const upload = multer(uploadConfig.upload("./images"));

// -- ROUTES USERS --
router.post('/user/create', upload.single('file'), new UserCreateController().handle);


export { router }