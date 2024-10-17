import Link from "next/link";
import styles from "./header.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import { logoutUser } from "@/redux/slice/loginSlice";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";

export const Header = () => {
  const token = useAppSelector((state: any) => state.login.token);
  const loggedIn = useAppSelector((state: any) => state.login.loggedIn);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role") ?? "");
    }
  }, [loggedIn]);

  const handleLogout = async () => {
    dispatch(logoutUser(token));
    setIsLoggedIn(false);
    router.push("/");
  };

  const renderUserHomeLink = () => {
    switch (role) {
      case "PATIENT":
        return (
          <Link href="/patient_home/home" className={styles.nav_link}>
            Home
          </Link>
        );
      case "PROVIDER":
        return (
          <Link href="/provider_home/home" className={styles.nav_link}>
            Home
          </Link>
        );
      case "ADMIN":
        return (
          <Link href="/admin_home/home" className={styles.nav_link}>
            Home
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <Image
          src="/assets/logo.jfif"
          alt="Telemedicine App Logo"
          className={styles.logo}
          width={10}
          height={2}
        />
        <h1 className={styles.title}>Dr. Strange</h1>
      </div>
      <nav className="nav">
        {isLoggedIn ? (
          <>
            {renderUserHomeLink()}
            <Link href={"/about"} className={styles.nav_link}>
              About
            </Link>
            <Link href={"/service"} className={styles.nav_link}>
              Service
            </Link>
            <Link href={"/contact"} className={styles.nav_link}>
              Contact
            </Link>
            <button onClick={handleLogout} className={styles.button_logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href={"/"} className={styles.nav_link}>
              Home
            </Link>
            <Link href={"/about"} className={styles.nav_link}>
              About
            </Link>
            <Link href={"/service"} className={styles.nav_link}>
              Service
            </Link>
            <Link href={"/contact"} className={styles.nav_link}>
              Contact
            </Link>
            <Link href="/signuplogin" className={styles.nav_link}>
              Sign-Up/Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
