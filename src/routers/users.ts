import express from "express";
import { UserController } from "../controllers/users";

const UserRouter = express.Router();

//PUBLIC endpoints

UserRouter.get("/", UserController.getAllUsers);

//PRIVATE endpoints

UserRouter.get("/getUserByName", UserController.getUserByName);
UserRouter.get("/getUserById/:id", UserController.getUserById);
UserRouter.put("/updateUserDetails", UserController.updateUserDetails);
UserRouter.put("/updateUserPassword", UserController.updateUserPassword);
UserRouter.post("/createUser", UserController.createUser);
UserRouter.put("/deleteUserById", UserController.deleteUserById);

export { UserRouter };
