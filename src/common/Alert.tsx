// AlertPopup.js

import useAlert from "../hooks/useAlert";

const AlertPopup = () => {
  const { message, type, setAlert } = useAlert();

  if (message && type) {
    return (
      <div
        role="alert"
        className={`alert shadow-lg ${type} absolute bottom-2/4`}
      >
        <div>
          <button
            aria-label="Close"
            onClick={() => setAlert(null, null)}
            className="btn btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div data-cy="alert-messages">
            {Array.isArray(message)
              ? message.map((m) => <span key={m}>{m}</span>)
              : message}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
