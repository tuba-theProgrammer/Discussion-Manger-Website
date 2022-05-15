import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const NavBarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome size={30}/>,
    cName: 'nav-text'
  },
  {
    title: 'My Profile',
    path: '/reports',
    icon: <FaIcons.FaUserAlt size={30}/>,
    cName: 'nav-text'
  },
  {
    title: 'Find New People',
    path: '/products',
    icon: <IoIcons.IoIosPeople size={30}/>,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/team',
    icon: <AiIcons.AiFillMessage size={30}/>,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle size={30}/>,
    cName: 'nav-text'
  }
];
