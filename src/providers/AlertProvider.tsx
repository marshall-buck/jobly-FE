import { SetStateAction, useState } from "react";

import { AlertTypes } from "../interfaces";
import { AlertContext } from "../context/AlertContext";

interface AlertProviderInterface {
  children?: React.ReactNode;
}

const AlertProvider = ({ children }: AlertProviderInterface) => {
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
    // }, 4000);
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

export { AlertProvider };
