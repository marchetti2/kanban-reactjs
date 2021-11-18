import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

import { useToast } from "@chakra-ui/react";

import { auth, database, storage } from "../services/firebase";
import { useNotifications } from "../contexts/NotificationsContext";

import {
  toastInvalidCredentials,
  toastUserCreated,
  toastUserAlreadyExists,
  ToastServerError,
  ToastEmailDoesNotExist,
  toastRecoverEmailSended,
  toastUserUpdated,
} from "../components/Toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

type Users = Array<UserData>;

interface UpdateUserProps {
  user: User;
  name?: string;
  avatar?: string;
  password?: string;
}

interface AuthContextProps {
  isLogged: boolean;
  user: UserData;
  users: Users;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  googleAuthProvider: () => Promise<void>;
  logout: () => Promise<void>;
  createUser: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getAllUsers: () => Promise<void>;
  updateUser: ({
    user,
    name,
    avatar,
    password,
  }: UpdateUserProps) => Promise<void>;
  updateUserPassword: (user: User, newPassword: string) => Promise<void>;
  uploadAvatar: (file: any) => Promise<string>;
  uploadAvatarProgress: number;
  setUploadAvatarProgress: Dispatch<SetStateAction<number>>;
  localAvatarUrl: string;
  setLocalAvatarUrl: Dispatch<SetStateAction<string>>;
}
interface AuthProviderProps {
  children: ReactNode;
}

let tempURL = "";

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [currentPage, setCurrentPage] = useState("signIn");
  const [user, setUser] = useState<UserData>({} as UserData);
  const [users, setUsers] = useState<Users>([]);
  const [uploadAvatarProgress, setUploadAvatarProgress] = useState(0);
  const [localAvatarUrl, setLocalAvatarUrl] = useState("");

  const { createNotification } = useNotifications();

  const toast = useToast();
  const router = useRouter();

/*   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;

        setUser({
          id: uid,
          name: displayName || "",
          email: email || "",
          avatar: photoURL || "",
        });

        setIsLogged(true);
      } else {
        return setIsLogged(false);
      }
    });
  }, []); */

  async function updateUser({ user, name, avatar, password }: UpdateUserProps) {
    try {
      await updateProfile(user, {
        displayName: name ? name : user.displayName,
        photoURL: avatar ? avatar : user.photoURL,
      });

      if (password) {
        updateUserPassword(user, password);
      }

      const userRef = doc(database, "users", user.email!);

      if (name) {
        await updateDoc(userRef, {
          name,
        });
      }

      if (avatar) {
        await updateDoc(userRef, {
          avatar,
        });
      }
      /* 
      const projectsLeader = query(
        collection(database, "projects"),
        where("leader.id", "==", user.uid)
      );

      const querySnapshot = await getDocs(projectsLeader);

      querySnapshot.docs.map(async (project) => {
        const projectRef = doc(database, "projects", project.data().id);

        if (name) {
          await updateDoc(projectRef, {
            "leader.name": name,
          });
        }

        if (avatar) {
          await updateDoc(projectRef, {
            "leader.avatar": avatar,
          });
        }
      }); */

      const projects = query(collection(database, "projects"));

      const queryProjectsSnapshot = await getDocs(projects);

      queryProjectsSnapshot.docs.map(async (project) => {
        if (project.data().assignees.length > 0) {
          const assignees = project.data().assignees.map((assignee: any) => {
            if (assignee.id === user.uid) {
              if (name) {
                assignee.name = name;
              }
              if (avatar) {
                assignee.avatar = avatar;
              }
            }
            return assignee;
          });

          const projectRef = doc(database, "projects", project.data().id);

          await updateDoc(projectRef, {
            assignees,
          });
        }

        if (project.data().leader.id === user.uid) {
          const projectRef = doc(database, "projects", project.data().id);

          if (name) {
            await updateDoc(projectRef, {
              "leader.name": name,
            });
          }

          if (avatar) {
            await updateDoc(projectRef, {
              "leader.avatar": avatar,
            });
          }
        }
      });

      const issues = query(collection(database, "issues"));

      const queryIssuesSnapshot = await getDocs(issues);

      queryIssuesSnapshot.docs.map(async (issue) => {
        if (issue.data().assignees.length > 0) {
          const assignees = issue.data().assignees.map((assignee: any) => {
            if (assignee.id === user.uid) {
              if (name) {
                assignee.name = name;
              }
              if (avatar) {
                assignee.avatar = avatar;
              }
            }
            return assignee;
          });

          const issueRef = doc(database, "issues", issue.data().id);
          await updateDoc(issueRef, {
            assignees,
          });
        }
      });
      toast(toastUserUpdated());
    } catch (e) {
      console.error("Error updating document: ", e);
    }

    return;
  }

  async function updateUserPassword(user: User, newPassword: string) {
    await updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }

  async function uploadAvatar(file: any): Promise<string> {
    const storageRef = ref(storage);
    //const testRef = ref(storage, `${auth.currentUser?.uid!}/`);
    const imagesRef = ref(storageRef, auth.currentUser?.uid!);
    const hash = Math.floor(Date.now() * Math.random()).toString(36);

    const tempFileName = `temp-avatar-${hash}`;
    const fileName = `avatar-${hash}`;
    const tempRef = ref(imagesRef, tempFileName);
    const spaceRef = ref(imagesRef, fileName);

    var metadata = {
      contentType: file.type,
    };

    const tempUpload = uploadBytesResumable(tempRef, file, metadata);
    tempUpload.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred * 100) / snapshot.totalBytes
      );
      setUploadAvatarProgress(progress);
    });

    const upload = await uploadBytesResumable(spaceRef, file, metadata);
    return await getDownloadURL(upload.ref);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast(toastRecoverEmailSended());
        return setCurrentPage("signIn");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast(ToastEmailDoesNotExist(setCurrentPage));
      });
  }

  async function createUser(email: string, password: string, name: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateUser({ user, name });
        toast(toastUserCreated());
        await createNotification({
          content: `Olá ${userCredential.user.displayName}, bem vindo ao Kanban!`,
          userId: userCredential.user.uid,
          type: "welcome",
        });
        await signOut(auth)
        try {
          await setDoc(
            doc(database, "users", email),
            {
              id: user.uid,
              name: user.displayName,
              email: email,
              avatar: user.photoURL,
            },
            { merge: true }
          );
          
        } catch (e) {
          console.error("Error adding document: ", e);
        }
       return setCurrentPage("signIn");
        
      })
      .catch(() => {
        toast(toastUserAlreadyExists(setCurrentPage));
      });
  }

  async function getAllUsers() {
    const querySnapshot = await getDocs(collection(database, "users"));

    const users = querySnapshot.docs.map((doc) => doc.data()) as Users;

    setUsers(users);
  }

  async function getUser(id: string) {
    const querySnapshot = await getDocs(collection(database, "users"));

    const users = querySnapshot.docs.map((doc) => doc.data()) as Users;

    setUsers(users);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { uid, displayName, photoURL, email } = userCredential.user;

        setUser({
          id: uid,
          name: displayName || "",
          email: email || "",
          avatar: photoURL || "",
        });
      })
      .catch((err) => {
        toast(toastInvalidCredentials(setCurrentPage));
        throw new Error(err);
      });
    //await router.push("/projects");
    setIsLogged(true);
  }

  async function googleAuthProvider() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const { uid, displayName, photoURL, email } = userCredential.user;

        setUser({
          id: uid,
          name: displayName || "",
          email: email || "",
          avatar: photoURL || "",
        });

        setIsLogged(true);
      })
      .catch(() => {
        ToastServerError();
      });
  }

  async function logout() {
    await signOut(auth)
      .then(async () => {
        setUser({} as UserData);
        await router.push("../");
        setIsLogged(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        updateUser,
        user,
        googleAuthProvider,
        logout,
        createUser,
        login,
        currentPage,
        setCurrentPage,
        resetPassword,
        getAllUsers,
        users,
        updateUserPassword,
        uploadAvatar,
        uploadAvatarProgress,
        localAvatarUrl,
        setLocalAvatarUrl,

        setUploadAvatarProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  return context;
}

export { AuthContext, AuthProvider, useAuth };
