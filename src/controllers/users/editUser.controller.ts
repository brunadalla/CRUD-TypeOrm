import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"

import { IUserUpdate } from "../../interfaces/users"
import { User } from "../../entities/user.entity"
import editUserService from "../../services/users/editUser.service"

const editUserController = async (req: Request, res: Response) => {
  try {
    const data: IUserUpdate = req.body
    const userId = req.user.id
    const idToUpdate = req.params.id

    const updatedUser = await editUserService(data, userId, idToUpdate)

    if (updatedUser instanceof User) {
      return res.json(instanceToPlain(updatedUser))
    }

    return res.status(updatedUser[1] as number).json({
      message: updatedUser[0],
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      })
    }
  }
}

export default editUserController
