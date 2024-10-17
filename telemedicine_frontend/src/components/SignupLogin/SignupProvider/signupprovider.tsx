import { useEffect, useState } from "react";
import styles from "../modal.module.css";
import {
  getRegisterProvider,
  InitialStateRegister,
  resetErrMess,
} from "@/redux/slice/registerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "react-toastify";

interface UserFormData {
  userID: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  gender: string;
  countryName: string;
  stateName: string;
  cityName: string;
  image: any;
}

export const SignUpProvider = () => {
  const dispatch = useAppDispatch();

  const [gender, setGender] = useState<string>("MALE");
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    userID: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    countryName: "",
    stateName: "",
    cityName: "",
    address: "",
    role: "",
    gender: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  

  const { errMess, provider } = useAppSelector(
    (state: { register: InitialStateRegister }) => state.register
  );

  useEffect(() => {
    if (provider.providerID != null && errMess !== null) {
      if (errMess === "Success Register") {
        //toast.success("Register successful!");
      } else if (errMess === "Error Register") {
        toast.error("Not Registered!");
      }
      dispatch(resetErrMess());
    }
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.firstName) errors.firstName = "First Name is required.";
    if (!formData.lastName) errors.lastName = "Last Name is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!formData.password) errors.password = "Username is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = "Phone number must be numeric.";
    } else if (formData.phone.length < 10 || formData.phone.length > 15) {
      errors.phone = "Phone number must be between 10 to 15 digits.";
    }
    
    if (!formData.countryName) errors.countryName = "Country Name is required.";
    if (!formData.stateName) errors.stateName = "State Name is required.";
    if (!formData.cityName) errors.cityName = "City Name is required.";
    if (!formData.address) errors.address = "Address is required.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return; 
    formData.role = "PROVIDER";
    formData.gender = gender;
    formData.username=makeid(10);
   
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key as keyof UserFormData]);
    }
    
    dispatch(getRegisterProvider(formData));
    setFormData({
      role: "",
      userID: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      address: "",
      gender: "",
      countryName: "India",
      stateName: "Madhya Pradesh",
      cityName: "Ujjain",
      image: null,
    });
  };

  const toggleModal = () => {
    if (!isModalOpen) {
      resetForm();
    }
    setModalOpen(!isModalOpen);
  };

  const resetForm = () => {
    setFormData({
      userID: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      countryName: "",
      stateName: "",
      cityName: "",
      address: "",
      role: "",
      gender: "",
      image: null,
    });
    setFormErrors({});
  };

  function makeid(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  return (
    <div className={styles.parent}>
      <div className={styles.heading_div}>
        <h1 style={{ color: "black" }}>Sign-Up as Provider</h1>
      </div>
      <button className={styles.button} onClick={toggleModal}>
        Sign Up as Provider
      </button>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2 className={styles.h2}>Provider Sign-Up Form</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                  {formErrors.firstName && (
                  <span className={styles.error}>{formErrors.firstName}</span>
                )}
              </label>
              <label className={styles.label}>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                 {formErrors.lastName && (
                  <span className={styles.error}>{formErrors.lastName}</span>
                )}
              </label>
              <label className={styles.label} style={{display:"none"}}>
                Username:
                <input
                  type="text"
                  name="username"
                  value={makeid(10)}
                  onChange={handleChange}
                  className={styles.input}
                  style={{display:"none"}}
                />
                {formErrors.username && (
                  <span className={styles.error}>{formErrors.username}</span>
                )}
              </label>
              <div style={{ display: "flex" }}>
                <div>
                  <b>Male:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <input
                    type="radio"
                    value="MALE"
                    checked={gender === "MALE"}
                    onChange={() => setGender("MALE")}
                    className={styles.input}
                  />
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>
                  <b>Female:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <input
                    type="radio"
                    value="FEMALE"
                    checked={gender === "FEMALE"}
                    onChange={() => setGender("FEMALE")}
                    className={styles.input}
                  />
                </div>
              </div>
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
                 {formErrors.email && (
                  <span className={styles.error}>{formErrors.email}</span>
                )}
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
                {formErrors.password && (
                  <span className={styles.error}>{formErrors.password}</span>
                )}
              </label>
              <label className={styles.label}>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.phone && (
                  <span className={styles.error}>{formErrors.phone}</span>
                )}
              </label>
              <label className={styles.label}>
                Country Name:
                <input
                  type="text"
                  name="countryName"
                  value={formData.countryName}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.countryName && (
                  <span className={styles.error}>{formErrors.countryName}</span>
                )}
              </label>
              <label className={styles.label}>
                State Name:
                <input
                  type="text"
                  name="stateName"
                  value={formData.stateName}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.stateName && (
                  <span className={styles.error}>{formErrors.stateName}</span>
                )}
              </label>
              <label className={styles.label}>
                City Name:
                <input
                  type="text"
                  name="cityName"
                  value={formData.cityName}
                  onChange={handleChange}
                  className={styles.input}
                />
                 {formErrors.cityName && (
                  <span className={styles.error}>{formErrors.cityName}</span>
                )}
              </label>
              <label className={styles.label}>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
                {formErrors.address && (
                  <span className={styles.error}>{formErrors.address}</span>
                )}
              </label>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.text_field}
                />
              </div>
              <button className={styles.submitbutton} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
