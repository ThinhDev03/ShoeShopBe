import { STATUS } from "../configs/status";

export class ErrorHandler extends Error {
  status;
  error;
  constructor(status, error) {
    super();
    this.status = status;
    this.error = error;
  }
}

export const responseError = (res, error) => {
  if (error instanceof ErrorHandler) {
    // return res.status(status).send({ message: "Error mongoose" });
    const status = error.status;
    // Case just string
    if (typeof error.error === "string") {
      const message = error.error;
      return res.status(status).send({ message, data: null });
    }
    // Case error is object
    return res.status(status).send({
      message: "lỗi rồi ",
      data: errorObject
    });
  }
  return res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: error.message, data: null });
};

export const responseSuccess = (res, data) => {
  return res.status(STATUS.OK).send(data);
};
