import billRoute from "./bill.route";
import cartRoute from "./cart.route";
import commentRoute from "./comment.route";
import paymentRoute from "./payment.route";

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
  ],

};

export default commonRoutes;
