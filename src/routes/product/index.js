import brandRoute from "./brand.route";
import colorRoute from "./color.route";
import categoryRoute from "./category.route";
import sizeRoute from "./size.route";
import productRoute from "./product.route";

const productRoutes = {
  prefix: "/",
  routes: [
    {
      path: "size",
      route: sizeRoute,
    },
    {
      path: "color",
      route: colorRoute,
    },
    {
      path: "brand",
      route: brandRoute,
    },
    {
      path: "category",
      route: categoryRoute,
    },
    {
      path: "product",
      route: productRoute,
    },
  ],
};

export default productRoutes;
