import express from 'express';
import authController from '../controllers/auth'
const router = express.Router();

router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.get('/', authController.Login);


export = router;