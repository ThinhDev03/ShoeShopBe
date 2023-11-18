import brandModel from "../../database/models/product/brand.model";
import BaseRepository from "../../helpers/BaseRepository";

class BrandRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new BrandRepository({model: brandModel});
