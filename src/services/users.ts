import { prisma } from "../utils";
import bcrypt from "bcrypt";
import { IUser, ICreateUser, User } from "../interfaces";

async function getAllUsers() {
  let allUsers;
  try {
    allUsers = await prisma.users.findMany();
  } catch (error) {
    console.log(error);
  }
  const users: IUser[] =
    allUsers?.map((x: { id: number; user_name: string; email: string }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email,
    })) || [];
  return users;
}

async function getUserById(userId: number): Promise<IUser> {
  let userObject;

  try {
    userObject = await prisma.users.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
      },
    });

    const createdUser = {
      userId: newUser.id,
      userName: newUser.user_name,
      emailAddress: newUser.email,
    };

    return createdUser;
  } catch (error) {
    console.log("Error message: ", error);
    throw Error("Cannot create user");
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
    console.log(error);
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
