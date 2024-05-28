import React, { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup, Input } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { PrivatePaths, PublicPaths } from "../../../routes/path";
import forgot from "./forgot.module.css";
import lotus from "../../../assets/Group-19.png";

const initialFormData = {
  email: "",
};

const ForgotPassword = () => {
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

  return (
    <div className={forgot.container}>
      <section className={forgot.sectionOne}>
        <div>
          <h3 className={forgot.text}>Reset</h3>
          <h3>Password</h3>
        </div>
      </section>
      <section className={forgot.sectionTwo}>
        <div className={forgot.lotusLogo}>
          <img src={lotus} alt="Lotushop logo" />
        </div>

        <div className={forgot.forgotContainer}>
          <div className={forgot.forgotText}>
            <h3>Forgot Password</h3>
            <p>Enter Your User Email Address or Phone Number</p>
          </div>

          <FormGroup
            errors={errors}
            setErrors={setErrors}
            validation={formData}
          >
            <div className={forgot.inputBlock}>
              <Input
                type="text"
                name="email"
                placeholder="Email Address or Phone"
                value={formData.email}
                onChange={(name, value) => handleChange(name, value)}
                error={errors.email}
                required={true}
                labelDisplayed={false}
                className={forgot.forgotField}
                // style={{
                //   border: 'none',
                //   borderBottom: '0.5px solid #757575',
                //   borderRadius: '0px',
                // }}
              />
            </div>

            <div className={forgot.btnsContainer}>
              <Button
                title="Send Code"
                type="submit"
                onClick={() => navigate(PublicPaths.RESET_PASSWORD)}
                className={forgot.codeBtn}
              />
              <Button
                title="Got an account? Login"
                type="button"
                onClick={() => navigate(PublicPaths.LOGIN)}
                className={forgot.loginBtn}
              />
            </div>
          </FormGroup>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
