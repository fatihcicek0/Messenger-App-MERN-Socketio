import {Document} from "mongoose";

export default interface IMessage extends Document {
    conversationId: string;
    sender: string;
    text: string;
}
