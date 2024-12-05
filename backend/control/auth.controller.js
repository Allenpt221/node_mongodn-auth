import { User } from '../models/auth.model.js';
import bcrypt  from 'bcrypt';

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);
    try{
        
        const newUser = new User({username, email, password:hashpassword});
        await newUser.save();
        return res.status(201).json({success: true, message: "User successfully create"});
    } catch(error){
        console.error("error", error);

        return res.status(500).json({success: false, message: "Error Creating Email or User already existing"});
    }
};

export const login = async (req, res) =>{
    const {username, email, password} = req.body;

    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!user){
            res.status(401).json({success: false, message: "Invalid Credentials"});
        }

        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: "Incorrect Password"});
        }

        if (username && username !== user.username) {
            return res.status(400).json({ success: false, message: "Invalid username" });
        }

        res.status(200).json({
            success: true,
            message: "Login successfully",
        });
    } catch (error){
        console.error("Error", error);

        return res.status(500).json({
            success: false,
            message: "Error"
        });
    }
};

export const logout = async (req, res) =>{
    res.status(200).json({success: true, message: "Logged out successfully"});
}