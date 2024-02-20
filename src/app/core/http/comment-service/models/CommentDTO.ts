import {UserDTO} from "../../user-service/model/UserDTO";
import {PostDTO} from "../../post-service/model/PostDTO";

export interface CommentDTO {
  id: number | null;
  content: string | null;
  post: PostDTO | null;
  user: UserDTO | null;
  createdAt: Date | null;
}
