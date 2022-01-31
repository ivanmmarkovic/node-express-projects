
const expresss = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth');

router 
    .route("/login")
        .post(AuthController.login);

router
    .route("/logout")
        .post(AuthController.logout);


module.exports = router;
