import { useState } from "react";
import { NotificationType } from "@/components/general-components/Notification/Notification";


export function useNotification() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationValues, setNotificationValues] = useState<NotificationType>({
        title: "Save Error",
        message: "Add Message Here",
        type: 'danger',
        time: 4000
    });

  const notify = (
    title:string,
    message:string,
    type:'danger'|'success'|'warning',
    time:number=4000
    ) => {
    const notificationParams:NotificationType = {title,message,type,time}
    setNotificationValues(notificationParams);
        setShowNotification(true);
  };

  const danger = (
    title:string,
    message:string,
    time:number=4000
    ) => {
    const notificationParams:NotificationType = {title,message,time,type:'danger'}
    setNotificationValues(notificationParams);
    setShowNotification(true);
  };

  const warning = (
    title:string,
    message:string,
    time:number=4000
    ) => {
    const notificationParams:NotificationType = {title,message,time,type:'warning'}
    setNotificationValues(notificationParams);
    setShowNotification(true);
  };

  const success = (
    title:string,
    message:string,
    time:number=4000
    ) => {
    const notificationParams:NotificationType = {title,message,time,type:'success'}
    setNotificationValues(notificationParams);
    setShowNotification(true);
  };



  return [notificationValues,showNotification,setShowNotification,notify,danger,warning,success] as const;
}