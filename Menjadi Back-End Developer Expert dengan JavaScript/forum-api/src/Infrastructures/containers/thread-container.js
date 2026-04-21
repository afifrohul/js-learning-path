import ThreadRepository from "../../Domains/threads/ThreadRepository.js";
import ThreadRepositoryPostgres from "../repository/ThreadRepositoryPostgres.js";
import AddThreadUseCase from "../../Applications/use_case/threads/AddThreadUseCase.js";
import GetDetailThreadUseCase from "../../Applications/use_case/threads/GetDetailThreadUseCase.js";
import AddCommentUseCase from "../../Applications/use_case/threads/AddCommentUseCase.js";
import pool from "../database/postgres/pool.js";
import { nanoid } from "nanoid";
import DeleteCommentUseCase from "../../Applications/use_case/threads/DeleteCommentUseCase.js";

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
    {
      key: GetDetailThreadUseCase.name,
      Class: GetDetailThreadUseCase,
      parameter: {
        injectType: "destructuring",
        dependencies: [
          { name: "threadRepository", internal: ThreadRepository.name },
        ],
      },
    },
    {
      key: AddCommentUseCase.name,
      Class: AddCommentUseCase,
      parameter: {
        injectType: "destructuring",
        dependencies: [
          { name: "threadRepository", internal: ThreadRepository.name },
        ],
      },
    },
    {
      key: DeleteCommentUseCase.name,
      Class: DeleteCommentUseCase,
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
