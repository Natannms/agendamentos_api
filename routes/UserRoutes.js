const {Router} = require('express');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');


const router = Router();

router.post("/register", UserController.register);
router.post("/login", AuthController.login);
router.get("/users", UserController.getAll)
router.get("/clients", UserController.getAllUserClients)
router.get("/users/:id", UserController.getOne)
router.put("/users/:id", UserController.update)
router.put("/address/:userId", UserController.updateUserAddress)
module.exports = router;
