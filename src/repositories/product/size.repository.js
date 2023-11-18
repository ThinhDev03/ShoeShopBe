import sizeModel from "../../database/models/product/size.model";
import BaseRepository from "../../helpers/BaseRepository";

class SizeRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new SizeRepository({model: sizeModel});
