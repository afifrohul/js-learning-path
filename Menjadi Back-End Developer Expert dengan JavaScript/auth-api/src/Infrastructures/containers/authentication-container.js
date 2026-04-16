import AuthenticationRepository from "../../Domains/authentications/AuthenticationRepository.js";
import AuthenticationRepositoryPostgres from "../repository/AuthenticationRepositoryPostgres.js";
import UserLoginUseCase from "../../Applications/use_case/authentications/UserLoginUseCase.js";
import RefreshAuthenticationUseCase from "../../Applications/use_case/authentications/RefreshAuthenticationUseCase.js";
import UserLogoutUseCase from "../../Applications/use_case/authentications/UserLogoutUseCase.js";
import UserRepository from "../../Domains/users/UserRepository.js";
import PasswordHash from "../../Applications/security/PasswordHash.js";
import TokenManager from "../../Applications/security/TokenManager.js";
import pool from "../database/postgres/pool.js";

const authContainer = (container) => {
  container.register([
    {
      key: AuthenticationRepository.name,
      Class: AuthenticationRepositoryPostgres,
      parameter: {
        dependencies: [{ concrete: pool }],
      },
    },
  ]);

  container.register([
    {
      key: UserLoginUseCase.name,
      Class: UserLoginUseCase,
      parameter: {
        injectType: "destructuring",
        dependencies: [
          { name: "userRepository", internal: UserRepository.name },
          { name: "passwordHash", internal: PasswordHash.name },
          { name: "tokenManager", internal: TokenManager.name },
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
};

export default authContainer;
