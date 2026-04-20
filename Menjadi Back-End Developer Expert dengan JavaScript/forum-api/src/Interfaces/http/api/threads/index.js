import ThreadsController from "./controller.js";
import routes from "./routes.js";

const threads = (container) => {
  const threadsController = new ThreadsController(container);

  return routes(threadsController);
};

export default threads;
