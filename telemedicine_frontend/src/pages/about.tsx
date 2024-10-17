import React from "react";
import styles from "../styles/About.module.css";

const About = () => {
  return (
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p>
          Welcome to TeleMed, your trusted partner in telemedicine. Our mission
          is to provide convenient and accessible healthcare services through
          innovative technology. Our team of dedicated professionals is
          committed to delivering high-quality medical consultations from the
          comfort of your home.
        </p>

        <h3>Our Story</h3>
        <p>
          Founded in 2022, TeleMed was created with the vision of transforming
          the healthcare experience by bridging the gap between patients and
          healthcare providers. We understand the challenges of accessing timely
          medical care and aim to make healthcare more accessible, efficient,
          and personalized.
        </p>

        <h3>Our Team</h3>
        <div className={styles.team}>
          <div className={styles.teamMember}>
            <img src="/assets/team1.jfif" alt="Dr. Jane Smith" />
            <h4>Dr. Jane Smith</h4>
            <p>
              Chief Medical Officer - With over 15 years of experience in
              internal medicine, Dr. Smith leads our medical team with expertise
              and compassion.
            </p>
          </div>
          <div className={styles.teamMember}>
            <img src="/assets/team2.jfif" alt="John Doe" />
            <h4>John Doe</h4>
            <p>
              Head of Technology - John is a tech enthusiast who ensures our
              platform runs smoothly and securely, bringing the latest
              advancements to our users.
            </p>
          </div>
          <div className={styles.teamMember}>
            <img src="/assets/team3.jfif" alt="Sarah Johnson" />
            <h4>Sarah Johnson</h4>
            <p>
              Customer Support Lead - Sarah and her team are here to assist you
              with any questions or issues, ensuring a seamless experience for
              all our users.
            </p>
          </div>
        </div>
      </section>
    
  );
};

export default About;
