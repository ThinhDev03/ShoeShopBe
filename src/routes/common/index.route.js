import billRoute from "./bill.route";
import cartRoute from "./cart.route";
import commentRoute from "./comment.route";
import paymentRoute from "./payment.route";
import statisticRoute from "./statistics.route";

const commonRoutes = {
  prefix: "/",
  routes: [
    {
      path: "cart",
      route: cartRoute,
    },
    {
      path: "comment",
      route: commentRoute,
    },
    {
      path: "bill",
      route: billRoute,
    },
    {
      path: "payment",
      route: paymentRoute,
    },
    {
      path: "statistic",
      route: statisticRoute,
    },
  ],
};

export default commonRoutes;
