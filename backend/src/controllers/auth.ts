import User from '../models/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const Register = async (req: Request, res: Response) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}
const Login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("user not found");
        let validPassword;
        user != null && (validPassword = await bcrypt.compare(req.body.password, user.password))
        if (!validPassword) return res.status(400).json("wrong password")

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}


export default { Register, Login }

