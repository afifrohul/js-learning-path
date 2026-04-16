import UserRepository from "../../Domains/users/UserRepository.js";
import UserRepositoryPostgres from "../repository/UserRepositoryPostgres.js";
import AddUserUseCase from "../../Applications/use_case/users/AddUserUseCase.js";
import PasswordHash from "../../Applications/security/PasswordHash.js";
import pool from "../database/postgres/pool.js";
import { nanoid } from "nanoid";

const usersContainer = (container) => {
  container.register([
    {
      key: UserRepository.name,
      Class: UserRepositoryPostgres,
      parameter: {
        dependencies: [{ concrete: pool }, { concrete: nanoid }],
      },
    },
  ]);

  container.register([
    {
      key: AddUserUseCase.name,
      Class: AddUserUseCase,
      parameter: {
        injectType: "destructuring",
        dependencies: [
          { name: "userRepository", internal: UserRepository.name },
          { name: "passwordHash", internal: PasswordHash.name },
        ],
      },
    },
  ]);
};

export default usersContainer;
