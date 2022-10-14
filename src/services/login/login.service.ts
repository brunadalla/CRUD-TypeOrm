import { compare } from "bcrypt"
import jwt from "jsonwebtoken"

import AppDataSource from "../../data-source"
import { IUserLogin } from "../../interfaces/users"
import { User } from "../../entities/user.entity"

import "dotenv/config"

const loginService = async ({ email, password }: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  )

  return token
}

export default loginService
