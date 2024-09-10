'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';

const levitateAnimation = {
  animate: {
    transform: ["translateY(0%)", "translateY(-2%)", "translateY(0%)"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Home: React.FC = () => {
  return (
    <div className="home-background flex items-center justify-center">
      <motion.section className="stage flex items-center justify-center">
        <Link href="/auth/login">
          <motion.figure 
            className="ball bubble flex items-center justify-center"
            animate={levitateAnimation.animate}
          >
            <div className="text-white text-center text-2xl px-2 cursor-pointer no-select">
              <div>Accede</div>
              <div>a la Sabiduría</div>
              <div>del Trika</div>
            </div>
          </motion.figure>
        </Link>
      </motion.section>
    </div>
  );
}

export default Home;