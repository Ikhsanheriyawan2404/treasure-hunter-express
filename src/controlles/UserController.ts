import { Request, Response } from "express";
import User from "../db/models/User";

class UserController {
    
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const users = await User.findAll();
        
            return res.status(200).json({
                message: "All users",
                data: users
            });
        } catch (e: any) {
        
            return res.status(500).json({
                message: e.message,
                errors: e
            });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const user = await User.create({
                name,
                email,
                password
            });
        
            return res.status(201).json({
                message: "User created",
                data: user
            });
        } catch (e: any) {
        
            return res.status(500).json({
                message: e.message,
                errors: e
            });
        }
    }
}

export default new UserController();