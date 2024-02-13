import { useState } from 'react';
import { CiGrid41 } from 'react-icons/ci';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className='w-full flex justify-between items-center px-[20px] py-[10px]'>
      <div className='logo | '>
        <p>ICON</p>
      </div>
      <div className='menu | flex items-center justify-center gap-4'>
        <button className='bg-transparent border-none p-0 outline-none'>
          <CiGrid41 className='text-xl' />
        </button>
        <button
          className='bg-transparent border-none p-0 outline-none'
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? (
            <CiLogout className='text-xl' />
          ) : (
            <CiLogin className='text-xl' />
          )}
        </button>

        <div className='user | flex items-center gap-2'>
          <img
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='image profile'
            className='w-5 h-5 rounded-full '
          />
          <span className='text-xs'>John Doe</span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
