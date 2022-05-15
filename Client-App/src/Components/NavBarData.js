import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const NavBarData = [
  {
    title: 'Home',
    path: '/Home',
    icon: <AiIcons.AiFillHome size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'My Profile',
    path: '/Profile',
    icon: <FaIcons.FaUserAlt size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'Find New People',
    path: '/People',
    icon: <IoIcons.IoIosPeople size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/Chats',
    icon: <AiIcons.AiFillMessage size={25}/>,
    cName: 'nav-text'
  },
  {
    title: 'FriendRequests',
    path: '/FriendRequests',
    icon: <IoIcons.IoMdNotifications size={25}/>,
    cName: 'nav-text'
  }
  // ,
  // {
  //   title: 'Support',
  //   path: '/Support',
  //   icon: <IoIcons.IoMdHelpCircle size={30}/>,
  //   cName: 'nav-text'
  // }
  
];
