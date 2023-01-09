import { prisma } from "../utils";
import bcrypt from "bcrypt";
import { IUser, ICreateUser } from "../interfaces";

async function getAllUsers() {
  let allUsers;
  try {
    allUsers = await prisma.users.findMany();
  } catch (error) {
    console.log(error);
  }
  const users: IUser[] = allUsers.map(
    (x: { id: any; user_name: any; email_address: any; password: any }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email_address,
      userPassword: x.password,
    })
  );
  return users;
}

async function getUserByName(userName: string) {
  let userArray;
  try {
    userArray = await prisma.users.findMany({
      where: { user_name: { contains: userName, mode: "insensitive" } },
    });
  } catch (error) {
    console.log(error);
  }
  const users: IUser[] = userArray.map(
    (x: { id: any; user_name: any; email: any; password: any }) => ({
      userId: x.id,
      userName: x.user_name,
      emailAddress: x.email,
      userPassword: x.password,
    })
  );

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
    id: userObject.id,
    user_name: userObject.user_name,
    email: userObject.email_address,
    password: userObject.user_password,
  };
  return returnedValue;
}

async function getUserByEmail(userEmail: string): Promise<IUser> {
  let userObject;
  try {
    userObject = await prisma.users.findUnique({
      where: { email: userEmail },
    });
  } catch (error) {
    console.log(error);
  }

  const returnedValue = {
    id: userObject.id,
    user_name: userObject.user_name,
    email: userObject.email,
    password: userObject.password,
  };

  return returnedValue;
}

//UPDATE functions

async function updateUserDetails(user: IUser) {
  let updateUser;
  try {
    updateUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        user_name: user.user_name,
        email_address: user.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updateUser;
}

async function updateUserPassword(user: IUser) {
  let updatedPassword;
  const salt = await bcrypt.genSalt();

  updatedPassword = await bcrypt.hash(user.password, salt);

  try {
    updatedPassword = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: updatedPassword,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return updatedPassword;
}

//CREATE function

async function createUser(user: ICreateUser): Promise<string> {
  try {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await prisma.users.create({
      data: {
        user_name: user.user_name,
        email: user.email,
        password: hashedPassword,
      },
    });

    const createdUser = {
      id: newUser.id,
      user_name: newUser.user_name,
      email: newUser.email_address,
    };
    return createdUser.user_name;
  } catch (error) {
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
        password: "DELETEDUSERPASS",
      },
    });
  } catch (error) {
    console.log(error);
  }
  return deletedUser;
}

const UserService = {
  getAllUsers,
  getUserByName,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserDetails,
  updateUserPassword,
  deleteUserById,
};

export { UserService };
