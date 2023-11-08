import { responseError, responseSuccess } from "../helpers/response";
import commentRepository from "../repositories/comment.repository";

// [GET] api/comment
export const getByProductId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await commentRepository.find({ product_id: id });
    const newData = data.map((comment) => {
      return {
        _id: comment._id,
        user_name: comment.user_id.fullname,
        description: comment.description,
        rate: comment.rate,
        createdAt: comment.createdAt,
      };
    });
    const response = {
      data: newData,
      message: "Lấy danh sách bình luận thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);

  }
};
// [POST] api/comment/:id

export const create = async (req, res) => {
  try {
    const body = req.body;
    const data = await commentRepository.create(body);

    const response = {
      data,
      message: "Tạo bình luận thành công ",
    };


    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/comment/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await commentRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật bình luận thành công ",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/comment/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await commentRepository.delete(id);

    const response = {
      data,
      message: "Xóa bình luận thành công !!!",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
