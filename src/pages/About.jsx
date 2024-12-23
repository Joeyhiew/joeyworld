import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const About = () => {
  return (
    <section className="mx-64 my-24">
      <Breadcrumb
        items={[
          {
            title: (
              <NavLink to="/" className="w-10 h-10 items-center justify-center flex font-bold">
                <p className="text-primary-text">JOEYs WORLD</p>
              </NavLink>
            ),
          },
          {
            title: 'About',
          },
        ]}
      />
      <main className="text-primary-text-dark">
        <h1 className="text-3xl">
          I'm Joey, an engineer who's passionate about creating beautiful and user friendly applications.
        </h1>

        <article className="mt-4">
          During my University, I took several internships in companies like Perx technologies (startup), GovTech
          Singapore (government tech agency), and NCS (MNC). After graduation, I joined TikTok as a Frontend developer.
        </article>
        <article className="mt-4">
          I enjoy building websites and applications using the MERN stack with a focus in frontend.
        </article>
        <article className="mt-4">
          <p className="text-2xl">Education</p>
          <p>
            I graduated from Nanyang Technological University with a Bachelors in Engineering Computer Science (Highest
            Distinction)
          </p>
        </article>
      </main>
    </section>
  );
};
export default About;
