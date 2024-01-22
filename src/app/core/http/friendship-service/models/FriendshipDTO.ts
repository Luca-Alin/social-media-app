import {UserDTO} from "../../user-service/model/UserDTO";

export interface FriendshipDTO {
  id: number;
  user: UserDTO;
  friend: UserDTO;
  friendshipStatus: string;
}
