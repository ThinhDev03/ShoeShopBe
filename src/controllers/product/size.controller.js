import { responseError, responseSuccess } from "../../helpers/response";
import sizeRepository from "../../repositories/product/size.repository";

// [GET] api/answer
export const read = async (req, res) => {
  try {
    const data = await sizeRepository.read();

    const response = {
      data,
      message: "Lấy danh sách size thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
// [POST] api/answer/question-id/:id

export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await sizeRepository.create(body);

    const response = {
      data,
      message: "Tạo size thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/admin/answer/update/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await sizeRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật size thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/admin/answer/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sizeRepository.delete(id);

    const response = {
      data,
      message: "Xóa size thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
