import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.serviceInfo}>
          <i>
          &quot;We would love to hear from you! Whether you have a question,
            feedback, or need support, feel free to reach out to us through the
            form aside or via our social media channels.&quot;
          </i>
        </div>
        <div className={styles.contactUs}>
          <div>
            <h2>Contact Us</h2>
            {submitted ? (
              <div className={styles.thankYouMessage}>
                <h3>Thank You!</h3>
                <p>
                  Your message has been sent successfully. We will get back to
                  you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
