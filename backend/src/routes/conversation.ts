import express from 'express';
import conversationController from '../controllers/conversation';
const router = express.Router();

router.post('/', conversationController.newConversation);
router.get('/:userId', conversationController.getConversationByUserId);
router.get('/find/:firstUserId/:secondUserId', conversationController.getConversation);

export = router;