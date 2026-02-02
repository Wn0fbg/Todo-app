import expres from "express";
import { getAllProducts } from "../controllers/productControllet.js";
import { createProduct } from "../controllers/productControllet.js";

const router = expres.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);

export default router;

//  npm i express dotenv cors helmet morgan @neondatabase/serverless @arcjet/node, npm i nodemon
