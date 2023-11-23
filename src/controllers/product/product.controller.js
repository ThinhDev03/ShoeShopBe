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
      .sort({ createdAt: -1 })
      .lean();
    const total = await productRepository.totalRecord({
      ...category,
      name: { $regex: search, $options: "i" },
    });
    const pageSize = Math.ceil(total / limit);

    return res.status(200).json({
      data: product,
      total,
      pageSize,
      currentPage: page,
      message: "Lấy danh sách sản phẩm thành công ",
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
      message: "Lấy sản phẩm thành công ",
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
    const data = await productRepository.create({ ...formBody, max_sale: 0 });
    if (images) {
      const formImage = images.map((image_url) => ({
        image_url,
        product_id: data._id,
      }));
      await imageModel.insertMany(formImage);
    }

    const response = {
      data,
      message: "Tạo sản phẩm thành công ",
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
    let max_sale;
    if (body.length === 1 && body.length !== 0) {
      max_sale = parseFloat(body[0].sale);
    } else {
      max_sale = body.reduce((maxElement, currentElement) => {
        return parseFloat(currentElement.sale) > parseFloat(maxElement.sale)
          ? currentElement
          : maxElement;
      }, body[0]);
    }
    listDetail.sort((a, b) => a.price - b.price);
    const fromPrice = listDetail[0].price;
    const toPrice = listDetail[listDetail.length - 1].price;

    await productRepository.update(product_id, {
      fromPrice,
      toPrice,
      max_sale,
    });
    const response = {
      data,
      message: "Tạo sản phẩm thành công ",
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

    const data = await productDetailModel.bulkWrite(bulkWriteOptions);
    const listDetail = await productDetailModel.find({
      product_id: body[0].product_id,
    });

    listDetail.sort((a, b) => a.price - b.price);
    const fromPrice = listDetail[0].price;
    const toPrice = listDetail[listDetail.length - 1].price;
    let max_sale;
    if (body.length === 1 && body.length !== 0) {
      max_sale = parseFloat(body[0].sale);
    } else {
      max_sale = body.reduce((maxElement, currentElement) => {
        return parseFloat(currentElement.sale) > parseFloat(maxElement.sale)
          ? currentElement.sale
          : maxElement;
      }, body[0]);
    }
    await productRepository.update(body[0].product_id, {
      fromPrice,
      toPrice,
      max_sale,
    });

    const response = {
      data,
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
    const { images, ...body } = req.body;
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

export const deleteThumbnail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productRepository.update(id, { thumbnail: "" });

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

// [POST] api/product/create-image
export const createImage = async (req, res) => {
  try {
    const { images, product_id } = req.body;
    if (typeof images === "string") {
      //create one
      const data = await imageModel.create({ image_url: images, product_id });
      const response = {
        data,
        message: "Tạo hình ảnh thành công",
      };

      return responseSuccess(res, response);
    } else {
      //create multiple
      const formImage = images.map((image_url) => ({
        image_url,
        product_id,
      }));
      const data = await imageModel.insertMany(formImage);

      const response = {
        data,
        message: "Tạo hình ảnh thành công",
      };

      return responseSuccess(res, response);
    }
  } catch (error) {
    return responseError(res, error);
  }
};

export const createOneImage = async (req, res) => {
  try {
    const { id } = req.params;

    const { image_url } = req.body;

    const data = await imageModel.create({ product_id: id, image_url });

    const response = {
      data,
      message: "Tạo hình ảnh thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

// [DELETE] api/product/remove-image/:id
export const removeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const hasImage = await productDetailModel.find({ image_id: id });
    if (hasImage.length === 0) {
      const data = await imageModel.findByIdAndDelete(id);
      const response = {
        data,
        message: "Xóa hình ảnh thành công",
      };
      return responseSuccess(res, response);
    } else {
      const error = {
        message: "Hình ảnh đang được sử dụng",
        status: 400,
      };
      return responseError(res, error);
    }
  } catch (error) {
    return responseError(res, error);
  }
};

export const getSaleProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 16;
    const product = await productModel
      .find({ max_sale: { $gt: 0 } })
      .limit(limit);

    const response = {
      data: product,
      message: "lấy danh sách thành công",
    };
    return responseSuccess(res, response);
  } catch (error) {}
};
