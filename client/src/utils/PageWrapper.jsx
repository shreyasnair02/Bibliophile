import { motion } from "framer-motion";

export default function PageWrapper({ children, classes }) {
  return (
    <motion.section
      className={"relative overflow-x-hidden  " + classes}
      initial={{ opacity: 0, x: "30px" }}
      animate={{ opacity: 1, x: "0px" }}
      exit={{ opacity: 0, x: "-30px" }}
    >
      {children}
    </motion.section>
  );
}
