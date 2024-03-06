import * as apiClient from '../api-client';
import Loading from '../commponents/Loading';
import { UserType } from '../store/user/userSlice';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { userRole } from '../config/config';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export type UserResponseType = {
  _id: string;
  username: string;
  email: string;
  role: UserType['role'];
};

const AdminPermission = () => {
  const [oldUserRole, setOldUserRole] = useState<
    UserResponseType['role'] | null
  >(null);
  const [editUserRole, setEditUserRole] = useState<UserResponseType | null>(
    null
  );
  const [openUpdateRoleForm, setOpenUpdateRoleForm] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: apiClient.getAllUsers,
  });

  const mutation = useMutation({
    mutationFn: apiClient.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllUsers'] });
      toast.success('User deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: (params: { id: string; newUserRole: apiClient.Role }) =>
      apiClient.updateUserRole(params.id, params.newUserRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAllUsers'],
      });
      queryClient.invalidateQueries({
        queryKey: ['validateToken'],
      });
      toast.success('User update successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      mutation.mutate(id);
    }
  };

  const handleEdit = (user: UserResponseType) => {
    setOldUserRole(user.role);
    setEditUserRole(user);
    setOpenUpdateRoleForm(true);
  };

  const handleDropDownRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const changedRole = e.target.value as UserType['role'];
    if (changedRole === editUserRole?.role) return;
    setEditUserRole({ ...editUserRole!, role: changedRole });
  };

  const saveRoleChangesToDb = (
    e: React.FormEvent<HTMLFormElement>,
    newUpdatedUser: UserResponseType
  ) => {
    e.preventDefault();
    if (oldUserRole === newUpdatedUser.role) {
      setOpenUpdateRoleForm(false);
      return;
    }

    if (newUpdatedUser.role !== null) {
      updateRoleMutation.mutate({
        id: newUpdatedUser._id,
        newUserRole: newUpdatedUser.role,
      });
    }

    setOpenUpdateRoleForm(false);
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
                      onClick={() => handleEdit(user)}
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
      {/* Update role form */}
      {openUpdateRoleForm && (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.33)] flex items-start justify-center'>
          <div className='max-w-[500px] bg-white text-black p-10 rounded-lg shadow-md'>
            <p className='capitalize font-bold mb-4'>Change user role for :</p>
            <h3 className='text-blue-600 text-lg'>{editUserRole?.email}</h3>

            <form
              className='max-w-sm mx-auto'
              onSubmit={(e) => saveRoleChangesToDb(e, editUserRole!)}
            >
              <label
                htmlFor='countries'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Select an option
              </label>
              <select
                id='countries'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                onChange={handleDropDownRoleChange}
              >
                <option>Choose a role</option>
                {userRole.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className='flex justify-end gap-3 mt-6'>
                <button
                  type='submit'
                  className='text-white bg-indigo-500 hover:bg-indigo-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
                >
                  Save
                </button>
                <button
                  type='button'
                  className='text-gray-600 bg-white hover:text-red-600 border-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
                  onClick={() => {
                    setOpenUpdateRoleForm(false);
                    setEditUserRole(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPermission;
