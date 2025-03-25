const express = require("express");
const { userList, userAdd, userEdit, userDelete, singleUser } = require("../../controllers/user");
const router = express.Router();

router.get("/user", userList);
router.get("/user/:id", singleUser);
router.post("/user", userAdd);
router.put("/user/:id", userEdit);
router.delete("/user/:id", userDelete);

module.exports = router;
