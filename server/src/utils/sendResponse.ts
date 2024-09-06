import { Response } from "express";

interface ResponseData {
  [key: string]: unknown;
}

export const sendResponse = (
  res: Response,
  status: number,
  message: string,
  success: boolean,
  data: ResponseData = {}
) => {
  res.status(status).send({ success, message, ...data });
};
