import paymentModel from "../database/models/payment.model";
import BaseRepository from "../helpers/BaseRepository";

class PaymentRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new PaymentRepository({ model: paymentModel });
