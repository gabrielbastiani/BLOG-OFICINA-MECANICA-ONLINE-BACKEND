import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES CONFIGURATION BLOG --
import { CreateConfigurationBlogController } from "./controllers/configuration_blog/CreateConfigurationBlogController";
import { GetConfigurationsBlogController } from "./controllers/configuration_blog/GetConfigurationsBlogController";

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
import { CategoriesController } from "./controllers/category/CategoriesController";
import { GenerateExcelCategoryController } from "./controllers/category/GenerateExcelCategoryController";
import { BulkCategoryImportController } from "./controllers/category/BulkCategoryImportController";

// -- ROUTES POST --
import { PostCreateController } from "./controllers/post/PostCreateController";
import { PostUpdateDataController } from "./controllers/post/PostUpdateDataController";
import { PostDeleteController } from "./controllers/post/PostDeleteController";
import { AllPostController } from "./controllers/post/AllPostController";
import { GenerateExcelDeletePostsController } from "./controllers/post/GenerateExcelDeletePostsController";
import { BulkDeletePostsController } from "./controllers/post/BulkDeletePostsController";
import { GenerateExcelPostsController } from "./controllers/post/GenerateExcelPostsController";
import { BulkPostsImportController } from "./controllers/post/BulkPostsImportController";
import { PostLikeController } from "./controllers/post/PostLikeController";
import { UpdateViewsController } from "./controllers/post/UpdateViewsController";

// -- ROUTES POST CATEGORY --
import { PostCategoryCreateController } from "./controllers/post_category/PostCategoryCreateController";
import { PostCategoryUpdateDataController } from "./controllers/post_category/PostCategoryUpdateDataController";
import { PostCategoryDeleteController } from "./controllers/post_category/PostCategoryDeleteController";
import { PostCategoryFindController } from "./controllers/post_category/PostCategoryFindController";
import { CategoryUpdateOrderController } from "./controllers/category/CategoryUpdateOrderController";
import { MoveCategoryUpController } from "./controllers/category/MoveCategoryUpController";
import { MoveCategoryDownController } from "./controllers/category/MoveCategoryDownController";
import { AllCategoriesController } from "./controllers/category/AllCategoriesController";
import { BulkDeleteCategoryController } from "./controllers/category/BulkDeleteCategoryController";
import { GenerateExcelDeleteCategoryController } from "./controllers/category/GenerateExcelDeleteCategoryController";

// -- ROUTES COMMENT --
import { CommentCreateController } from "./controllers/comment/CommentCreateController";
import { CommentStatusController } from "./controllers/comment/CommentStatusController";
import { CommentDeleteController } from "./controllers/comment/CommentDeleteController";
import { AllCommentController } from "./controllers/comment/AllCommentController";
import { CommentLikeController } from "./controllers/comment/CommentLikeController";

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

// -- ROUTES TAG --
import { CreateTagController } from "./controllers/tag/CreateTagController";
import { GenerateExcelTagController } from "./controllers/tag/GenerateExcelTagController";
import { BulkTagsImportController } from "./controllers/tag/BulkTagsImportController";
import { BulkDeleteTagsController } from "./controllers/tag/BulkDeleteTagsController";
import { GenerateExcelDeleteTagController } from "./controllers/tag/GenerateExcelDeleteTagController";
import { AllTagController } from "./controllers/tag/AllTagController";
import { TagDeleteController } from "./controllers/tag/TagDeleteController";
import { UpdateTagController } from "./controllers/tag/UpdateTagController";

// -- ROUTES BLOG --
import { UserBlogCreateController } from "./controllers/user/user_blog/UserBlogCreateController";
import { UserBlogAuthController } from "./controllers/user/user_blog/UserBlogAuthController";
import { AllUserBlogController } from "./controllers/user/user_blog/AllUserBlogController";
import { UserBlogUpdateDataController } from "./controllers/user/user_blog/UserBlogUpdateDataController";
import { GenerateExcelDeleteUserBlogController } from "./controllers/user/user_blog/GenerateExcelDeleteUserBlogController";
import { BulkDeleteUsersBlogController } from "./controllers/user/user_blog/BulkDeleteUsersBlogController";
import { UserBlogDeleteController } from "./controllers/user/user_blog/UserBlogDeleteController";

// -- ROUTES DASHBOARD --
import { GetPostStatisticsController } from "./controllers/dashboard/GetPostStatisticsController";
import { GetCategoryStatisticsController } from "./controllers/dashboard/GetCategoryStatisticsController";
import { GetNewsletterStatisticsController } from "./controllers/dashboard/GetNewsletterStatisticsController";
import { GetCommentStatisticsController } from "./controllers/dashboard/GetCommentStatisticsController";
import { GetContactStatisticsController } from "./controllers/dashboard/GetContactStatisticsController";
import { GetUserGrowthMetricsController } from "./controllers/dashboard/GetUserGrowthMetricsController";

// -- ROUTES MARKETING --
import { CreateMarketingPublicationController } from "./controllers/marketing_publication/CreateMarketingPublicationController";
import { UpdateViewsPuplicationsController } from "./controllers/marketing_publication/UpdateViewsPuplicationsController";
import { AllMarketingPublicationController } from "./controllers/marketing_publication/AllMarketingPublicationController";
import { MarketingUpdateDataController } from "./controllers/marketing_publication/MarketingUpdateDataController";
import { GenerateExcelDeletePublicationController } from "./controllers/marketing_publication/GenerateExcelDeletePublicationController";
import { BulkDeleteMarketingPublicationController } from "./controllers/marketing_publication/BulkDeleteMarketingPublicationController";
import { MarketingPublicationDeleteDeleteController } from "./controllers/marketing_publication/MarketingPublicationDeleteDeleteController";
import { CreateTypeConfigurationMarketingController } from "./controllers/marketing_publication/configuration_marketing/CreateTypeConfigurationMarketingController";
import { AllTypeConfigurationMarketingController } from "./controllers/marketing_publication/configuration_marketing/AllTypeConfigurationMarketingController";
import { TypeConfigurationsUpdateDataController } from "./controllers/marketing_publication/configuration_marketing/TypeConfigurationsUpdateDataController";
import { TypeConfigurationMarketingDeleteController } from "./controllers/marketing_publication/configuration_marketing/TypeConfigurationMarketingDeleteController";
import { CreateConfigurationMarketingController } from "./controllers/marketing_publication/configuration_marketing/CreateConfigurationMarketingController";


const router = Router();
const upload_image = multer(uploadConfig.upload("./images"));
const temp_file = multer(uploadConfig.upload("./temp_file"));


// -- ROUTES CONFIGURATION BLOG --
router.post('/configuration_blog/create', upload_image.single('file'), new CreateConfigurationBlogController().handle);
router.get('/configuration_blog/get_configs', new GetConfigurationsBlogController().handle);

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
router.put('/category/updateOrder', isAuthenticated, new CategoryUpdateOrderController().handle);
router.put('/category/moveUp', isAuthenticated, new MoveCategoryUpController().handle);
router.put('/category/moveDown', isAuthenticated, new MoveCategoryDownController().handle);
router.put('/category/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.delete('/category/delete_category', isAuthenticated, new CategoryDeleteController().handle);
router.get('/category/cms', isAuthenticated, new CategoriesController().handle);
router.get('/category/cms/all_categories', isAuthenticated, new AllCategoriesController().handle);
router.get('/category/donwload_excel_categories', isAuthenticated, new GenerateExcelCategoryController().handle);
router.post('/category/bulk_categories', isAuthenticated, temp_file.single("file"), new BulkCategoryImportController().handle);
router.post('/category/bulk_delete_category', isAuthenticated, temp_file.single('file'), new BulkDeleteCategoryController().handle);
router.get('/category/download_excel_delete_category', isAuthenticated, new GenerateExcelDeleteCategoryController().handle);

// -- ROUTES POST --
router.post('/post/create_post', isAuthenticated, upload_image.single('file'), new PostCreateController().handle);
router.put('/post/update', isAuthenticated, upload_image.single('file'), new PostUpdateDataController().handle);
router.delete('/post/delete_post', isAuthenticated, new PostDeleteController().handle);
router.get('/post/cms', isAuthenticated, new AllPostController().handle);
router.get('/post/download_excel_delete_post', isAuthenticated, new GenerateExcelDeletePostsController().handle);
router.post('/post/bulk_delete_posts', isAuthenticated, temp_file.single('file'), new BulkDeletePostsController().handle);
router.get('/post/donwload_excel_posts', isAuthenticated, new GenerateExcelPostsController().handle);
router.post('/post/bulk_posts', isAuthenticated, temp_file.single("file"), new BulkPostsImportController().handle);
router.patch('/post/likes', new PostLikeController().handle);
router.patch("/post/:post_id/views", new UpdateViewsController().handle);

// -- ROUTES POST CATEGORY --
router.post('/post_category/create_post_category', isAuthenticated, new PostCategoryCreateController().handle);
router.put('/post_category/update', isAuthenticated, new PostCategoryUpdateDataController().handle);
router.delete('/post_category/delete', isAuthenticated, new PostCategoryDeleteController().handle);
router.get('/post_category/get_post_category', isAuthenticated, new PostCategoryFindController().handle);

// -- ROUTES COMMENT --
router.post('/comment/create_comment', isAuthenticated, new CommentCreateController().handle);
router.put('/comment/update_status', isAuthenticated, new CommentStatusController().handle);
router.patch('/comment/likes', new CommentLikeController().handle);
router.put('/comment/delete', isAuthenticated, new CommentDeleteController().handle);
router.get('/comment/cms/get_comments', isAuthenticated, new AllCommentController().handle);

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

// -- ROUTES TAG --
router.post('/tag/create_tag', isAuthenticated, new CreateTagController().handle);
router.get('/tag/donwload_excel_tag', isAuthenticated, new GenerateExcelTagController().handle);
router.post('/tag/bulk_tags', isAuthenticated, temp_file.single("file"), new BulkTagsImportController().handle);
router.post('/tag/bulk_delete_tags', isAuthenticated, temp_file.single('file'), new BulkDeleteTagsController().handle);
router.get('/tag/download_excel_delete_tags', isAuthenticated, new GenerateExcelDeleteTagController().handle);
router.get('/tag/all_tags', isAuthenticated, new AllTagController().handle);
router.delete('/tag/delete_tag', isAuthenticated, new TagDeleteController().handle);
router.put('/tag/update', isAuthenticated, new UpdateTagController().handle);

// -- ROUTES BLOG --
router.post('/user/user_blog/create', upload_image.single('file'), new UserBlogCreateController().handle);
router.post('/user/user_blog/session', new UserBlogAuthController().handle);
router.get('/user/user_blog/all_users_blog', isAuthenticated, new AllUserBlogController().handle);
router.put('/user/user_blog/update', isAuthenticated, upload_image.single('file'), new UserBlogUpdateDataController().handle);
router.get('/user/user_blog/download_excel_delete_users_blog', isAuthenticated, new GenerateExcelDeleteUserBlogController().handle);
router.post('/user/user_blog/bulk_delete_users_blog', isAuthenticated, temp_file.single('file'), new BulkDeleteUsersBlogController().handle);
router.delete('/user/user_blog/delete_user_blog', isAuthenticated, new UserBlogDeleteController().handle);

// -- ROUTES DASHBOARD --
router.get('/dashboard/posts/statistics', isAuthenticated, new GetPostStatisticsController().handle);
router.get('/dashboard/categories/statistics', isAuthenticated, new GetCategoryStatisticsController().handle);
router.get('/dashboard/newslatter/statistics', isAuthenticated, new GetNewsletterStatisticsController().handle);
router.get('/dashboard/comment/statistics', isAuthenticated, new GetCommentStatisticsController().handle);
router.get('/dashboard/contact/statistics', isAuthenticated, new GetContactStatisticsController().handle);
router.get('/dashboard/userBlog/statistics', isAuthenticated, new GetUserGrowthMetricsController().handle);

// -- ROUTES MARKETING --
router.post('/marketing_publication/create', isAuthenticated, upload_image.single('file'), new CreateMarketingPublicationController().handle);
router.patch('/marketing_publication/:marketingPublication_id/clicks', new UpdateViewsPuplicationsController().handle);
router.get('/marketing_publication/all_publications', isAuthenticated, new AllMarketingPublicationController().handle);
router.put('/marketing_publication/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.put('/marketing_publication/update', isAuthenticated, upload_image.single('file'), new MarketingUpdateDataController().handle);
router.get('/marketing_publication/download_excel_delete_marketing', isAuthenticated, new GenerateExcelDeletePublicationController().handle);
router.post('/marketing_publication/bulk_delete_publications', isAuthenticated, temp_file.single('file'), new BulkDeleteMarketingPublicationController().handle);
router.delete('/marketing_publication/delete_publications', isAuthenticated, new MarketingPublicationDeleteDeleteController().handle);
router.post('/marketing_configurations/create/type', isAuthenticated, new CreateTypeConfigurationMarketingController().handle);
router.get('/all_marketing_configurations/type', isAuthenticated, new AllTypeConfigurationMarketingController().handle);
router.put('/marketing_configurations/update/type', isAuthenticated, new TypeConfigurationsUpdateDataController().handle);
router.delete('/marketing_configurations/delete/type', isAuthenticated, new TypeConfigurationMarketingDeleteController().handle);
router.post('/marketing_configurations/configuration', isAuthenticated, new CreateConfigurationMarketingController().handle);


export { router }