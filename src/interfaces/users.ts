interface User {
  id: number;
  user_name: string;
  email: string;
  user_password: string;
}

interface IUser {
  userId: number;
  userName: string;
  emailAddress: string;
  userPassword: string;
}

interface CreateUser {
  user_name: string;
  email: string;
  user_password: string;
}

export { User, IUser, CreateUser };
