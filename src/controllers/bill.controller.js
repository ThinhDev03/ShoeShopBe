import billDetailModel from "../database/models/bill-detail.model";
import billModel from "../database/models/bill.model";
import productDetailModel from "../database/models/product/product-detail.model";
import { responseError, responseSuccess } from "../helpers/response";
import billDetailRepository from "../repositories/bill-detail.repository";
import billRepository from "../repositories/bill.repository";
import cartRepository from "../repositories/cart.repository";
import paymentRepository from "../repositories/payment.repository";

// [GET] api/bill
export const read = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";
    const perPage = limit * page - limit;

    const filterOptions = {
      receiver: { $regex: search, $options: "i" },
      status: { $regex: status, $options: "i" },
    };

    const bill = await billModel
      .find(filterOptions)
      .skip(perPage)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await billRepository.totalRecord(filterOptions);
    const pageSize = Math.ceil(total / limit);

    const response = {
      data: bill,
      total,
      pageSize,
      currentPage: page,
      message: "Lấy danh sách bill thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "";
    const perPage = limit * page - limit;

    const filterOptions = {
      receiver: { $regex: search, $options: "i" },
      status: { $regex: status, $options: "i" },
      user_id: id,
    };

    const bill = await billModel
      .find(filterOptions)
      .skip(perPage)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await billRepository.totalRecord(filterOptions);
    const totalPage = Math.ceil(total / limit);

    const response = {
      data: bill,
      total,
      totalPage,
      currentPage: page,
      message: "Lấy danh sách bill thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await billRepository.findById(id);
    const billDetail = await billDetailModel.find({
      bill_id: id,
    });
    const flatData = billDetail.map((order) => ({
      _id: order._id,
      bill_id: order.bill_id._id,
      createdAt: order.createdAt,
      productDetail_id: order.product_id.product_id._id,
      product_name: order.product_id.product_id.name,
      price: order.product_id.price,
      size: order.product_id.size_id.size_name,
      color: order.product_id.color_id.color_name,
      image: order.product_id.image_id.image_url,
      quantity: order.quantity,
    }));
    console.log(billDetail);
    const response = {
      data,
      billDetail: flatData,
      message: "Lấy danh sách bill thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getBillDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await billDetailModel.find({
      bill_id: id,
    });
    const flatData = data.map((order) => ({
      _id: order._id,
      bill_id: order.bill_id._id,
      createdAt: order.createdAt,
      productDetail_id: order.product_id.product_id._id,
      product_name: order.product_id.product_id.name,
      price: order.product_id.price,
      size: order.product_id.size_id.size_name,
      color: order.product_id.color_id.color_name,
      image: order.product_id.image_id.image_url,
      quantity: order.quantity,
    }));
    const response = {
      data: flatData,
      message: "Lấy danh sách bill thành công",
    };
    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/bill/create
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { products, payment_method, ...restBody } = body;

    const payment = await paymentRepository.create({
      status: "UNPAID",
      payment_method: payment_method,
    });

    const formBody = {
      payment_id: payment._id,
      ...restBody,
    };
    const data = await billRepository.create(formBody);

    products.forEach(async ({ cart_id }) => {
      await cartRepository.delete(cart_id);
    });
    const billDetails = products.map(({ cart_id, ...product }) => {
      return { bill_id: data.id, ...product };
    });
    await billDetailRepository.saveMultiple(billDetails);
    const response = {
      data,
      message: "Tạo hóa đơn thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/bill/update/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const { products, ...formBody } = body;
    const data = await billRepository.update(id, formBody);

    const billDetails = products.map((product) => ({
      bill_id: data.id,
      ...product,
    }));
    // if received subtraction quantity in product detail
    if (formBody.status === "RECEIVED") {
      products.forEach(async (product) => {
        const currentProduct = await productDetailModel.findById(
          product.product_id
        );
        const quantity = currentProduct.quantity - product.quantity;
        await productDetailModel.findByIdAndUpdate(
          product.product_id,
          { quantity },
          { new: true }
        );
      });
    }
    await billDetailRepository.saveMultiple(billDetails);
    const response = {
      data,
      message: "Cập nhật bill thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await billRepository.update(id, body);
    const response = {
      data,
      message: "Cập nhật bill thành công",
    };
    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
