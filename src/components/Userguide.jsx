import { draghold } from '../assets/icons/index.js';

const UserGuide = () => {
  return (
    <div className="absolute top-28 left-[50%] translate-x-[-50%] z-10 flex flex-col items-center">
      <img src={draghold} className="w-16" />
      <p>Drag to explore</p>
    </div>
  );
};
export default UserGuide;
