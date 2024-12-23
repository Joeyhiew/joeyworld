import { Link } from 'react-router-dom';

import { arrow, github, linkedin, mail } from '../assets/icons';
import { useMemo } from 'react';

const Popup = ({ currentStage }) => {
  const renderContent = useMemo(() => {
    if (currentStage === 1)
      return (
        <>
          <p className="font-medium sm:text-xl text-center">
            My journey as a software engineer started in University, where i studied computer science
          </p>
          <article className="flex flex-row justify-center">
            <img src={arrow} alt="arrow" className="w-8 h-8 object-contain" />

            <div className="flex flex-col">
              <p className="font-medium sm:text-xl ">Sonification of Geometry</p>
              <p>A Unity3D application to improve 3D perception</p>
            </div>
          </article>
          <button className="cta font-bold ">
            <p> View Bachelor Thesis</p>
            <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
          </button>
        </>
      );

    if (currentStage === 2) {
      return (
        <>
          <p className="font-medium sm:text-xl text-center">
            After graduating, I worked in TikTok as a Frontend developer
          </p>
        </>
      );
    }

    if (currentStage === 3) {
      return (
        <>
          <p className="font-medium text-center sm:text-xl">
            Working on a few side projects at the moment
            <br /> Sit back and circle back in a bit
          </p>
        </>
      );
    }

    if (currentStage === 4) {
      return (
        <>
          <p className="font-medium sm:text-xl text-center">My main focus lies on the front-end in</p>
          <br />
          Javascript and React development
          <br />I enjoy building beautiful and interactive applications
        </>
      );
    }

    if (currentStage === 5) {
      return (
        <>
          <p className="font-medium sm:text-xl text-center">Want to connect?</p>
          <div className="flex flex-row gap-4">
            <div className="icon-btn">
              <img src={linkedin} alt="linkedin" className="w-8 h-8 object-contain" />
            </div>
            <div className="icon-btn">
              <img src={github} alt="github" className="w-8 h-8 object-contain" />
            </div>
            <div className="icon-btn">
              <img src={mail} alt="email" className="w-8 h-8 object-contain" />
            </div>
          </div>
        </>
      );
    }

    return null;
  }, []);

  // set opacity change for animation fade
  return <div className={`info-box ${currentStage ? 'opacity-100' : 'opacity-0'}`}>{renderContent()}</div>;
};

export default Popup;
