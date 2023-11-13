import { responseError, responseSuccess } from "../../helpers/response";
import brandRepository from "../../repositories/product/brand.repository";

// [GET] api/brand
export const read = async (req, res) => {
  try {
    const data = await brandRepository.read();

    const response = {
      data,
      message: "Lấy danh sách brand thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
// [POST] api/brand/:id

export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await brandRepository.create(body);

    const response = {
      data,
      message: "Tạo brand thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/brand/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await brandRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật brand thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [GET] api/brand/:id
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await brandRepository.findById(id);
    const response = {
      data,
      message: "Lấy brand thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/brand/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await brandRepository.delete(id);

    const response = {
      data,
      message: "Xóa brand thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
