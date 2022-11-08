// useAlert.js
import { useContext } from "react";
import AlertContext from "../context/UseAlertContext";

const useAlert = () => useContext(AlertContext);

export default useAlert;
