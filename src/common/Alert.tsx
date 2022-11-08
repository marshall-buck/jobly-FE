import useAlert from "../hooks/useAlert";
/**
 * AlertPopup
 * Use in any component with useAlertHook
 * State
 * -Message: a string | string[]
 * type:  AlertTypes
 * setAlert (type, message) : void
 * Position is centered 50 % from bottom of parent, and 1rem for left and right of parent
 */
function AlertPopup() {
  const { message, type, setAlert } = useAlert();

  if (message && type) {
    return (
      <div
        role="alert"
        className={`alert shadow-lg ${type} z-40 bottom-1/2 absolute right-4 left-4 w-auto`}
      >
        <div>
          <button
            aria-label="Close"
            onClick={() => setAlert(null, null)}
            className="btn btn-sm btn-circle"
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
}

export default AlertPopup;
