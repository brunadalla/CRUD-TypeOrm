import { Router } from "express"

import createUserController from "../../controllers/users/createUser.controller"
import deleteUserController from "../../controllers/users/deleteUser.controller"
import editUserController from "../../controllers/users/editUser.controller"
import listUsersController from "../../controllers/users/listUsers.controller"
import ensureAuthMiddleware from "../../middleware/ensureAuth.middleware"
import ensureIsAdmMiddleware from "../../middleware/ensureIsAdm.middleware"

const usersRoutes = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController)
usersRoutes.patch("/:id", ensureAuthMiddleware, editUserController)
usersRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController)

export default usersRoutes
