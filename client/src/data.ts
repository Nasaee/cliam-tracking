import { nanoid } from 'nanoid';
import { LiaToolsSolid } from 'react-icons/lia';
import { SlHome } from 'react-icons/sl';
import { TfiDropboxAlt } from 'react-icons/tfi';

const menu = [
  {
    id: nanoid(),
    title: 'main',
    listItems: [
      {
        id: nanoid(),
        title: 'Homepage',
        url: '/',
        icon: SlHome,
      },
    ],
  },
  {
    id: nanoid(),
    title: 'claim',
    listItems: [
      {
        id: nanoid(),
        title: 'Applier',
        url: '/claim-hemolok-applier',
        icon: LiaToolsSolid,
      },

      {
        id: nanoid(),
        title: 'Add applier',
        url: '/add-appliers',
        icon: TfiDropboxAlt,
      },
    ],
  },
];

export { menu };
