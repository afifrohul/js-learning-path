import { createContainer } from "instances-container";
import usersContainer from "./containers/user-container.js";
import authContainer from "./containers/authentication-container.js";
import securityContainer from "./containers/security-container.js";
import threadContainer from "./containers/thread-container.js";

const container = createContainer();

// register modules
usersContainer(container);
authContainer(container);
securityContainer(container);
threadContainer(container);

export default container;
