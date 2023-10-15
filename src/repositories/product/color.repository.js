import colorModel from "../../database/models/product/color.model";
import BaseRepository from "../../helpers/BaseRepository";

class ColorRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new ColorRepository({ model: colorModel });
