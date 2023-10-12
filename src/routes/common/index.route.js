import commonAnswerRoute from "./common-answer";

const commonRoutes = {
  prefix: "/",
  routes: [
    {
      path: "answer",
      route: commonAnswerRoute,
    },
  ],
};

export default commonRoutes;
