import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"

import { IUserRequest } from "../../interfaces/users"
import createUserService from "../../services/users/createUser.service"
import { User } from "../../entities/user.entity"

const createUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body
    const createdUser = await createUserService(user)

    if (createdUser instanceof User) {
      return res.json(instanceToPlain(createdUser))
    }

    return res.status(createdUser[1] as number).json({
      message: createdUser[0]
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
}

export default createUserController
