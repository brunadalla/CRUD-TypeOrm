import { Request, Response } from "express"

import deleteUserService from "../../services/users/deleteUser.service"

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    
    const deletedUser = await deleteUserService(id)
    
    return res.status(deletedUser[1] as number).json({
      message: deletedUser[0],
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        message: error.message,
      })
    }
  }
}

export default deleteUserController
