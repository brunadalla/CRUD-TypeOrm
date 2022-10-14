import { Router } from "express"
import createUserController from "../../controllers/users/createUser.controller"

const usersRoutes = Router()

usersRoutes.post("", createUserController)
usersRoutes.get("")
usersRoutes.patch("/:id")
usersRoutes.delete("/:id")

export default usersRoutes
