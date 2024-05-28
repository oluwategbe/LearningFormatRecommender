import React, { useState } from "react";
import { useIsMutating } from "@tanstack/react-query";
import { Button, FormGroup } from "../../../components";
import { useNavigate } from "react-router-dom";
import { PrivatePaths, PublicPaths } from "../../../routes/path";
import code from "./reset.module.css";
import lotus from "../../../assets/Group-19.png";

const initialFormData = {
  otp1: "",
  otp2: "",
  otp3: "",
  otp4: "",
};

const ResetPassword = () => {
  const isLoading = useIsMutating();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    // Parse the value to an integer
    const intValue = parseInt(value, 10);

    // Check if the parsed value is a number and if its length is less than or equal to 1
    if (!isNaN(intValue) || value === "") {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const validationHandler = (name, error) => {
    setErrors({ ...errors, [name]: error });
  };

  const submitHandler = () => {
    console.log(formData);
  };

  return (
    <div className={code.container}>
      <section className={code.sectionOne}>
        <div>
          <h3 className={code.text}>Reset</h3>
          <h3>Password</h3>
        </div>
      </section>
      <section className={code.sectionTwo}>
        <div className={code.lotusLogo}>
          <img src={lotus} alt="Lotushop logo" />
        </div>

        <div className={code.codeContainer}>
          <div className={code.codeText}>
            <h3>Forgot Password</h3>
            <p>Please Enter the 4 digit code sent to you</p>
          </div>

          <FormGroup
            onSubmit={submitHandler}
            errors={errors}
            setErrors={setErrors}
            validation={formData}
            className={code.formContainer}
          >
            <div className={code.inputBlock}>
              {[1, 2, 3, 4].map((index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp${index}`}
                  placeholder="0"
                  value={String(formData[`otp${index}`])}
                  onChange={(e) => handleChange(`otp${index}`, e.target.value)}
                  maxLength={1}
                  className={code.codeField}
                />
              ))}
            </div>

            <div className={code.btnsContainer}>
              <Button
                title="Verify"
                type="submit"
                className={code.codeBtn}
                onClick={() => PublicPaths.LOGIN}
              />
              <Button
                title="Got an account? Login"
                type="button"
                onClick={() => navigate(PublicPaths.LOGIN)}
                className={code.loginBtn}
              />
            </div>
          </FormGroup>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
