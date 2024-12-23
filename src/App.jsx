import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { WrappedHome, WrappedAbout, WrappedProjects } from './pages';

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<WrappedHome />} />
          <Route path="/about" element={<WrappedAbout />} />
          <Route path="/projects" element={<WrappedProjects />} />
        </Routes>
      </Router>
    </main>
  );
};
export default App;
