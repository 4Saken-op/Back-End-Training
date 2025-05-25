import { AuthService } from "../services/auth.service";
import { NextFunction, Router, Response, Request } from "express";

export class AuthController {
    constructor (
        private authService: AuthService,
        private router: Router
    ) {
        router.post("/login", this.login.bind(this))
    }

    async login(req: Request, res: Response, next:NextFunction) {
        try {
            const {email, password} = req.body;
            const data = await this.authService.login(email, password);
            res.status(200).send(data);
        } catch(error) {
            console.log(error);
            next();
        }
    }
}