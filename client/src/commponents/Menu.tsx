import { NavLink } from 'react-router-dom';
import { menu } from '../data';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <aside
      className={`menu | flex flex-col gap-2 ${
        isMenuOpen ? 'lg:w-[250px]' : null
      }`}
    >
      <div className='button-container | flex items-center justify-end mb-5'>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='bg-transparent p-0 inline-block w-auto text-right text-lg'
        >
          {isMenuOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      {menu.map((item) => {
        const { id, title, listItems } = item;
        return (
          <div className='item | flex flex-col gap-3 mb-5' key={id}>
            <span className='uppercase text-[#ddd] text-[0.6rem] font-[400]'>
              {title}
            </span>
            {listItems.map((listItem) => {
              const { id, title, url, icon: Icon } = listItem;
              return (
                <NavLink
                  to={url}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? 'flex items-center text-[0.8rem] tracking-wider p-2 hover:bg-[#384256] rounded-md'
                      : isActive
                      ? 'flex items-center text-[0.8rem] tracking-wider p-2 bg-[#384256] rounded-md'
                      : 'flex items-center text-[0.8rem] tracking-wider p-2 hover:bg-[#384256] rounded-md'
                  }
                  key={id}
                >
                  <Icon className='text-[1.05rem]' />
                  {isMenuOpen && <span className='ml-2'>{title}</span>}
                </NavLink>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
};

export default Menu;
