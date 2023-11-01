import productModel from "../../database/models/product/product.model";
import BaseRepository from "../../helpers/BaseRepository";

class ProductRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
  async totalRecord(options) {
    return await productModel.countDocuments(options);
  }
}

export default new ProductRepository({ model: productModel });
