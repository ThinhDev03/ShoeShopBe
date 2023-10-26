import billModel from "../database/models/bill.model";
import BaseRepository from "../helpers/BaseRepository";

class BillRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
  async totalRecord(search) {
    return await billModel.countDocuments({
      receiver: { $regex: search, $options: "i" },
    });
  }
}

export default new BillRepository({ model: billModel });
