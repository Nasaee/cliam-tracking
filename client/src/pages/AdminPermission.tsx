import { useQuery } from '@tanstack/react-query';
import * as apiClinet from '../api-client';
import Loading from './Loading';
import { UserType } from '../store/user/userSlice';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useState } from 'react';

export type UserResponseType = {
  _id: string;
  username: string;
  email: string;
  role: UserType['role'];
};

const AdminPermission = () => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);

  const { data: users, isPending } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: apiClinet.getAllUsers,
  });

  if (isPending) {
    return <Loading />;
  }

  const handleDelete = (id: string) => {
    console.log(id);
  };

  return (
    <div className='bg-white h-full px-6 overflow-auto relative'>
      <h1>Manage users</h1>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead className='text-xs text-white uppercase bg-[#2a3447a6]'>
          <tr>
            <th scope='col' className='px-4 py-4'>
              #
            </th>
            <th scope='col' className='px-4 py-4'>
              Username
            </th>
            <th scope='col' className='px-4 py-4'>
              Email
            </th>
            <th scope='col' className='px-4 py-4'>
              Role
            </th>

            <th scope='col' className='px-4 py-4 w-32'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(users as UserResponseType[]).map((user, index) => {
            const { _id, username, role, email } = user;
            return (
              <tr key={_id}>
                <td className='px-4 py-3'>{index + 1}</td>
                <th
                  scope='row'
                  className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'
                >
                  {username}
                </th>
                <td className='px-4 py-3'>{email}</td>
                <td className='px-4 py-3'>{role}</td>
                <td className='flex justify-center gap-2 px-4 py-3 flex-grow-0'>
                  <button type='button'>
                    <FaRegEdit
                      className='text-[#51cf66]'
                      onClick={() => setOpenEditForm(!openEditForm)}
                    />
                  </button>
                  <button type='button'>
                    <RiDeleteBin5Line
                      className='text-[#fa5252] cursor-pointer'
                      onClick={() => handleDelete(_id)}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openEditForm && (
        <div className='absolute inset-x-0 inset-y-0 grid place-items-center bg-[rgba(0,0,0,0.35)]'>
          <div>hello</div>
        </div>
      )}
    </div>
  );
};
export default AdminPermission;
