import { Request, Response } from "express";
import { UserService } from "../services/users";
import { User } from "../interfaces/users";
import { CreateUser } from "../interfaces/users";
import { isValidId } from "../utils/validation";
import { StatusCodes } from "http-status-codes";

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Cannot access database");
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);
    if (!isValidId(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json("Requires valid userId");
    }
    const user = await UserService.getUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Cannot find user id");
  }
}

async function updateUserDetails(req: Request, res: Response) {
  try {
    const updateDetails: User = req.body;
    const updatedUser = await UserService.updateUserDetails(updateDetails);
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("Could not update user.");
  }
}

async function updateUserPassword(req: Request, res: Response) {
  try {
    const updatePassword: User = req.body;
    const newPassword = await UserService.updateUserPassword(updatePassword);
    return res.status(200).json(newPassword);
  } catch (error) {
    res.status(500).json("Could not update password.");
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const newUser: CreateUser = req.body;
    const createdUser = await UserService.createUser(newUser);
    return res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json("Could not create user.");
  }
}

async function deleteUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params["id"]);

    if (!isValidId(userId)) {
      return res.status(StatusCodes.BAD_REQUEST).json("Requires valid userId");
    }
    const deletedUser = await UserService.deleteUserById(userId);
    return res.status(200).json(deletedUser);
  } catch (err) {
    return res.status(500).json("Cannot delete id");
  }
}

const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserDetails,
  updateUserPassword,
  deleteUserById,
};

export { UserController };
