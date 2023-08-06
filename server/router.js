
const userController = require('./controller/userController')

const router = require('express').Router()


//User Routes



router.post('/userregister',userController.userRegister)
router.post('/userlogin',userController.userLogin)
router.post('/postblog/:id',userController.postBlog)
router.get('/viewblogbyuser',userController.viewBlogByUser)
router.get('/loadblog/:blogid',userController.loadParticularBlog)
router.put('/updateblog/:blogid',userController.updateBlog)
router.delete('/deleteblog/:blogid',userController.deleteBlog)
router.post('/postcomment/:blogid',userController.postComment)

module.exports = router