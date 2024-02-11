import { Request, Response } from "express";
import User from "../models/user";


//get a user
const getUser = async (req: Request, res: Response) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        //  user != null && (const { password, updatedAt, ...other } = user?._doc)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

export default { getUser }