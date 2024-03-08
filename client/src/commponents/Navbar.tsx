import { CiGrid41 } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import * as apiClient from '../api-client';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { resetUser } from '../store/user/userSlice';
import { useMutation, useQueryClient } from 'react-query';

const Navbar = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      dispatch(resetUser());

      toast.success('Logged out successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  const username = useSelector((state: RootState) => state.user.username);
  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <nav className='w-full flex justify-between items-center px-[20px] py-[10px]'>
      <div className='logo | '>
        <img src='/logo.png' alt='' className='w-16' />
      </div>
      <div className=' flex items-center justify-center gap-4'>
        <button className='md:hidden bg-transparent border-none p-0 outline-none'>
          <CiGrid41 className='text-xl' />
        </button>
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 bg-transparent border-none p-0 outline-none hover:text-indigo-300'
        >
          <CiLogout className='text-xl ' /> Logout
        </button>

        <div className='user | flex items-center gap-2'>
          <FaUserCircle className='text-xl' />
          <span className='capitalize text-md'>{username ? username : ''}</span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
