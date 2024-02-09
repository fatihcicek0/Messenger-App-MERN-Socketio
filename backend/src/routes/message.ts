import express from 'express';
import messageController from '../controllers/message';
const router = express.Router();

router.get('/:conversationId', messageController.getMessages);
router.post('/', messageController.addMessage);

export = router;

