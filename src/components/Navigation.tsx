import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='p-d-flex p-jc-around'>
      <NavLink to='/'>Table</NavLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
    </div>
  );
};

export default Navigation;
