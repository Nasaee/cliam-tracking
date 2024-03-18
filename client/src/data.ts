import { nanoid } from 'nanoid';
import { CiBoxes } from 'react-icons/ci';
import { LiaBoxSolid, LiaToolsSolid } from 'react-icons/lia';
import { PiToolboxLight } from 'react-icons/pi';
import { SlHome } from 'react-icons/sl';

export const menu = [
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

export const repairStatus = ['fixed', 'broken', 'pending'];

export const applierItemsCode = [
  '544965',
  '544965A',
  '544965AF',
  '544965D',
  '544990',
  '544990A',
  '544990AF',
  '544990D',
  '544995',
  '544995A',
  '544995AF',
  '544995D',
];
