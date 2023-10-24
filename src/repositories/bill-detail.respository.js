import mongoose from "mongoose";
import billDetailModel from "../database/models/bill-detail.model";
import BaseRepository from "../helpers/BaseRepository";

class BillDetailRepository extends BaseRepository {
    constructor(props) {
        super(props);
    }
    async saveMultiple(data) {
        const bulkWriteOptions = data.map((scd) => {
            return {
                updateOne: {
                    filter: {
                        _id: new mongoose.Types.ObjectId(scd._id),
                    },
                    update: scd,
                    upsert: true,
                },
            };
        });
        await this.Model.bulkWrite(bulkWriteOptions);
    }
}

export default new BillDetailRepository({ model: billDetailModel });