import styles from './welcomemessage.module.css';

export const WelcomeMessage = (props:any) => {
  return (
    <div className={styles.welcome_message}>  
      <h1>Welcome - {props.firstName+" "+props.lastName}</h1>
    </div>
  );
}


