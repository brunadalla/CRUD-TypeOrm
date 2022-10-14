import { NextFunction, Request, Response } from "express";

const ensureIsAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isAdm = req.user.isAdm

    if (!isAdm) {
        return res.status(403).json({
            message: 'User unauthorized'
        })
    }

    return next()
}

export default ensureIsAdmMiddleware