import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = container.resolve(UserController); // Resolve controller from DI container

// approach using bind method
// router.post('/', userController.createUser.bind(userController));

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/:id', (req, res) => userController.getUser(req, res));
router.get('/', (req, res) => userController.getUsers(req, res));

export default router;
