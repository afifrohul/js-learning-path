import PasswordHash from "../../Applications/security/PasswordHash.js";
import TokenManager from "../../Applications/security/TokenManager.js";
import BcryptPasswordHash from "../security/BcryptPasswordHash.js";
import JwtTokenManager from "../security/JwtTokenManager.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const securityContainer = (container) => {
  container.register([
    {
      key: PasswordHash.name,
      Class: BcryptPasswordHash,
      parameter: {
        dependencies: [{ concrete: bcrypt }],
      },
    },
    {
      key: TokenManager.name,
      Class: JwtTokenManager,
      parameter: {
        dependencies: [{ concrete: jwt }],
      },
    },
  ]);
};

export default securityContainer;
