import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-indigo-500  text-white">
            {/* Sidebar content here */}
            
            <li><Link to='/'>New member</Link></li>
            <li><Link to='members'>All girls</Link></li>
       
          </ul>
        
        </div>
      </div>
    );
};

export default Navbar;