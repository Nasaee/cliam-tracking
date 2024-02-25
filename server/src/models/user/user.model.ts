import User from './user.mongo';

export type CreateUserDto = {
  username: string;
  email: string;
  password: string;
};

async function createNewUser(userDto: CreateUserDto) {
  const user = new User(userDto);
  await user.save();
  return user;
}

async function getUser(email: string) {
  return await User.findOne({ email });
}

export { createNewUser, getUser };
