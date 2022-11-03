import React from "react";

interface AlertPropsInterface {
  type: string;
  messages?: string[];
  resetErrors: React.Dispatch<React.SetStateAction<never[]>> | (() => never[]);
}

/** Presentational component for showing alerts.
 *
 * Props
 * -type: type of alert error, info ...
 * -messages: array of messages
 * -resetErrors function passed from parent to clear parent error state on click
 *
 *
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type, messages = [], resetErrors }: AlertPropsInterface) {
  // TODO: refactor to pass bool instead of function
  function closeAlert() {
    resetErrors([]);
  }

  return (
    <div className={`alert alert-error shadow-lg`}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {messages.map((err) => (
          <span key={err}>{err}</span>
        ))}
      </div>
      <div className="flex-none">
        <button onClick={closeAlert} className="btn btn-sm btn-ghost">
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default Alert;
