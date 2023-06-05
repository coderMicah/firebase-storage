import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const images = [];
      querySnapshot.forEach((doc) => {
        images.push({ ...doc.data(), id: doc.id });
      });
      setDocs(images);
      console.log("After snapshot", images);

    });

    return () => unsub();
  }, [collectionName]);

  return { docs };
};

export default useFirestore;
