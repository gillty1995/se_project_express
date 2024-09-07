const router = require("express").Router();
const NotFoundError = require("../utils/notFoundError");
const { createUser, login } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { validateUserBody, validateAuth } = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuth, login);

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);

router.use(() => {
  throw new NotFoundError("The requested resource was not found");
});

module.exports = router;
