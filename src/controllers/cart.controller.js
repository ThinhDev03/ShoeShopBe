import { responseError, responseSuccess } from "../helpers/response";
import cartRepository from "../repositories/cart.repository";
import productDetail from "../database/models/product/product-detail.model";
import { json } from "express";
import { STATUS } from "../configs/status";

const MAX_QUANTITY = 5;

export const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartRepository.find({ user_id: id });
    let totalMoney = 0;
    const newData = data.map((product) => {
      return {
        cart_id: product._id,
        product_id: product.product_id._id,
        name: product.product_id.product_id.name,
        price: product.product_id.price,
        sale: product.product_id.sale || 0,
        quantity: product.quantity,
        totalQuantity: product.product_id.quantity,
        image: product.product_id.image_id.image_url,
        color: product.product_id.color_id.color_code,
        size: product.product_id.size_id.size_name,
      };
    });
    const response = {
      data: {
        cart: newData,
        totalMoney,
      },
      message: "Lấy danh sách giỏ hàng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const product_id = body.product_id;
    const hasCart = await cartRepository.findOne({ product_id });
    const dataDetail = await productDetail.findOne({ _id: product_id });
    let data;

    if (hasCart && dataDetail) {
      const detailQuantity = dataDetail.quantity;
      if (hasCart.quantity === MAX_QUANTITY) {
        console.log(1);
        const response = {
          data: null,
          message: "Số lượng trong giỏ hàng đã đạt tới giới hạn cho phép.",
        };
        return res.status(STATUS.BAD_REQUEST).send(response);
      }

      if (detailQuantity <= MAX_QUANTITY) {
        if (body.quantity > detailQuantity) {
          return res.status(STATUS.BAD_REQUEST).send({
            data: null,
            message: "Số lượng trong giỏ hàng lớn hơn số lượng hàng trong kho.",
          });
        }
      }

      const totalQuantity = body.quantity + hasCart.quantity;
      if (totalQuantity > detailQuantity) {
        return res.status(STATUS.BAD_REQUEST).send({
          data: null,
          message: "Số lượng trong giỏ hàng vượt quá số lượng trong kho.",
        });
      }

      if (totalQuantity > MAX_QUANTITY) {
        console.log(3);
        return res.status(STATUS.BAD_REQUEST).send({
          data: null,
          message: "Số lượng trong giỏ hàng đã đạt tới giới hạn cho phép.",
        });
      }

      // Nếu không có điều kiện nào ngăn cản, cập nhật giỏ hàng
      data = await cartRepository.updateCart(product_id, {
        quantity: totalQuantity,
      });
    } else {
      data = await cartRepository.create(body);
    }

    const response = {
      data,
      message: "Tạo giỏ hàng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    console.log(error);
    return responseError(res, error);
  }
};

export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await cartRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật giỏ hàng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cartRepository.delete(id);

    const response = {
      data,
      message: "Xóa giỏ hàng thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
