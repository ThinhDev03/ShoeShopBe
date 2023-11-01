import billModel from "../database/models/bill.model";
import BaseRepository from "../helpers/BaseRepository";

class BillRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
  async totalRecord(options) {
    return await billModel.countDocuments(options);
  }
}

export default new BillRepository({ model: billModel });
