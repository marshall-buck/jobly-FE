import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";
/**
 * Custom useAlert hook to access state and actions in AlertContext.
 *  */
function useAlert() {
  return useContext(AlertContext);
}
export default useAlert;
