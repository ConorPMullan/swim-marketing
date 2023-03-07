import { prisma } from "../utils";
import bcrypt from "bcrypt";
import { IUser, ICreateUser, User, IUserByEmail } from "../interfaces";
import { logger } from "../utils/logger";

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
        user_level_id: number;
      }) => ({
        userId: x.id,
        userName: x.user_name,
        emailAddress: x.email,
        userLevelId: x.user_level_id,
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
    userLevelId: userObject.user_level_id,
  };
  return returnedValue;
}

async function getUserByEmail(emailAddress: string): Promise<IUserByEmail> {
  let userObject;

  try {
    const allUsersObject = await prisma.users.findMany();

    userObject = await prisma.users.findFirstOrThrow({
      where: { email: emailAddress },
    });
    if (userObject === null) {
      throw new Error();
    }
    const returnedValue = {
      userId: userObject.id,
      userName: userObject.user_name,
      emailAddress: userObject.email,
      userLevelId: userObject.user_level_id,
      userPassword: userObject.user_password,
    };
    return returnedValue;
  } catch (error) {
    throw new Error("Could not find user by email", error);
  }
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
        user_level_id: user.user_level_id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
  return updateUser;
}

async function updateUserPassword(user: { id: number; user_password: string }) {
  const salt = await bcrypt.genSalt();

  const updatedPassword = await bcrypt.hash(user.user_password, salt);

  try {
    await prisma.users.update({
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
  return "Successfully updated password";
}

//CREATE function

async function createUser(user: ICreateUser): Promise<IUser> {
  try {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(user.user_password, salt);

    const newUser = await prisma.users.create({
      data: {
        user_name: user.user_name,
        email: user.email,
        user_password: hashedPassword,
        user_level_id: 1,
      },
    });

    const createdUser = {
      userId: newUser.id,
      userName: newUser.user_name,
      emailAddress: newUser.email,
      userLevelId: newUser.user_level_id,
    };

    return createdUser;
  } catch (error) {
    throw Error("Cannot create user" + error);
  }
}

async function deleteUserById(userId: number) {
  try {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        user_name: "DELETEDUSER",
        email: "DELETED",
        user_password: "DELETEDUSERPASS",
        user_level_id: 0,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

const UserService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserDetails,
  updateUserPassword,
  deleteUserById,
};

export { UserService };
