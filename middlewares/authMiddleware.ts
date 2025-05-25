import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import { JWT_SECRET } from "../utils/constants";
import jwt from "jsonwebtoken"
import { JwtPayload } from "../dto/jwt-payload";

const getToken = (req: Request) => {
    const token:string = req.headers.authorization;
    if (!token) throw new HttpException(401, "Not Authorised!!");
    
    const tokenSplits = token.split(' ');
    if (tokenSplits.length != 2) throw new HttpException(401, "Invalid!!");
    return tokenSplits[1];
        
}

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const token = getToken(req);
    if (!token) throw new HttpException(401, "Not Authorized");
    console.log("Token generated: " + token);
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log(payload);
        req.user = payload;
    } catch {
        throw new HttpException(401, "Expired OR Invalid token");
    }
    next();
}