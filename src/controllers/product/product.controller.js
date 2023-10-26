import mongoose from "mongoose";
import imageModel from "../../database/models/product/image.model";
import productDetailModel from "../../database/models/product/product-detail.model";
import productModel from "../../database/models/product/product.model";
import { responseError, responseSuccess } from "../../helpers/response";
import productRepository from "../../repositories/product/product.repository";

// [GET] api/product
export const read = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category
      ? { category_id: req.query.category }
      : {};
    const perPage = limit * page - limit;

    const product = await productModel
      .find({
        ...category,
        name: { $regex: search, $options: "i" },
      })
      .skip(perPage)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await productRepository.totalRecord(search);
    const totalPage = Math.ceil(total / limit);
    return res.status(200).json({
      data: product,
      total,
      totalPage,
      currentPage: page,
    });
  } catch (error) {
    return responseError(res, error);
  }
};
export const getBuyId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.findById(id);

    const response = {
      data,
      message: "Lấy sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
// [POST] api/product/create
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { images, ...formBody } = body;
    const data = await productRepository.create(formBody);
    if (images) {
      const formImage = images.map((image_url) => ({
        image_url,
        product_id: data._id,
      }));
      await imageModel.insertMany(formImage);
    }

    const response = {
      data,
      message: "Tạo sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const createDetail = async (req, res) => {
  try {
    const body = req.body;

    const data = await productDetailModel.insertMany(body);
    const product_id = body[0].product_id;
    const listDetail = await productDetailModel.find({
      product_id,
    });

    listDetail.sort((a, b) => a.price - b.price);
    const fromPrice = listDetail[0].price;
    const toPrice = listDetail[listDetail.length - 1].price;

    await productRepository.update(product_id, { fromPrice, toPrice });
    const response = {
      data,
      message: "Tạo sản phẩm thành công",
    };
    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getImageByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await imageModel.find({ product_id: id });

    const response = {
      data,
      message: "Lấy danh sách ảnh thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
export const getDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productDetailModel.find({ product_id: id });

    const response = {
      data,
      message: "Lấy danh sách ảnh thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
export const updateDetailById = async (req, res) => {
  try {
    const body = req.body;
    const bulkWriteOptions = body.map((scd) => {
      return {
        updateOne: {
          filter: {
            _id: new mongoose.Types.ObjectId(scd._id),
          },
          update: scd,
          upsert: true,
        },
      };
    });
    await productDetailModel.bulkWrite(bulkWriteOptions);
    const response = {
      data: null,
      message: "Cập nhật sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
export const removeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productDetailModel.findByIdAndDelete(id);
    const response = {
      data,
      message: "Xóa sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [POST] api/product/update/:id
export const update = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await productRepository.update(id, body);

    const response = {
      data,
      message: "Cập nhật sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/admin/product/remove/:id
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.delete(id);

    const response = {
      data,
      message: "Xóa sản phẩm thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
