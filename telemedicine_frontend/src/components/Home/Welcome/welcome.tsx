import Link from 'next/link';
import styles from './welcome.module.css';


export const Welcome = () => {
    return (
        <div className={styles.content}>
            <div className={styles.overlay}>
                <h1 className={styles.welcome_message}>Welcome to Dr. Strange </h1>
            </div>
            <div>
                <Link href={'signuplogin'} className={styles.getStartedLink}>Get Started</Link>
            </div>
        </div>
    )
}