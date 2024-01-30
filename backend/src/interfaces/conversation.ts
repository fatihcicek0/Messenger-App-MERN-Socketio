import { Document } from 'mongoose';

export default interface IConversation extends Document {
    members: Array<any>;
}