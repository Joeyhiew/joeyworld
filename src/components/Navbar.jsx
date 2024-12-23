import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="header font-barlow">
      <NavLink className="w-10 h-10 items-center justify-center flex font-bold">
        <p className="text-primary-text">JOEYs WORLD</p>
      </NavLink>
      <nav className="text-lg flex gap-7 font-medium">
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-dark-pink-500' : 'text-primary-grey')}>
          About
        </NavLink>
        {/* <NavLink to="/projects" className={({ isActive }) => (isActive ? 'text-dark-pink-500' : 'text-primary-grey')}>
          Projects
        </NavLink> */}
      </nav>
    </header>
  );
};
export default Navbar;
