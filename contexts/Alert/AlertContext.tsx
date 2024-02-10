import React, { useContext, createContext, useState, ReactNode, useRef } from "react";
import Alert, { AlertTypes } from "./Alert";

/**
 * Interface for the Alert Context.
 */
interface IAlertContext {
  message: string | null;
  type: AlertTypes;
  /**
   * Display an alert of type 'danger(message,milliseconds)'.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  danger: (message: string, time?: number) => void;
  /**
   * Display an alert of type 'warning' e.g warning(message,time) note: time is in ms.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  warning: (message: string, time?: number) => void;
  /**
   * Display an alert of type 'success'.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  success: (message: string, time?: number) => void;
}

const AlertContext = createContext<IAlertContext | null>(null);

/**
 * Provider component for managing alerts.
 * @param children - ReactNode representing the children components.
 */
export function AlertProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<AlertTypes>("danger");
  const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);

  /**
   * Close the current alert.
   */
  const onCloseHandler = () => setMessage(null);

  /**
   * Show an alert message.
   * @param message - The message to be displayed in the alert.
   * @param type - The type of the alert.
   * @param time - The time in milliseconds after which the alert should automatically disappear.
   */
  const showMessage = (message: string, type: AlertTypes, time: number) => {
    setMessage(message);
    setType(type);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, time);
  };

  /**
   * Display an alert of type 'danger'.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  const danger = (message: string, time = 4000) => {
    showMessage(message, "danger", time);
  };

  /**
   * Display an alert of type 'success'.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  const success = (message: string, time = 4000) => {
    showMessage(message, "success", time);
  };

  /**
   * Display an alert of type 'warning(message,time in miliseconds)'.
   * @param message - The message to be displayed in the alert.
   * @param time - Optional. The time in milliseconds after which the alert should automatically disappear. Defaults to 4000 milliseconds.
   */
  const warning = (message: string, time = 4000) => {
    showMessage(message, "warning", time);
  };

  return (
    <AlertContext.Provider value={{ message, type, danger, success, warning }}>
      {children}
      {message && <Alert message={message} type={type} onClose={onCloseHandler} />}
    </AlertContext.Provider>
  );
}

/**
 * Hook for consuming the Alert Context.
 * @returns An object containing the current alert message, type, and functions for showing different types of alerts.
 * const {danger,warning,success} = useAlert();
 */
export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
