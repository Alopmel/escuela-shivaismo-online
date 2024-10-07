import { motion } from 'framer-motion';
import styles from './home.module.css'

const levitateAnimation = {
    animate: {
      transform: ["translate(-50%, -50%)", "translate(-50%, calc(-50% - 3%))", "translate(-50%, -50%)"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
const Sphere = () => {
  return (
    <motion.div 
        initial="hidden"
        animate="show"
        exit="exit"
        variants={levitateAnimation}>
        <figure className={`${styles.ball} bubble`}></figure>
    </motion.div>
  )
}

export default Sphere;