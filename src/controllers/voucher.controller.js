import { responseError, responseSuccess } from "../helpers/response";
import voucherRepository from "../repositories/voucher.repository";

// [GET] api/brand
export const read = async (req, res) => {
  try {
    const point_discount = parseInt(req.query.point_discount) || 0;
    const data = await voucherRepository.read();
    const newData = data.filter((item) => point_discount > item.point_discount);
    const response = {
      data: newData,
      message: "Lấy danh sách voucher thành công",
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
    const data = await voucherRepository.create(body);

    const response = {
      data,
      message: "Tạo voucher thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await voucherRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật voucher thành công",
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

    const data = await voucherRepository.findById(id);
    const response = {
      data,
      message: "Lấy voucher thành công",
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
    const data = await voucherRepository.delete(id);

    const response = {
      data,
      message: "Xóa voucher thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
