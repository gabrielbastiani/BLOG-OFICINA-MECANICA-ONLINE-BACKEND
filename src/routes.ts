import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES USERS --
import { UserCreateController } from "./controllers/user/UserCreateController";
import { BulkUserImportController } from "./controllers/user/BulkUserImportController";
import { GenerateExcelController } from "./controllers/user/GenerateExcelController";
import { UserUpdateDataController } from "./controllers/user/UserUpdateDataController";
import { UserAuthController } from "./controllers/user/UserAuthController";
import { UserDetailController } from "./controllers/user/UserDetailController";
import { RequestPasswordUserRecoveryController } from "./controllers/user/RequestPasswordUserRecoveryController";
import { PasswordRecoveryUserController } from "./controllers/user/PasswordRecoveryUserController";
import { UserPhotoDeleteController } from "./controllers/user/UserPhotoDeleteController";
import { UserDeleteController } from "./controllers/user/UserDeleteController";
import { AllUserController } from "./controllers/user/AllUserController";
import { SuperUserPublicController } from "./controllers/user/SuperUserPublicController";

// -- ROUTES CATEGORY --
import { CategoryCreateController } from "./controllers/category/CategoryCreateController";
import { CategoryUpdateDataController } from "./controllers/category/CategoryUpdateDataController";
import { CategoryDeleteImageController } from "./controllers/category/CategoryDeleteImageController";
import { CategoryDeleteController } from "./controllers/category/CategoryDeleteController";
import { CategoryPagesController } from "./controllers/category/CategoryPagesController";

// -- ROUTES POST --
import { PostCreateController } from "./controllers/post/PostCreateController";
import { PostUpdateDataController } from "./controllers/post/PostUpdateDataController";
import { PostDeleteController } from "./controllers/post/PostDeleteController";
import { PostPagesController } from "./controllers/post/PostPagesController";

// -- ROUTES POST CATEGORY --
import { PostCategoryCreateController } from "./controllers/post_category/PostCategoryCreateController";
import { PostCategoryUpdateDataController } from "./controllers/post_category/PostCategoryUpdateDataController";
import { PostCategoryDeleteController } from "./controllers/post_category/PostCategoryDeleteController";
import { PostCategoryFindController } from "./controllers/post_category/PostCategoryFindController";

// -- ROUTES COMMENT --
import { CommentCreateController } from "./controllers/comment/CommentCreateController";
import { CommentStatusController } from "./controllers/comment/CommentStatusController";
import { CommentDeleteController } from "./controllers/comment/CommentDeleteController";
import { CommentFindController } from "./controllers/comment/CommentFindController";

// -- ROUTES FORM CONTACT --
import { FormContactCreateController } from "./controllers/form_contact/FormContactCreateController";
import { FormContactDeleteController } from "./controllers/form_contact/FormContactDeleteController";
import { FormContactFindController } from "./controllers/form_contact/FormContactFindController";
import { ContactController } from "./controllers/form_contact/ContactController";

// -- ROUTES NEWSLETTER --
import { NewsletterCreateController } from "./controllers/newsletter/NewsletterCreateController";
import { NewsletterDeleteController } from "./controllers/newsletter/NewsletterDeleteController";
import { NewsletterFindController } from "./controllers/newsletter/NewsletterFindController";

// -- ROUTES EXPORTDATA --
import { ExportDataController } from "./controllers/export_data/ExportDataController";

// -- ROUTES NOTIFICATION --
import { FindNotificationController } from "./controllers/notification/notification_user/FindNotificationController";
import { MarkNotificationReadController } from "./controllers/notification/notification_user/MarkNotificationReadController";
import { MarkAllNotificationsAsReadController } from "./controllers/notification/notification_user/MarkAllNotificationsAsReadController";
import { FindUsersNotificationController } from "./controllers/notification/notification_user/FindUsersNotificationController";
import { NotificationDeleteController } from "./controllers/notification/notification_user/NotificationDeleteController";
import { BulkDeleteUsersController } from "./controllers/user/BulkDeleteUsersController";
import { GenerateExcelDeleteUserController } from "./controllers/user/GenerateExcelDeleteUserController";



const router = Router();
const upload_image = multer(uploadConfig.upload("./images"));
const temp_file = multer(uploadConfig.upload("./temp_file"));


// -- ROUTES USERS --
router.post('/user/create', upload_image.single('file'), new UserCreateController().handle);
router.post("/user/bulk_users", isAuthenticated, temp_file.single("file"), new BulkUserImportController().handle);
router.get('/user/download_excel', isAuthenticated, new GenerateExcelController().handle);
router.post('/user/session', new UserAuthController().handle);
router.get('/user/me', isAuthenticated, new UserDetailController().handle);
router.put('/user/update', isAuthenticated, upload_image.single('file'), new UserUpdateDataController().handle);
router.put('/user/delete_photo', isAuthenticated, new UserPhotoDeleteController().handle);
router.post('/user/email_recovery_password', new RequestPasswordUserRecoveryController().handle);
router.put('/user/recovery_password', new PasswordRecoveryUserController().handle);
router.delete('/user/delete_user', isAuthenticated, new UserDeleteController().handle);
router.post('/user/bulk_delete_users', isAuthenticated, temp_file.single('file'), new BulkDeleteUsersController().handle);
router.get('/user/download_excel_delete_users', isAuthenticated, new GenerateExcelDeleteUserController().handle);
router.get('/user/all_users', isAuthenticated, new AllUserController().handle);
router.get('/user/publicSuper_user', new SuperUserPublicController().handle);

// -- ROUTES CATEGORY --
router.post('/category/create', isAuthenticated, upload_image.single('file'), new CategoryCreateController().handle);
router.put('/category/update', isAuthenticated, upload_image.single('file'), new CategoryUpdateDataController().handle);
router.put('/category/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.delete('/category/delete_category', isAuthenticated, new CategoryDeleteController().handle);
router.get('/category/cms', isAuthenticated, new CategoryPagesController().handle);

// -- ROUTES POST --
router.post('/post/create_post', isAuthenticated, upload_image.single('file'), new PostCreateController().handle);
router.put('/post/update', isAuthenticated, upload_image.single('file'), new PostUpdateDataController().handle);
router.delete('/post/delete_post', isAuthenticated, new PostDeleteController().handle);
router.get('/post/cms', isAuthenticated, new PostPagesController().handle);

// -- ROUTES POST CATEGORY --
router.post('/post_category/create_post_category', isAuthenticated, new PostCategoryCreateController().handle);
router.put('/post_category/update', isAuthenticated, new PostCategoryUpdateDataController().handle);
router.delete('/post_category/delete', isAuthenticated, new PostCategoryDeleteController().handle);
router.get('/post_category/get_post_category', isAuthenticated, new PostCategoryFindController().handle);

// -- ROUTES COMMENT --
router.post('/comment/create_comment', new CommentCreateController().handle);
router.put('/comment/update_status', isAuthenticated, new CommentStatusController().handle);
router.put('/comment/delete', isAuthenticated, new CommentDeleteController().handle);
router.get('/comment/cms/get_comments', isAuthenticated, new CommentFindController().handle);

// -- ROUTES FORM CONTACT --
router.post('/form_contact/create_form_contact', new FormContactCreateController().handle);
router.delete('/form_contact/delete_form_contatct', isAuthenticated, new FormContactDeleteController().handle);
router.get('/contacts_form/all_contacts', isAuthenticated, new FormContactFindController().handle);
router.get('/contacts_form/contact', isAuthenticated, new ContactController().handle);

// -- ROUTES NEWSLETTER --
router.post('/newsletter/create_newsletter', new NewsletterCreateController().handle);
router.delete('/newsletter/delete_newsletter', isAuthenticated, new NewsletterDeleteController().handle);
router.get('/newsletter/get_newsletters', isAuthenticated, new NewsletterFindController().handle);

// -- ROUTES EXPORTDATA --
router.post('/export_data', isAuthenticated, new ExportDataController().handle);

// -- ROUTES NOTIFICATION --
router.get('/user/notifications', isAuthenticated, new FindNotificationController().handle);
router.put('/notifications/mark-read', isAuthenticated, new MarkNotificationReadController().handle);
router.put('/notifications/mark-all-read', isAuthenticated, new MarkAllNotificationsAsReadController().handle);
router.get('/notifications_user/central_notifications', isAuthenticated, new FindUsersNotificationController().handle);
router.delete('/notifications_user/delete_notification', isAuthenticated, new NotificationDeleteController().handle);


export { router }