import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/User";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  
  // constructor() {
  //   this.jwtSign = this.jwtSign.bind(this);
  // }

  public static jwtSign = (payload: any, expiresIn: string) => {
    const secret = process.env.JWT_SECRET ?? "";
    const token = jwt.sign(payload, secret, { expiresIn });
    return token
  }; 

  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.findAll();

      return res.status(200).json({
        message: "All users",
        data: users,
      });
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Missing required fields",
          errors: "name, email and password are required",
        });
      }

      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({
          message: "User already exists",
          errors: "email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "User created",
        data: user,
      });
    } catch (e: any) {
      return res.status(500).json({
        message: e.message,
        errors: e,
      });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        errors: "email and password are required",
      });
    }

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (!userExists) {
      return res.status(400).json({
        message: "User not registered",
        errors: "email not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        errors: "password is incorrect",
      });
    }

    const accessTokenExpired = process.env.ACCESS_TOKEN_JWT_EXPIRE;
    const refreshTokenExpired = process.env.REFRESH_TOKEN_JWT_EXPIRE;

    const payload = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    }

    const accessToken = UserController.jwtSign(payload, accessTokenExpired ?? ""); 
    const refreshToken = UserController.jwtSign(payload, refreshTokenExpired ?? ""); 

    return res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: "strict"
    }).cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: "strict" 
    }).status(200).json({
      message: "User logged in",
      data: userExists,
    });
  }
}

export default new UserController();
