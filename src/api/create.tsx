import { ref, set } from "firebase/database";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export const create = (data: any, path: string) => {
  const { user } = useAuth();
  function writeJob() {
    return set(ref(database, "links/" + user?.id + "/" + path), data);
  }
  return writeJob();
};
