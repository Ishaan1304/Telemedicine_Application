import Link from "next/link";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_links}>
          {/* <Link href="#">Privacy Policy</Link>
                    <Link href="/service">Terms of Service</Link>
                    <Link href="/contact">Contact Us</Link> */}
        </div>
        <p>&copy; {new Date().getFullYear()} Marvel All rights reserved.</p>
        <div className={styles.footer_social}>
          <Link
            href="https://facebook.com"
            aria-label="Facebook"
            className={styles.footerSocialLink}
          >
            <img src="/assets/fb.png" width={20} height={20} alt="Facebook" />
          </Link>
          <Link
            href="https://twitter.com"
            aria-label="Twitter"
            className={styles.footerSocialLink}
          >
            <img src="/assets/twitterFinal.jfif" width={20} height={20} alt="Twitter" />
          </Link>
          <Link
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className={styles.footerSocialLink}
          >
            <img src="/assets/linkedin.png" width={20} height={20} alt="LinkedIn" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
