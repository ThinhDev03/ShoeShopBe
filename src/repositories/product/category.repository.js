import categoryModel from "../../database/models/product/category.model";
import BaseRepository from "../../helpers/BaseRepository";

class CategoryRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new CategoryRepository({ model: categoryModel });
