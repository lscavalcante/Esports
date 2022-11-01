import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (error: any) {

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors
            });
        } else {
            return res.json(400).json(
                {
                    success: false,
                    errors: JSON.stringify(error)
                }
            )
        }
    }
};