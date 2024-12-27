import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header font-inconsolata">
      <NavLink to="/" className="w-10 h-10 items-center justify-center flex font-bold">
        <p className="text-primary-text  font-extrabold">JOEYs WORLD</p>
      </NavLink>
      <nav className="text-xl flex gap-7 font-bold">
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-dark-pink-500' : 'text-primary-text')}>
          About
        </NavLink>
      </nav>
    </header>
  );
};
export default Navbar;
