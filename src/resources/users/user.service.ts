
import UserModel from './user.model'
import { UserDTO, User } from './user.interfaces'

class UserService {
  private user = UserModel

  /**
   * Register a new user
   */
  public async create({...user}:UserDTO):Promise<UserDTO> {
    try {
      const addUser = new UserModel(user)
      await addUser.save()
      return addUser
    } catch (error) {
      throw new Error('No se puedo crear el usuario')
    }

  }

  /**
   * Find a user by email
   */
  public async findByEmail(email: string): Promise<User>{

    try {
      const user = await this.user.findOne({email})
      if(!user) throw new Error('Usuario o contraseña no son correctos')
      return user
    } catch (error) {
      throw new Error('comunicate ')
    }
  }

  /**
   * Find a user by ID
   */
  public async findById(uid: string): Promise<UserDTO | null> {
    try {
      const user = await UserModel.findById(uid)
      return user
    } catch (error) {
      throw new Error('comunicate con el administrador')
    }
  }
}

export default UserService