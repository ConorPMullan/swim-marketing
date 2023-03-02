interface User {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
  user_level_id: number;
}

interface IUser {
  userId: number;
  userName: string;
  emailAddress: string;
  userLevelId: number;
}

export type { User, IUser };
