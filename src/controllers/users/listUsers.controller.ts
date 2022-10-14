import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"

import listUsersService from "../../services/users/listUsers.service"

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService()

  return res.json(instanceToPlain(users))
}

export default listUsersController
