import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"

const deleteUserService = async (id: string): Promise<Array<string | number>> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id })
  console.log(id)
  if (!user) {
    return ["User not found", 404]
  }

  const isActive = user.isActive
  
  if (!isActive) {
    return ["User is already inactive", 400]
  }

  await userRepository.update(id, {
    ...user,
    isActive: false
  })

  return ['User is now inactive', 204]
}

export default deleteUserService
