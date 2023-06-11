const express = require("express");
const BlogController = require("../controllers/BlogController");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middlewares/Validation");

router.get("/", BlogController.home);
router.get("/api/blogs", BlogController.getAll);
router.get("/api/blogs/:id", BlogController.getById);
router.post(
  "/api/blogs",
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],
  validate,
  BlogController.create
);
router.put(
  "/api/blogs/:id",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],
  validate,
  BlogController.update
);
router.delete("/api/blogs/:id", BlogController.delete);

router.post(
  "/api/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  BlogController.login
);
router.post(
  "/api/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .withMessage(
        "Password must be at least 6 characters long and contain at least one letter and one number"
      ),
  ],
  validate,
  BlogController.register
);

module.exports = router;
