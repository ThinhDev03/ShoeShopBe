import billHistioryModel from "../database/models/bill-history";
import BaseRepository from "../helpers/BaseRepository";

class BillDetailRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new BillDetailRepository({ model: billHistioryModel });
