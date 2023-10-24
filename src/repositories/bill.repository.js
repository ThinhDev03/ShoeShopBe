import billModel from "../database/models/bill.model";
import BaseRepository from "../helpers/BaseRepository";

class BillRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }

}

export default new BillRepository({ model: billModel });
