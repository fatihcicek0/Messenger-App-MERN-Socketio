import { Document } from 'mongoose';

export default interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: Array<any>;
    followings?: Array<any>;
    isAdmin?: boolean;
    desc?: string;
    city?: string;
    from?: string;
    relationship?: Array<1 | 2 | 3>
}