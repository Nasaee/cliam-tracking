import { Link } from 'react-router-dom';
import { menu } from '../data';

const Menu = () => {
  return (
    <aside className='menu | flex flex-col gap-2'>
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
                <Link
                  to={url}
                  className='flex items-center gap-2 text-[0.8rem] tracking-wider p-2 hover:bg-[#384256] rounded-md'
                  key={id}
                >
                  <Icon className='text-[1.05rem]' />
                  <span className=''>{title}</span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
};

export default Menu;
