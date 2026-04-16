/* istanbul ignore file */

import { createContainer } from "instances-container";

// external agency
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "./database/postgres/pool.js";

// service (repository, helper, manager, etc)
import UserRepository from "../Domains/users/UserRepository.js";
import UserRepositoryPostgres from "./repository/UserRepositoryPostgres.js";
import AuthenticationRepository from "../Domains/authentications/AuthenticationRepository.js";
import AuthenticationRepositoryPostgres from "./repository/AuthenticationRepositoryPostgres.js";
import BcryptPasswordHash from "./security/BcryptPasswordHash.js";
import JwtTokenManager from "./security/JwtTokenManager.js";

// use case
import AddUserUseCase from "../Applications/use_case/users/AddUserUseCase.js";
import UserLoginUseCase from "../Applications/use_case/authentications/UserLoginUseCase.js";
import RefreshAuthenticationUseCase from "../Applications/use_case/authentications/RefreshAuthenticationUseCase.js";
import UserLogoutUseCase from "../Applications/use_case/authentications/UserLogoutUseCase.js";
import PasswordHash from "../Applications/security/PasswordHash.js";
import TokenManager from "../Applications/security/TokenManager.js";

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: jwt,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: UserLoginUseCase.name,
    Class: UserLoginUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
        {
          name: "tokenManager",
          internal: TokenManager.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "tokenManager",
          internal: TokenManager.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: UserLogoutUseCase.name,
    Class: UserLogoutUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
]);

export default container;
