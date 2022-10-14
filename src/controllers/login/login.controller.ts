import { Request, Response } from "express"

import { IUserLogin } from "../../interfaces/users"
import loginService from "../../services/login/login.service"

const loginController = async (req: Request, res: Response) => {
  try {
    const data: IUserLogin = req.body
    const token = await loginService(data)

    return res.json({ token })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        message: error.message,
      })
    }
  }
}

export default loginController
