import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  deleteDoc,
  setDoc,
  doc,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { database } from "../services/firebase";

interface CreateNotificationProps {
  userId: string;
  content: string;
  type: string;
}

interface Notification {
  id: string;
  userId: string;
  content: string;
  type: string;
}

type Notifications = Array<Notification>;

interface NotificationsContextProps {
  notifications: Notifications;
  setNotifications: Dispatch<SetStateAction<Notifications>>;
  createNotification: ({}: CreateNotificationProps) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  getNotifications: (userId: string) => Promise<void>;
  updatedNotificationsListener: (userId: string) => Promise<void>;
}

interface NotificationsProviderProps {
  children: ReactNode;
}

const NotificationsContext = createContext({} as NotificationsContextProps);

function NotificationsProvider({
  children,
}: NotificationsProviderProps): JSX.Element {
  const [notifications, setNotifications] = useState<Notifications>(
    [] as Notifications
  );

  async function createNotification({
    userId,
    content,
    type,
  }: CreateNotificationProps) {
    const id = uuid();
    try {
      await setDoc(
        doc(database, "notifications", id),
        {
          id,
          userId,
          content,
          type,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getNotifications(userId: string) {
    const querySnapshot = await getDocs(collection(database, "notifications"));

    const notifications = querySnapshot.docs.map((doc) => doc.data());

    const notificationsById = notifications.filter(
      (notification) => notification.userId === userId
    ) as Notifications;

    setNotifications(notificationsById);
  }

  async function updatedNotificationsListener(userId: string) {
    onSnapshot(collection(database, "notifications"), (querySnapshot) => {
      const notifications = querySnapshot.docs.map((doc) => doc.data());

      const notificationsById = notifications.filter(
        (notification) => notification.userId === userId
      ) as Notifications;

      setNotifications(notificationsById);
    });
  }

  async function deleteNotification(id: string) {
    await deleteDoc(doc(database, "notifications", id));
  }

  return (
    <NotificationsContext.Provider
      value={{
        createNotification,
        deleteNotification,
        getNotifications,
        notifications,
        setNotifications,
        updatedNotificationsListener,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

function useNotifications(): NotificationsContextProps {
  const context = useContext(NotificationsContext);
  return context;
}

export { NotificationsContext, NotificationsProvider, useNotifications };
