import { responseError, responseSuccess } from "../../helpers/response";
import colorRepository from "../../repositories/product/color.repository";

// [GET] api/color
export const read = async (req, res) => {
  try {
    const data = await colorRepository.read();

    const response = {
      data,
      message: "Lấy danh sách màu thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
// [POST] api/color/:id

export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await colorRepository.create( body );

    const response = {
      data,
      message: "Tạo màu thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/color/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await colorRepository.update( id, body );

    const response = {
      data,
      message: "Cập nhật màu thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [GET] api/color/:id
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await colorRepository.findById(id);

    const response = {
      data,
      message: "Lấy màu thành công.",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/color/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await colorRepository.delete(id);

    const response = {
      data,
      message: "Xóa màu thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
