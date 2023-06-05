import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

function ImageGrid({ setSelectedImg }) {
  const { docs } = useFirestore("images");
  console.log(docs);
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <motion.div
            key={doc.id}
            className="img-wrap"
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{delay:1}}
              src={doc.url}
              alt="image_"
            />
          </motion.div>
        ))}
    </div>
  );
}

export default ImageGrid;
