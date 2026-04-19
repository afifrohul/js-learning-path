import ThreadRepository from "../../Domains/threads/ThreadRepository.js";
import ThreadRepositoryPostgres from "../repository/ThreadRepositoryPostgres.js";
import AddThreadUseCase from "../../Applications/use_case/threads/AddThreadUseCase.js";
import pool from "../database/postgres/pool.js";
import { nanoid } from "nanoid";

const threadsContainer = (container) => {
  container.register([
    {
      key: ThreadRepository.name,
      Class: ThreadRepositoryPostgres,
      parameter: {
        dependencies: [{ concrete: pool }, { concrete: nanoid }],
      },
    },
  ]);

  container.register([
    {
      key: AddThreadUseCase.name,
      Class: AddThreadUseCase,
      parameter: {
        injectType: "destructuring",
        dependencies: [
          { name: "threadRepository", internal: ThreadRepository.name },
        ],
      },
    },
  ]);
};

export default threadsContainer;
