import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.routes";
import "dotenv/config";
import ProductRoutes from "./routes/product.routes";
import CategoryRouter from "./routes/category.route";


const application = new App([
    new AuthRoute(),
    new UserRoute(),
    new ProductRoutes(),
    new CategoryRouter()
]);

application.startServer();
