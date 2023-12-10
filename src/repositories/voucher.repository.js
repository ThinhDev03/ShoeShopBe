import voucherModel from "../database/models/voucher.model";
import BaseRepository from "../helpers/BaseRepository";

class VoucherRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new VoucherRepository({ model: voucherModel });
