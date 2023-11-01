import cartModel from "../database/models/cart.model";
import BaseRepository from "../helpers/BaseRepository";

class CartRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
  async updateCart(product_id, body) {
    return await this.Model.findOneAndUpdate({ product_id }, body, {
      new: true,
    });
  }
}

export default new CartRepository({ model: cartModel });
