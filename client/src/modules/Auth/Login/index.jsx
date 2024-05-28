import React, { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input, PasswordInput } from "../../../components";
import { hooks } from "../../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { PrivatePaths, PublicPaths } from "../../../routes/path";
import login from "./login.module.css";
import lotus from "../../../assets/Group-19.png";
import facebook from "../../../assets/devicon_facebook.png";
import google from "../../../assets/flat-color-icons_google.png";
import swal from "sweetalert";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
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

  const { mutate, isSuccess, isError, error, reset } = hooks.useLogin();

  if (isSuccess) {
    reset();
    swal({
      title: "Success",
      text: "Login Successful",
      icon: "success",
    });
    setFormData(initialFormData);
    navigate(PrivatePaths.DASHBOARD);
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
    const validationErrors = {};

    if (typeof formData.email === "string" && !formData.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (typeof formData.password === "string" && !formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    mutate(formData);
  };

  return (
    <div className={login.container}>
      <section className={login.sectionOne}>
        <div>
          <h3 className={login.text}>Login</h3>
          <h3>to your account</h3>
        </div>
      </section>
      <section className={login.sectionTwo}>
        <div className={login.lotusLogo}>
          <img src={lotus} alt="Lotushop logo" />
        </div>

        <div className={login.loginContainer}>
          <p className={login.loginText}>
            Welcome back, Please <br />
            Login to continue.
          </p>
        </div>

        <div className={login.tabContent}>
          <FormGroup
            errors={errors}
            setErrors={setErrors}
            validation={formData}
            onSubmit={submitHandler}
          >
            <Input
              type="text"
              name="email"
              id="email-buyer"
              placeholder="Email Address"
              value={formData.email}
              onChange={(name, value) => handleChange(name, value)}
              error={errors.email}
              required={true}
              labelDisplayed={false}
              className={login.loginField}
              validationHandler={validationHandler}
              size="large"
            />

            <PasswordInput
              type="password"
              name="password"
              id="password-buyer"
              placeholder="Password"
              value={formData.password}
              onChange={(name, value) => handleChange(name, value)}
              error={errors.password}
              required={true}
              labelDisplayed={false}
              className={login.passwordField}
              validationHandler={validationHandler}
              size="large"
            />

            <div className={login.linkBlock}>
              <div className={login.rememberBlock}>
                <input
                  type="checkbox"
                  className={login.check}
                  name="check"
                  id="remember-buyer"
                  value="check"
                  required={false}
                />
                <label htmlFor="remember" className={login.remember}>
                  Remember me
                </label>
              </div>

              <Link to={PublicPaths.FORGOT_PASSWORD} className={login.forgot}>
                Forgot Password
              </Link>
            </div>

            <div className={login.btnsContainer}>
              <Button
                title="Login"
                type="submit"
                className={login.loginBtn}
                loading={Boolean(isLoading)}
              />
              <Button
                title="Sign Up"
                type="button"
                onClick={() => navigate(PublicPaths.REGISTER)}
                className={login.signupBtn}
              />
            </div>
          </FormGroup>
        </div>

        <div className={login.altLinksSection}>
          <p>Or login with</p>

          <div className={login.altLinksContainer}>
            <a href="/facebook" className={login.altLinks}>
              <img src={facebook} alt="Facebook logo" />
              <span>Facebook</span>
            </a>

            <a href="/google" className={login.altLinks}>
              <img src={google} alt="Google logo" />
              <span>Google</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
