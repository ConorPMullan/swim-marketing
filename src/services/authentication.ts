import { UserService } from "./users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticationConst } from "../constants";

const authenticate = async (email: string, password: string) => {
  const user = await UserService.getUserByEmail(email);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.userPassword);
    if (passwordCorrect) {
      return await generateTokens(user);
    }
  }
  throw new Error(`Authentication failed for ${email}`);
};

const refresh = async (userId: number) => {
  const user = await UserService.getUserById(userId);
  if (user) {
    return await generateTokens(user);
  }
  throw new Error(`Could not generate new token.`);
};

const generateTokens = (user) => {
  return new Promise((response, reject) => {
    try {
      const accessToken = jwt.sign(
        { sub: user.id, roles: user.user_level_id },
        authenticationConst.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 1200,
        }
      );
      const refreshToken = jwt.sign(
        { sub: user.id },
        authenticationConst.REFRESH_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );
      response({ accessToken, refreshToken });
    } catch (error) {
      reject(error);
    }
  });
};

const AuthService = {
  authenticate,
  refresh,
};

export { AuthService };
