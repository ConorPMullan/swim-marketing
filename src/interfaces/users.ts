interface User {
  id: string;
  user_name: string;
  email: string;
  password: string;
}

interface CreateUser {
  user_name: string;
  email: string;
  password: string;
}

export { User, CreateUser };
