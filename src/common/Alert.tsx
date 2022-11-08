import { AlertType } from "../interfaces";

interface AlertPropertiesInterface {
  message: string[];
  type: AlertType;
  onDismiss: () => void;
  isVisible: boolean;
}

/** Alert
 * Props
 * -message
 * -type
 * -onDismiss Function, runs from the parent comp to set isVisible property to false
 *
 * State
 * -isVisible
 */

function Alert({
  message,
  type = AlertType.ERROR,
  onDismiss,
  isVisible,
}: AlertPropertiesInterface) {
  return (
    <div
      role="alert"
      className={
        isVisible ? `alert  shadow-lg ${type}` : `alert hidden shadow-lg`
      }
    >
      <div>
        <button
          aria-label="Close"
          onClick={onDismiss}
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
          {message.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        {/* <span>{message}</span> */}
      </div>
    </div>
  );
}

export default Alert;
