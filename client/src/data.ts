import { nanoid } from 'nanoid';
import { CiBoxes } from 'react-icons/ci';
import { LiaBoxSolid, LiaToolsSolid } from 'react-icons/lia';
import { PiToolboxLight } from 'react-icons/pi';
import { SlHome } from 'react-icons/sl';

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
        title: 'OtherProducts',
        url: '/claim-other-products',
        icon: PiToolboxLight,
      },

      {
        id: nanoid(),
        title: 'Add applier',
        url: '/add-appliers',
        icon: LiaBoxSolid,
      },
      {
        id: nanoid(),
        title: 'Add other Products',
        url: '/add-other-products',
        icon: CiBoxes,
      },
    ],
  },
];

export { menu };
