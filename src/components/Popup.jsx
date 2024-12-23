import { useEffect } from 'react';
import { Arrow, arrow, github, linkedin, mail, geometry } from '../assets/icons';
import { useState } from 'react';
import { useCallback } from 'react';

const Popup = ({ currentStage }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [prev, setPrev] = useState(null);
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    if (currentStage !== prev) {
      setPrev(currentStage);
      if (!currentStage) {
        setIsMounted(false);
      } else {
        setContent(renderContent({ stage: currentStage }));
        setIsMounted(true);
        !showDiv && setShowDiv(true);
      }
    }
  }, [currentStage]);

  const renderContent = useCallback(
    ({ stage }) => {
      if (stage === 1)
        return (
          <>
            <p className="font-medium sm:text-xl text-center">
              My journey as a software engineer started in University, where I studied computer science
            </p>
            <article className="flex flex-row justify-center">
              <img src={geometry} alt="sonification-geometry" className="w-12 h-12 object-contain rounded-lg mr-2" />

              <div className="flex flex-col">
                <p className="font-medium sm:text-xl ">Sonification of Geometry</p>
                <p className="block max-[380px]:hidden">A Unity3D application to improve 3D perception</p>
              </div>
            </article>
            <button className="cta font-bold ">
              <p> View Bachelor Thesis</p>
              {/* <Arrow className="w-4 h-4 object-contain" fill={'#ffffff'} /> */}
              <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
            </button>
          </>
        );

      if (stage === 2) {
        return (
          <>
            <p className="font-medium sm:text-xl text-center">
              After graduating, I worked in TikTok as a Frontend developer
            </p>
          </>
        );
      }

      if (stage === 3) {
        return (
          <>
            <p className="font-medium text-center sm:text-xl">
              Working on a few side projects at the moment
              <br /> Sit back and circle back in a bit
            </p>
          </>
        );
      }

      if (stage === 4) {
        return (
          <>
            <p className="font-medium sm:text-xl text-center">
              My main focus lies on the front-end in Javascript and React development
            </p>
            <p className="sm:text-xl text-center">I enjoy building beautiful and interactive applications</p>
          </>
        );
      }

      if (stage === 5) {
        return (
          <>
            <p className="font-medium sm:text-xl text-center">Want to connect?</p>
            <div className="flex flex-row gap-4">
              <div className="icon-btn" onClick={() => window.open('https://www.linkedin.com/in/joey-hiew-mun-yee/')}>
                <img src={linkedin} alt="linkedin" className="w-8 h-8 object-contain hover:w-10 hover:h-10" />
              </div>
              <div className="icon-btn" onClick={() => window.open('https://github.com/Joeyhiew')}>
                <img src={github} alt="github" className="w-8 h-8 object-contain hover:w-10 hover:h-10" />
              </div>
              <div className="icon-btn" onClick={() => window.open('mailto:joeyhiew@live.com.sg')}>
                <img src={mail} alt="email" className="w-8 h-8 object-contain hover:w-10 hover:h-10" />
              </div>
            </div>
          </>
        );
      }

      return null;
    },
    [currentStage],
  );

  // set opacity change for animation fade
  return (
    <>
      {showDiv && (
        <>
          <div className={`info-box ${isMounted ? 'opacity-100' : 'opacity-0'}`}>{content}</div>
        </>
      )}
    </>
  );
};

export default Popup;
