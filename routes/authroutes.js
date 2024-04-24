const {Router} = require('express');

const router = Router();
const authcontrollers = require('../controllers/authcontrollers');
const {requireauth,checkuser} = require('../middleware/authmiddleware');

router.get('/signup',checkuser,authcontrollers.signup_get);
router.get('/login',checkuser,authcontrollers.login_get);
router.post('/signup',authcontrollers.signup_post);
router.post('/login',authcontrollers.login_post);
router.get('/logout',authcontrollers.logout_get);
router.get('/waitingverification',authcontrollers.waitingverification)
router.get('/verify-email',authcontrollers.verifiedemail)

module.exports = router;