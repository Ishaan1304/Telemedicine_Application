import { useEffect, useState } from "react";
import styles from "../modal.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";
import {
  InitialState,
  loginUser,
  resetErrMess,
} from "@/redux/slice/loginSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { toast } from "react-toastify";

export const Login = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { role, token, loggedIn, errorMessage, errMess, loading } = useSelector(
    (state: { login: InitialState }) => state?.login
  );

  const [isLoading,setIsLoading] = useState<boolean>(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errMess) {
      if (loggedIn) {
        toast.success("Login successful!");
        dispatch(resetErrMess());
        if (role === "ADMIN") {
          router.push("admin_home/home");
        } else if (role === "PROVIDER") {
          router.push("provider_home/home");
        } else {
          router.push("patient_home/home");
        }
      }
      if (errorMessage) {
        setIsLoading(false)
        setError(errorMessage);
        toast.error("Invalid Username and Password");
        dispatch(resetErrMess());
      }
    }
  }, [loggedIn, role, router, errorMessage, errMess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if(isLoading)return;
    setIsLoading(true);
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      resetForm();
    }
    setModalOpen(!isModalOpen);
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.heading_div}>
        <h1 style={{ color: "black" }}>Login</h1>
      </div>
      <button className={styles.button} onClick={toggleModal}>
        Login
      </button>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2 className={styles.h2}>Login Here</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
              {errorMessage && (
                <p className={styles.error_message}>{errorMessage}</p>
              )}
              <button
                className={styles.submitbutton}
                type="submit"
                disabled={isLoading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
