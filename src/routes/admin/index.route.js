import adminAnswerRoute from "./admin-answer";

const adminRoutes = {
  prefix: "/admin/",
  routes: [
    {
      path: "answer",
      route: adminAnswerRoute,
    },
  ],
};

export default adminRoutes;
