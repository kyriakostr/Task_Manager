const {Router} = require('express');
const {requireauth} = require('../middleware/authmiddleware');
const dashboardcontrollers = require('../controllers/dashboardcontrollers');
const router = Router();

router.get('/',requireauth,dashboardcontrollers.dashboardget);
router.get('/Add_Note',requireauth,dashboardcontrollers.addnote);
router.get('/Build_Team',requireauth,dashboardcontrollers.buildyourteam);
router.post('/Build_Team',requireauth,dashboardcontrollers.postyourteam)
router.get('/Build_Team/get',requireauth,dashboardcontrollers.getusers);

router.get('/Your_Teams',requireauth,dashboardcontrollers.seeyourteam);
router.get('/Your_Teams/:user_id',requireauth,dashboardcontrollers.seeyourteamget);

router.get('/Add_Note/:month/:year/:user_id',dashboardcontrollers.getevents);
router.get('/Add_Note/:day/:month/:year/:user_id',dashboardcontrollers.geteventsfornotes);
router.post('/Add_Note',dashboardcontrollers.postevents);

router.get('/Chatrooms',requireauth,dashboardcontrollers.getchatrooms);
router.get('/Chatrooms/GET',requireauth,dashboardcontrollers.getusers);
router.get('/Chatrooms/chats/:id',requireauth,dashboardcontrollers.getchats);
router.get('/Chatrooms/:id',requireauth,dashboardcontrollers.userchat);
router.post('/Chatrooms/:id',requireauth,dashboardcontrollers.postmessage);
router.get('/getoldmessages/:id',requireauth,dashboardcontrollers.getoldmessages);

module.exports = router;