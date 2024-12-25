import { Html } from '@react-three/drei';
import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';

const Loader = ({ onUnmount, onMount }) => {
  const { progress } = useProgress();

  useEffect(() => {
    onMount();
    return () => {
      onUnmount();
    };
  }, []);

  return (
    <Html className="left-[-25vw] flex flex-col items-center">
      <span className="text-dark-pink-500 text-3xl font-amatic">Joey's world loading...</span>
      <div className="h-[25px] w-[50vw] rounded-full  border-2 border-opacity-30 border-dark-pink-500">
        <div className="h-[21px] bg-red-300 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </Html>
  );
};

export default Loader;
