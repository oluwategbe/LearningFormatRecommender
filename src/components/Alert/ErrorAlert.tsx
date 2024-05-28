// ErrorAlert.tsx
import React, { useEffect } from "react";
import { useAlert } from "../../context/AlertContext";
import Alert from ".";
import smile from "../../assets/error.gif";
import "../../styles/alert.css";
import "../../styles/button.css";

type ErrorAlertProps = {
  autoClose?: boolean;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ autoClose = true }) => {
  const { alerts, hideAlert } = useAlert();

  useEffect(() => {
    if (autoClose && alerts.length > 0) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000); // Auto-close the alert after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [autoClose, alerts, hideAlert]);

  return alerts.length > 0 && alerts[0].type === "error" ? (
    <Alert
      isVisible={alerts.length > 0}
      title="Alert"
      content={
        <div className="alert">
          <div className="alertImg">
            <img src={smile} alt="smile emoji" />
          </div>
          <div className="text">
            <h1>{alerts?.[0].title}</h1>
            <p>{alerts?.[0]?.text}</p>
            <span>{alerts?.[0]?.subText}</span>
            <div className="btnContainer">
              <button
                className="btn btnPurple"
                type="button"
                onClick={hideAlert}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      }
      onClose={hideAlert}
    />
  ) : null; // Return null for cases where the alert should not be rendered
};

export default ErrorAlert;

// WarningAlert.tsx (similar to ErrorAlert but with type 'warning')
