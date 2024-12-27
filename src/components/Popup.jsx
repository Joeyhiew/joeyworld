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
      switch (stage) {
        case 1:
          return (
            <>
              <p className="font-medium sm:text-3xl text-center">Hey there, I'm Joey</p>
              <p className="font-medium sm:text-xl text-center">a frontend developer from Singapore.</p>
            </>
          );
        case 2:
          return (
            <>
              <p className="font-medium sm:text-xl text-center">
                I graduated from Nanyang Technological University with B.Eng in Computer Science (Highest Distinction)
              </p>
            </>
          );
        case 810:
          return (
            <>
              <p>Here in university, I participated in CTFs and build several mid sized applications</p>
            </>
          );
        case 3:
          return (
            <>
              <article className="flex flex-row justify-center">
                <img src={geometry} alt="sonification-geometry" className="w-12 h-12 object-contain rounded-lg mr-2" />

                <div className="flex flex-col">
                  <p className="sm:text-xl font-bold">Sonification of Geometry</p>
                  <p className="block max-[380px]:hidden">A Unity3D application to improve 3D perception</p>
                </div>
              </article>
              <button
                className="cta font-bold w-full"
                onClick={() => window.open('https://dr.ntu.edu.sg/handle/10356/153177')}
              >
                <p> View Bachelor Thesis</p>
                {/* <Arrow className="w-4 h-4 object-contain" fill={'#ffffff'} /> */}
                <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
              </button>
            </>
          );
        case 4:
          return (
            <>
              <p className="font-medium sm:text-xl text-center">
                After graduating, I joined TikTok as a frontend developer, where I thrive on engaging with dynamic,
                high-impact projects that spark excitement and challenge.
              </p>
            </>
          );
        case 5:
          return (
            <>
              <p className="font-medium text-center sm:text-xl">
                Working on a few side projects at the moment
                <br /> Sit back and circle back in a bit
              </p>
            </>
          );
        case 6:
          return (
            <>
              <p className="font-medium sm:text-xl text-center">
                My primary expertise revolves around front-end development, specializing in JavaScript and React.
              </p>
              <p className="sm:text-xl text-center">
                I derive immense joy from crafting visually stunning and interactive applications, as seeing the page
                spring to life brings me a deep sense of fulfillment.
              </p>
            </>
          );
        case 7:
          return (
            <>
              <p className="font-medium sm:text-2xl text-center">Want to connect?</p>
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
        default:
          return null;
      }
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
