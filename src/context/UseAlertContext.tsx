import { createContext, SetStateAction, useState } from "react";
import { AlertTypes } from "../interfaces";

// const ALERT_TIME = 5000;

interface AlertContextInterface {
  message: string | string[] | null;
  type: AlertTypes | null;
  setAlert(message: string | string[] | null, type: AlertTypes | null): void;
}

const AlertContext = createContext<AlertContextInterface>({
  message: null,
  type: null,
  setAlert: () => {},
});

interface AlertProviderInterface {
  children?: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderInterface) => {
  const [message, setMessage] = useState<string | string[] | null>(null);
  const [type, setType] = useState<AlertTypes | null>(null);

  const setAlert = (
    message: SetStateAction<string | string[] | null>,
    type: SetStateAction<AlertTypes | null>
  ) => {
    setMessage(message);
    setType(type);

    // setTimeout(() => {
    //   setMessage(null);
    //   setType(null);
    // }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        message,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
