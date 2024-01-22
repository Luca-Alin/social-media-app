import {UserDTO} from "../../user-service/model/UserDTO";
import {CommentDTO} from "../../comment-service/models/CommentDTO";

export interface PostDTO {
  id: number;
  content: string;
  createdAt: Date;
  user: UserDTO;
  images: string[];
  comments: CommentDTO[];
}
