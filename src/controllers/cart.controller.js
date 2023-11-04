import { responseError, responseSuccess } from "../helpers/response";
import cartRepository from "../repositories/cart.repository";

export const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await cartRepository.find({ user_id: id });
    let totalMoney = 0;
    const newData = data.map((product) => {
      totalMoney += product.product_id.price * product.quantity;
      return {
        product_id: product.product_id.product_id._id,
        name: product.product_id.product_id.name,
        price: product.product_id.price,
        sale: product.product_id.sale,
        quantity: product.quantity,
        totalQuantity: product.product_id.quantity,
        image: product.product_id.image_id.image_url,
        color: product.product_id.color_id.color_name,
        size: product.product_id.size_id.size_name,
      };
    });
    console.log(data);
    const response = {
      data: {
        cart: newData,
        totalMoney,
      },
      message: "Lấy danh sách cart thành công",
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
    let data;
    if (hasCart) {
      const quantity = body.quantity + hasCart.quantity;
      data = await cartRepository.updateCart(product_id, { quantity });
    } else {
      data = await cartRepository.create(body);
    }

    const response = {
      data,
      message: "Tạo cart thành công",
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
      message: "Cập nhật cart thành công",
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
      message: "Xóa cart thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
