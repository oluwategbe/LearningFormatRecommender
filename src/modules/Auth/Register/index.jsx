import React, { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input, PasswordInput } from "../../../components";
import { hooks } from "../../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { PrivatePaths, PublicPaths } from "../../../routes/path";
import register from "./register.module.css";
import lotus from "../../../assets/Group-19.png";
import facebook from "../../../assets/devicon_facebook.png";
import google from "../../../assets/flat-color-icons_google.png";

const initialFormData = {
  firstname: "",
  middlename: "",
  lastname: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
  dob: "",
  phone: "",
};

const Register = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const { mutate, isSuccess, reset, isError, error } = hooks.useRegister();
  if (isSuccess) {
    reset();
    swal({
      title: "Account Created",
      text: "Welcome on board! your account is ready for use! Please proceed to login",
      icon: "success",
    });
    setFormData(initialFormData);
    setTimeout(() => {
      navigate(PublicPaths.LOGIN);
    }, 5000);
  }
  if (isError) {
    reset();
    swal({
      title: "A error occured",
      text: error,
      icon: "warning",
      dangerMode: true,
    });
  }
  const submitHandler = () => {
    if (formData.password !== formData.confirmPassword) {
      return swal({
        title: "Error",
        text: "Ooops! Password does not match",
        icon: "warning",
        dangerMode: true,
      });
    }
    mutate(formData);
  };

  return (
    <div>
      <div className={register.container}>
        <section className={register.sectionOne}>
          <div>
            <h3 className={register.text}>Create</h3>
            <h3>a new account</h3>
          </div>
        </section>
        <section className={register.sectionTwo}>
          <div className={register.lotusLogo}>
            <img src={lotus} alt="Lotushop logo" />
          </div>

          <div className={register.registerContainer}>
            <div className={register.signupText}>
              <h3>Sign up for an Account</h3>
              <p>Let's get you all set up!</p>
            </div>

            {/* BUYER */}
            <div className={register.tabContent}>
              <FormGroup
                onSubmit={submitHandler}
                errors={errors}
                setErrors={setErrors}
                validation={formData}
              >
                <Input
                  type="text"
                  name="firstname"
                  id="seller-firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  error={errors.firstname}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                  size="medium"
                />

                <Input
                  type="text"
                  name="lastname"
                  id="seller-lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  error={errors.lastname}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                />

                <Input
                  type="text"
                  name="email"
                  id="signup-seller-email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                />
                <Input
                  type="text"
                  name="phone"
                  id="signup-seller-phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                />

                <PasswordInput
                  type="password"
                  name="password"
                  id="signup-buyer-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                  size="large"
                />

                <PasswordInput
                  type="password"
                  name="confirmPassword"
                  id="signup-buyer-password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required={true}
                  labelDisplayed={false}
                  validationHandler={validationHandler}
                  size="large"
                />

                <div className={register.linkBlock}>
                  <input
                    type="checkbox"
                    id="seller-check"
                    className={register.check}
                    name="check"
                    value="check"
                    required={false}
                  />

                  <span className={register.agreement}>
                    I have read and accepted the
                    <Link to=":" className={register.terms}>
                      terms and conditions
                    </Link>
                  </span>
                </div>

                <Button
                  title="Create Account"
                  type="submit"
                  className={register.registerBtn}
                  size="large"
                  loading={Boolean(isLoading)}
                />
                <div className={register.center}>
                  <p>
                    Got an account? <Link to={PublicPaths.LOGIN}>Login</Link>
                  </p>
                </div>
              </FormGroup>
            </div>
          </div>

          <div className={register.altLinksSection}>
            <p>Or login with</p>

            <div className={register.altLinksContainer}>
              <a href="/facebook" className={register.altLinks}>
                <img src={facebook} alt="Facebook logo" />
                <span>Facebook</span>
              </a>

              <a href="/google" className={register.altLinks}>
                <img src={google} alt="Google logo" />
                <span>Google</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
