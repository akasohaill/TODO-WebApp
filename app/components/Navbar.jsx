// Importing React library
import React from 'react';

// Functional component Navbar to render a navigation bar
const Navbar = () => {
  return (
    // Container div for the navigation bar
    <div className='flex py-3 flex-wrap justify-around'>
      {/* Heading displaying the title of the app */}
      <h1 className='text-lg font-semibold'>Todo App</h1>
      {/* Unordered list containing navigation links */}
      <ul className='flex gap-[40px] text-m'>
        {/* List item for Home link */}
        <li>Home</li>
        {/* List item for About link */}
        <li>About</li>
        {/* List item for Contact link */}
        <li>Contact</li>
        {/* List item for Products link */}
        <li>Products</li>
      </ul>
    </div>
  );
}

// Exporting the Navbar component as default
export default Navbar;
