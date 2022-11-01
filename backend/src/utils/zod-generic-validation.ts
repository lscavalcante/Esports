import type { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
// import { badRequest } from '@hapi/boom';

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request,
  res: Response
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("111111111111111111111111111111111111111111")
    //   throw badRequest(error.message);
    // throw "Invalid";
    return res.json({"success": false})
    // console.log("first error");
    // res.statusCode == 400
    // throw res.send(error.message);
    }
    console.log("222222222222222222222222222222222222222222222222")
    // return badRequest(JSON.stringify(error));
    // return JSON.stringify(error);
    // console.log("secondary error");
    // res.statusCode == 500
    // throw res.send((JSON.stringify(error)))
    throw res.sendStatus(404).send({"success": false})
  }
}
