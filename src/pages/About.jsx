import { NavLink } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const About = () => {
  return (
    <section className="mx-72 my-24">
      <Breadcrumb
        separator={<p className="text-secondary-text-dark">/</p>}
        items={[
          {
            title: (
              <NavLink to="/" className="items-center justify-center flex font-bold">
                <p className="text-secondary-text-dark">JOEYs WORLD</p>
              </NavLink>
            ),
          },
          {
            title: <p className="text-secondary-text-dark">About</p>,
          },
        ]}
      />
      <main className="text-primary-text-dark mt-12">
        <h1 className="text-3xl">
          I'm Joey, an engineer who's passionate about creating beautiful and user friendly applications.
        </h1>

        <article className="mt-6 text-lg">
          During my University, I took several internships in companies like Perx technologies (startup), GovTech
          Singapore (government tech agency), and NCS (MNC). After graduation, I joined TikTok as a Frontend developer.
        </article>
        <article className="mt-6 text-lg">
          I enjoy building websites and applications using the MERN stack with a focus in frontend.
        </article>
        <article className="mt-6">
          <p className="text-2xl">Education</p>
          <p className="text-lg mt-2">
            I graduated from Nanyang Technological University with a Bachelors in Engineering Computer Science (Highest
            Distinction).
          </p>
        </article>
      </main>
    </section>
  );
};
export default About;
