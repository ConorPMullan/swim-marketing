import { prisma } from "../utils";
import bcrypt from "bcrypt";
import { IUser, ICreateUser, User } from "../interfaces";

async function getAllUsers() {
  let allUsers;
  try {
    allUsers = await prisma.users.findMany();
  } catch (error) {
    throw new Error(error);
  }
  const users: IUser[] =
    allUsers?.map(
      (x: {
        id: number;
        user_name: string;
        email: string;
        user_password: string;
      }) => ({
        userId: x.id,
        userName: x.user_name,
        emailAddress: x.email,
        userPassword: x.user_password,
      })
    ) || [];
  return users;
}

async function getUserById(userId: number): Promise<IUser> {
  let userObject;

  try {
    userObject = await prisma.users.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    throw new Error("Could not find user by id", error);
  }

  const returnedValue = {
    userId: userObject.id,
    userName: userObject.user_name,
    emailAddress: userObject.email,
    userPassword: userObject.user_password,
  };
  return returnedValue;
}

//UPDATE functions

async function updateUserDetails(user: User) {
  let updateUser;
  try {
    updateUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return updateUser;
}

async function updateUserPassword(user: User) {
  let updatedPassword;
  const salt = await bcrypt.genSalt();

  updatedPassword = await bcrypt.hash(user.user_password, salt);

  try {
    updatedPassword = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        user_password: updatedPassword,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return updatedPassword;
}

//CREATE function

async function createUser(user: ICreateUser): Promise<string> {
  try {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(user.user_password, salt);

    const newUser = await prisma.users.create({
      data: {
        user_name: user.user_name,
        email: user.email,
        user_password: hashedPassword,
      },
    });

    const createdUser = {
      id: newUser.id,
      user_name: newUser.user_name,
      email: newUser.email,
    };

    return createdUser.user_name;
  } catch (error) {
    throw Error("Cannot create user", error);
  }
}

async function deleteUserById(userId: number) {
  let deletedUser;
  try {
    deletedUser = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        user_name: "DELETEDUSER",
        email: "DELETED",
        user_password: "DELETEDUSERPASS",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return deletedUser;
}

const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserDetails,
  updateUserPassword,
  deleteUserById,
};

export { UserService };
