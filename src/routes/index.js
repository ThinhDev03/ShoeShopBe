import adminRoutes from "./admin/index.route";
import commonRoutes from "./common/index.route";
import productRoutes from "./product";
import userRoutes from "./user";

const routes = [
  { ...userRoutes },
  { ...commonRoutes },
  { ...adminRoutes },
  { ...productRoutes },
];
export default routes;

