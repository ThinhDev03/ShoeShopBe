// import billDetailModel from "../database/models/bill-detail.model";
import billDetailModel from "../database/models/bill-detail.model";
import billModel from "../database/models/bill.model";
import productDetailModel from "../database/models/product/product-detail.model";
import { responseError, responseSuccess } from "../helpers/response";

export const getBestSellerProduct = async (req, res) => {
  try {
    const data = await billDetailModel.find();
    const map = new Map();
    data.forEach((p) => {
      const product_id = p?.product_id?._id;
      const newProduct = {
        product_id: product_id,
        quantity: p.quantity,
        user: p?.bill_id?.user_id,
        product: p?.product_id?.product_id?.name,
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

      return p;
    });
    // const dataa = Array.from(map).sort(([a], [b]) => a.quantity - b.quantity);
    const response = {
      data: Array.from(map),
      message: "Láy thống kê thành công",
    };

    return responseSuccess(res, response);
  } catch (error) {
    return responseError(res, error);
  }
};
