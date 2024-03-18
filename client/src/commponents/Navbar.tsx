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
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { menu } from '../data';
import { NavLink } from 'react-router-dom';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.user.role);
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
        <button
          className='md:hidden bg-transparent border-none p-0 outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
      {/* mobile and tablet menu */}
      <div
        className={
          isMenuOpen
            ? 'fixed md:hidden obset-x-0 top-0 w-full h-screen bg-white translate-x-0 z-50 transition-all'
            : 'fixed md:hidden obset-x-0 top-0 w-full h-screen bg-white translate-x-full z-50 transition-all'
        }
      >
        <div className='p-3'>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='flex justify-center items-center w-6 h-6 rounded-full bg-gray-300  hover:bg-red-400 transition-all'
          >
            <IoMdClose />
          </button>
        </div>
        <ul className='flex flex-col items-center justify-center gap-5'>
          {userRole === 'admin' && (
            <li className='flex flex-col justify-center items-center text-gray-600'>
              <h4 className='font-bold text-gray-400 mb-3 uppercase tracking-wider'>
                admin
              </h4>
              <div className='flex flex-col gap-4'>
                <NavLink
                  to='/admin'
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'flex justify-center items-center gap-2 px-3 py-2  tracking-wider hover:text-indigo-500'
                      : isActive
                      ? 'flex justify-center items-center gap-2 px-3 py-2 text-white tracking-wider font-bold bg-indigo-500 rounded-md'
                      : 'flex justify-center items-center gap-2 px-3 py-2  tracking-wider hover:text-indigo-500'
                  }
                >
                  <MdOutlineAdminPanelSettings className='hidden sm:inline-block' />
                  <span>Permission</span>
                </NavLink>
              </div>
            </li>
          )}
          {menu.map((item) => {
            const { id, title, listItems } = item;
            return (
              <li
                key={id}
                className='flex flex-col justify-center items-center text-gray-600'
              >
                <h4 className='font-bold text-gray-400 mb-3 uppercase tracking-wider'>
                  {title}
                </h4>
                <div className='flex flex-col gap-4'>
                  {listItems.map((listItem) => {
                    const { id, title, url, icon: Icon } = listItem;
                    return (
                      <NavLink
                        key={id}
                        to={url}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? 'flex justify-center items-center gap-2 px-3 py-2  tracking-wider hover:text-indigo-500'
                            : isActive
                            ? 'flex justify-center items-center gap-2 px-3 py-2 text-white tracking-wider font-bold bg-indigo-500 rounded-md'
                            : 'flex justify-center items-center gap-2 px-3 py-2  tracking-wider hover:text-indigo-500'
                        }
                      >
                        <Icon className='hidden sm:inline-block' />
                        <span>{title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
