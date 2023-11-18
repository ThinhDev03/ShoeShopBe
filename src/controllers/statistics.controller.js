import billDetailModel from "../database/models/bill-detail.model";
import billModel from "../database/models/bill.model";
import commentModel from "../database/models/comment.model";
import authModel from "../database/models/user.model";
import { responseError, responseSuccess } from "../helpers/response";

const getCreateAt = (req) => {
  const now = new Date();

  const start = req.query.start || "2022-01-01";
  const end = req.query.end || now;

  const startDate = new Date(start);
  const endDate = new Date(end);

  return {
    createdAt: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  };
};

export const getBestSellerProduct = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const { createdAt } = getCreateAt(req);

    const data = await billDetailModel.find({
      createdAt,
    });
    const map = new Map();
    data.forEach((p) => {
      const product_id = p?.product_id?._id;

      if (product_id && p.quantity) {
        const newProduct = {
          product_id: product_id,
          quantity: p.quantity,
          user: p?.bill_id?.user_id,
          // product: p?.product_id?.product_id,
          product_name: p?.product_id?.product_id?.name,
        };

        if (map.has(product_id)) {
          const currentProduct = map.get(product_id);

          const overrideProduct = {
            ...currentProduct,
            quantity: parseInt(currentProduct.quantity) + parseInt(p?.quantity),
          };
          map.set(product_id, overrideProduct);
        } else {
          map.set(product_id, newProduct);
        }
      }
    });

    const dataFlat = Array.from(map).map((p) => p[1]);
    const result = dataFlat.sort((a, b) => b.quantity - a.quantity);
    const limitResult = result.splice(0, limit);

    const response = {
      data: limitResult,
      message: "Lấy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getTopRate = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const { createdAt } = getCreateAt(req);

    const data = await commentModel.find({ createdAt });

    const map = new Map();
    data.forEach((p) => {
      const product_id = p.product_id._id;
      const newProduct = {
        rate: p.rate,
        total_rate: p.rate,
        product_name: p?.product_id?.name,
      };
      const currentProduct = map.get(product_id);
      if (map.has(product_id)) {
        const overrideProduct = {
          ...newProduct,
          total_rate: currentProduct.rate + p.rate,
          count: parseInt(currentProduct.count) + 1,
          rate:
            (p.rate + currentProduct.total_rate) / (currentProduct.count + 1),
        };
        map.set(product_id, overrideProduct);
      } else {
        map.set(product_id, { ...newProduct, count: 1 });
      }
    });

    const dataFlat = Array.from(map).map((p) => p[1]);
    const result = dataFlat.sort((a, b) => b.count - a.count);
    const limitResult = result.splice(0, limit);

    const response = {
      data: limitResult,
      message: "Lấy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getRevenue = async (req, res) => {
  try {
    const { createdAt } = getCreateAt(req);
    const [bill, billDetail, total_user, total_bill] = await Promise.all([
      billModel.find({
        createdAt,
      }),
      billDetailModel.find({
        createdAt,
      }),
      authModel.countDocuments(),
      billModel.countDocuments(),
    ]);

    const total_money = bill.reduce((init, current) => {
      return (init += current.total_money);
    }, 0);

    const sellerQuantity = billDetail.reduce((init, current) => {
      if (current?.quantity && current?.product_id?._id) {
        return (init += parseInt(current.quantity));
      } else return (init += 0);
    }, 0);

    const response = {
      total_money: Math.floor(total_money),
      total_quantity: sellerQuantity,
      total_user,
      total_bill,
      message: "Lấy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getRevenueWithYear = async (req, res) => {
  try {
    const data = await billModel.find();
    const map = new Map();
    data.forEach((p) => {
      const date = new Date(p.createdAt);
      const year = date.getFullYear() + "-" + date.getMonth();
      const newData = {
        year: date.getFullYear(),
        month: date.getMonth(),
        total_money: p.total_money,
      };
      if (map.has(year)) {
        const current = map.get(year);
        map.set(year, {
          ...newData,
          total_money: Math.floor(current.total_money + p.total_money),
        });
      } else {
        map.set(year, newData);
      }
    });
    const dataFlat = Array.from(map).map((p) => p[1]);
    const response = {
      data: dataFlat,
      message: "Lấy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};

export const getAllRevenue = async (req, res) => {
  try {
    const data = await billModel.find().sort({ createdAt: -1 }).lean();
    const newData = [];
    data.forEach((p) => {
      const date = new Date(p.createdAt);
      const result = [date.getTime(), p.total_money];

      newData.push(result);
    });
    const response = {
      data: newData,
      message: "Lấy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
