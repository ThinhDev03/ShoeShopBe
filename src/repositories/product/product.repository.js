import productModel from "../../database/models/product/product.model";
import BaseRepository from "../../helpers/BaseRepository";

class ProductRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
  async totalRecord(search) {
    return await productModel.countDocuments({
      name: { $regex: search, $options: "i" },
    });
  }
}

export default new ProductRepository({ model: productModel });
