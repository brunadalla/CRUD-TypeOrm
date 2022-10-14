import { hash } from "bcrypt"

import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserRequest } from "../../interfaces/users"

const createUserService = async ({ name, email, password, isAdm }: IUserRequest): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User)

  const hashedPassword = await hash(password, 10)

  const emailAlreadyExists = await userRepository.findOne({
    where: {
      email: email,
    },
  })

  if (emailAlreadyExists) {
    return ["Email already exists", 404]
  }

  const newUser = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
  })

  await userRepository.save(newUser)

  return newUser
}

export default createUserService
