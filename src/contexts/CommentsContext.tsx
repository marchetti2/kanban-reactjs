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
  updateDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { database } from "../services/firebase";
import { User } from "firebase/auth";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface CreateCommentProps {
  user: UserData;
  issueId: string;
  comment: string;
}

interface UpdateCommentProps {
  id: string;
  comment: string;
}

interface Comment {
  id: string;
  user: UserData;
  issueId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

type Comments = Array<Comment>;

interface CommentsContextProps {
  comments: Comments;
  setComments: Dispatch<SetStateAction<Comments>>;
  createComment: ({}: CreateCommentProps) => Promise<void>;
  updateComment: ({}: UpdateCommentProps) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  getComments: (issueId: string) => Promise<void>;
  updatedCommentsListener: (issueId: string) => Promise<void>;
}

interface CommentsProviderProps {
  children: ReactNode;
}

const CommentsContext = createContext({} as CommentsContextProps);

function CommentsProvider({ children }: CommentsProviderProps): JSX.Element {
  const [comments, setComments] = useState<Comments>([] as Comments);

  async function createComment({ issueId, user, comment }: CreateCommentProps) {
    const id = uuid();
    const createdAt = Date.now();

    try {
      await setDoc(
        doc(database, "comments", id),
        {
          id,
          issueId,
          user,
          comment,
          createdAt,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateComment({ id, comment }: UpdateCommentProps) {
    const updatedAt = Date.now();

    try {
      const commentRef = doc(database, "comments", id);

      await updateDoc(commentRef, {
        comment,
        updatedAt,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async function getComments(issueId: string) {
    const q = query(
      collection(database, "comments"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => doc.data()) as Comments;

    const commentsById = comments.filter(
      (comment) => comment.issueId === issueId
    );

    const commentsDateFormatted = commentsById.map((comment) => {
      const createdAtDate = comment.createdAt;

      const createdAtDateFormatted = String(
        `${new Date(createdAtDate).getDate()}/${
          new Date(createdAtDate).getMonth() + 1
        }/${new Date(createdAtDate).getFullYear()}`
      );

      if (comment.updatedAt) {
        const updatedAtDate = comment.updatedAt;

        const updatedAtDateFormatted = String(
          `${new Date(updatedAtDate).getDate()}/${
            new Date(updatedAtDate).getMonth() + 1
          }/${new Date(updatedAtDate).getFullYear()}`
        );

        return {
          ...comment,
          createdAt: createdAtDateFormatted,
          updatedAt: updatedAtDateFormatted,
        };
      }

      return { ...comment, createdAt: createdAtDateFormatted };
    }) as Comments;

    setComments(commentsDateFormatted);
  }

  async function updatedCommentsListener(issueId: string) {
    const q = query(
      collection(database, "comments"),
      orderBy("createdAt", "desc")
    );

    //const querySnapshot = await getDocs(q);

    onSnapshot(q, (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => doc.data()) as Comments;

      const commentsById = comments.filter(
        (comment) => comment.issueId === issueId
      );

      const commentsDateFormatted = commentsById.map((comment) => {
        const createdAtDate = comment.createdAt;

        const createdAtDateFormatted = String(
          `${new Date(createdAtDate).getDate()}/${
            new Date(createdAtDate).getMonth() + 1
          }/${new Date(createdAtDate).getFullYear()}`
        );

        if (comment.updatedAt) {
          const updatedAtDate = comment.updatedAt;

          const updatedAtDateFormatted = String(
            `${new Date(updatedAtDate).getDate()}/${
              new Date(updatedAtDate).getMonth() + 1
            }/${new Date(updatedAtDate).getFullYear()}`
          );

          return {
            ...comment,
            createdAt: createdAtDateFormatted,
            updatedAt: updatedAtDateFormatted,
          };
        }

        return { ...comment, createdAt: createdAtDateFormatted };
      }) as Comments;

      setComments(commentsDateFormatted);
    });
  }

  async function deleteComment(id: string) {
    await deleteDoc(doc(database, "comments", id));
  }

  return (
    <CommentsContext.Provider
      value={{
        createComment,
        deleteComment,
        getComments,
        comments,
        setComments,
        updateComment,
        updatedCommentsListener,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

function useComments(): CommentsContextProps {
  const context = useContext(CommentsContext);
  return context;
}

export { CommentsContext, CommentsProvider, useComments };
