interface User {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
  user_level_id: number;
}

interface IUpdateUser {
  id: number;
  user_name: string;
  email: string;
  user_level_id: number;
}

interface IUser {
  userId: number;
  userName: string;
  emailAddress: string;
  userLevelId: number;
}

interface IUserByEmail extends IUser {
  userPassword: string;
}

interface CreateUser {
  user_name: string;
  email: string;
  user_password: string;
  user_level_id: number;
}

export { User, IUser, CreateUser, IUserByEmail, IUpdateUser };
