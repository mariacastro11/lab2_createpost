import {Request,Response,NextFunction } from "express";
import Boom from "@hapi/boom"
export const erroreMiddleware = (error: Error, 
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const boomError = Boom.boomify(error);
    return res.status(boomError.output.statusCode).json(boomError.output.payload);

};