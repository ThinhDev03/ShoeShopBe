import voucherModel from "../database/models/voucher.model";
import BaseRepository from "../helpers/BaseRepository";

class voucherRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new voucherRepository({ model: voucherModel });
