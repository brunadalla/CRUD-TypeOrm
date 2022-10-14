import { hash } from "bcrypt"

import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUserUpdate } from "../../interfaces/users"

const editUserService = async ({ ...data }: IUserUpdate, idUser: string, idToUpdate: string): Promise<User | Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User)

  const userToUpdate = await userRepository.findOne({
    where: {
      id: idToUpdate,
    },
  })
  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  })

  if (!userToUpdate) {
    return ["User not found", 404]
  } 
  
  else if (idUser !== idToUpdate && !user?.isAdm) {
    return ["Unauthorized access", 401]
  } 
  
  else if (Object.keys(data).includes('id') || Object.keys(data).includes('isAdm') || Object.keys(data).includes('isActive')) {
    return ["You cant change the user's attributes: id, isAdm or isActive", 401]
  }

  await userRepository.update(idToUpdate, {
    ...userToUpdate,
    ...data,
    password: data.password ? await hash(data.password, 10) : userToUpdate.password
  })

  const updatedUser = await userRepository.findOne({
    where: {
      id: idToUpdate,
    },
  })

  return updatedUser!
}

export default editUserService
