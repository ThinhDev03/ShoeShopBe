import billDetailModel from "../database/models/bill-detail.model";
import billHistory from "../database/models/bill-history";
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
      $gte: startDate,
      $lt: endDate,
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

      if (product_id && p.quantity && p?.bill_id?.status === "RECEIVED") {
        const newProduct = {
          product_id: product_id,
          quantity: p.quantity,
          price: p.product_id.price,
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
      const product_id = p.product_id?._id;
      const newProduct = {
        rate: p.rate,
        total_rate: p.rate,
        product_name: p?.product_id?.name,
      };
      const currentProduct = map.get(product_id);
      if (map.has(product_id)) {
        const overrideProduct = {
          ...newProduct,
          total_rate: currentProduct.total_rate + p.rate,
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
        status: "RECEIVED",
      }),
      billDetailModel.find({
        createdAt,
      }),
      authModel.countDocuments({ role: "USER", createdAt }),
      billModel.countDocuments({ status: "RECEIVED", createdAt }),
    ]);

    const total_money = bill.reduce((init, current) => {
      return (init += current.total_money);
    }, 0);

    const billDetailReceived = billDetail.filter((d) => {
      if (d?.bill_id?.status === "RECEIVED") return true;
    });

    const sellerQuantity = billDetailReceived.reduce((init, current) => {
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
    const data = await billModel.find({ status: "RECEIVED" });
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
    const data = await billModel
      .find({ status: "RECEIVED" })
      .sort({ createdAt: -1 })
      .lean();
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

export const userCancelMany = async (req, res) => {
  try {
    const response = await billHistory
      .aggregate([
        {
          $match: { bill_status: "CANCELED" }, // Lọc các bản ghi có status là CANCED
        },
        {
          $group: {
            _id: "$user_updated", // Nhóm theo user_updated
            count: { $sum: 1 }, // Đếm số lần CANCELED
          },
        },
        {
          $lookup: {
            from: "users", // Tên bảng users
            localField: "_id", // Trường trong bảng Status
            foreignField: "_id", // Trường trong bảng Users
            as: "user", // Kết quả sẽ được lưu trong mảng user
          },
        },
        {
          $unwind: "$user", // Giải nén mảng user
        },
        {
          $match: { "user.is_locked": false }, // Lọc các người dùng có is_locked = false
        },
        {
          $project: {
            userName: "$user.fullname", // Trích xuất tên người dùng
            _id: "$user._id", // Trích xuất tên người dùng
            role: "$user.role", // Trích xuất tên người dùng
            count: 1, // Số lần CANCED
          },
        },
        {
          $sort: { count: -1 }, // Sắp xếp theo số lần CANCED giảm dần
        },
      ])
      .limit(10);
    const responses = {
      data: response,
      message: "Lấy thống kê thành công",
    };
    return responseSuccess(res, responses);
  } catch (error) {
    return responseError(res, error);
  }
};
