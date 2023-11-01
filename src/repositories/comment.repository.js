import commentModel from "../database/models/comment.model";
import BaseRepository from "../helpers/BaseRepository";

class CommentRepository extends BaseRepository {
  constructor(props) {
    super(props);
  }
}

export default new CommentRepository({ model: commentModel });
