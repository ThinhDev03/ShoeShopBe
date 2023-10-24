import { responseError, responseSuccess } from "../../helpers/response";
import categoryRepository from "../../repositories/product/category.repository";

// [GET] api/category
export const read = async (req, res) => {
  try {
    const data = await categoryRepository.read();

    const response = {
      data,
      message: "Lấy danh sách danh mục thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/category/:id
export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await categoryRepository.create(body);

    const response = {
      data,
      message: "Tạo danh mục thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/category/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await categoryRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật danh mục thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [GET] api/category/:id
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await categoryRepository.findById(id);

    const response = {
      data,
      message: "Lấy danh mục thành công.",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/category/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await categoryRepository.delete(id);

    const response = {
      data,
      message: "Xóa danh mục thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
