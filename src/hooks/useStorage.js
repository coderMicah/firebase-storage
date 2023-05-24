import { useEffect, useState } from "react";

import { storage, db } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    //refernces
    const storageRef = ref(storage, file.name);
    const collectionRef = collection(db, "images");

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          addDoc(collectionRef, {
            url: downloadURL,
            createdAt: serverTimestamp(),
          });
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
