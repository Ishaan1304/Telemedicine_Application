
import { SignUpPatient } from "@/components/SignupLogin/SignupPatient/signuppatient";
import styles from "../styles/signuplogin.module.css";
import React from "react";
import { SignUpProvider } from "@/components/SignupLogin/SignupProvider/signupprovider";
import { Login } from "@/components/SignupLogin/Login/login";


const SignUpLogin = () => {
  return (
    <>
      <div className={styles.container}>
        <SignUpPatient />
        <SignUpProvider />
        <Login />
      </div>
    </>
  );
};

export default SignUpLogin;
