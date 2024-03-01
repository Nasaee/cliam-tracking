import User, { UserType } from './user.mongo';

export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
};

export async function createNewUser(userDto: CreateUserDto) {
  const user = new User(userDto);
  await user.save();
  return user;
}

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function getAllUsersDB(): Promise<UserType[]> {
  return await User.find({}, { __v: 0, password: 0 }); // excluede __v and password
}

export async function deleteUserById(id: string) {
  await User.findByIdAndDelete(id);
}

export async function getUserById(id: string) {
  return await User.findOne({ _id: id });
}

export async function updateUserRole(id: string, newRole: UserType['role']) {
  await User.findByIdAndUpdate(id, { role: newRole });
}
