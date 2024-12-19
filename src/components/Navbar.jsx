import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="header">
            <NavLink className='w-10 h-10 rounded-lg bg-white items-center justify-center flex shadow-md font-bold'>
                <p className="blue-gradient_text">JH</p>
            </NavLink>
            <nav className="text-lg flex gap-7 font-medium">
                <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500' : 'text-black'}>About</NavLink>
                <NavLink to="/projects" className={({isActive}) => isActive ? 'text-blue-500' : 'text-black'}>Projects</NavLink>
            </nav>
        </header>
    )
}
export default Navbar;