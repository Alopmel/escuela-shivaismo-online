'use client'
import { useState } from 'react';
import styles from './circleMenu.module.css';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'

import { motion, AnimatePresence } from 'framer-motion';


    const pageTransition = {
      hidden: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: {
          duration: 0.5
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.5
        }
      }
    };

    interface Position {
      x: number;
      y: number;
    }
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
    
    const shadowAnimation = {
      animate: {
        y: ["0%", "3%", "0%"],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    };

const calculateChildPosition = (index: number, total: number, radius: number): Position => {
  const angleIncrement: number = (2 * Math.PI) / total;
  const angle: number = index * angleIncrement;

  const x: number = radius * Math.cos(angle);
  const y: number = radius * Math.sin(angle);

  return { x, y };
};

const CircleMenu: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [extraItemsVisible, setExtraItemsVisible] = useState(false);
  const [extraSubItemsVisible, setExtraSubItemsVisible] = useState(false);
  const [extraDoubleSubItemsVisible, setExtraDoubleSubItemsVisible] = useState(false);
  const [clickedContent, setClickedContent] = useState('');
  const [firstClickedContent, setFirstClickedContent] = useState('');
  const [secondClickedContent, setSecondClickedContent] = useState('');
  const [thirdClickedContent, setThirdClickedContent] = useState('');
  const [fourthClickedContent, setFourthClickedContent] = useState('');
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [size, setSize] = useState('400px');
  const [fontSize, setFontSize] = useState('36px');

//   const router = useRouter();
  const router = useRouter()
  const handleClick = () => {
    setIsVisible(!isVisible);
    setExtraItemsVisible(false);
    setClickedContent('');
    setIsAnimating(!isAnimating);
    setFontSize(isAnimating ? '17px' : '36px');
    setSize(isAnimating ? '200px' : '400px');
    let newSecondClickedContent = 'Escuela de Shivaismo';
    setFirstClickedContent(newSecondClickedContent)
    console.log('firstClickedContent ' + firstClickedContent)
  };

  const handleItemClick = (item: string) => {
    setClickedContent(item);
    setExtraItemsVisible(!extraItemsVisible);
    setSecondClickedContent(item)
    console.log('secondClickedContent ' + secondClickedContent )
  };

  const handleSubItemClick = (item: string) => {
    setClickedContent(item);
    setExtraItemsVisible(true)
    setExtraSubItemsVisible(!extraSubItemsVisible);
    setThirdClickedContent(item)
    console.log('thirdClickedContent ' + thirdClickedContent)
  };

  const handledDoubleSubItemClick = (item: string) => {
    setClickedContent(item);
    setExtraItemsVisible(true);
    setExtraSubItemsVisible(true);
    setExtraDoubleSubItemsVisible(!extraDoubleSubItemsVisible);
    setFourthClickedContent(item)
    console.log(extraSubItemsVisible)
    console.log('fourthClickedContent' + fourthClickedContent)
    console.log('setClickedContent' + clickedContent)

  };
  const handleGoTo = (item: string) => {
    const finishItem = item;
    const params = new URLSearchParams({
      item: finishItem,
      firstClickedContent,
      secondClickedContent,
      thirdClickedContent,
      fourthClickedContent
    });

    router.push(`/portal/categorias?${params.toString()}`);
  };


  const navItems = ['Enseñanza de la vía', 'Aplicación en tu vida', 'Prácticas en diferido', 'Chamanismo', 'Último material subido', 'Empieza por aquí'];
  const empiezaNavItems = ['Fechas conferencias y recursos', 'Conceptos importantes y practicas basicas'];
  const ensenanzaNavItems = ['Comentarios de sutras', 'Conceptos de apoyo'];
  const aplicacionNavItems = ['Preguntas y respuestas', 'Conferencias Temáticas'];
  const prácticaNavItems = ['Tandava y práctica con Mar y Juanjo', 'Yutkis', 'Otras prácticas', 'Visualizaciones'];
  const comentarioNavItems = ['Shiva Sutras: La Cosmovisión', 'Vijñana Bhairava: La Práctica', 'Los 36 Tattvas'];
  const shivasutrasNavItems = ['1 Despertar', '2 Despertar', '3 Despertar'];
  const tattvasNavItems = ['Spandakarika', 'Pratiabhidjaridayam'];
  const conceptoNavItems = ['Sat Sang', 'Textos en PDF', ' Libros Recomendados', 'Pruebas'];
  const visualizacionNavItems = ['Kali', 'Masyendra'];

  return (
  <motion.div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
   }}
    initial="hidden"
    animate="show"
    exit="exit"
    variants={pageTransition}
  >
    <div className={styles.navbar}>
        <div style={{ display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          position: 'relative' }}>
            <motion.div
              className={styles['nav-item']}
              style={{
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #cc8cc3, #ca1eb3)', // Ajusta el tamaño y los colores aquí
              width: size,
              height: size,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 30px rgba(0,0,0,0.4)'
              }}
              variants={levitateAnimation}
              animate={isAnimating ? "animate" : ""}
              onClick={handleClick}
              transition={{ duration: 2, ease: "easeInOut" }} // Add this line
          >
            <motion.p 
              className={styles.linkCentral}
              style={{ fontSize: fontSize, marginTop: isAnimating ? '93px' : '60px'}}
            >
              Escuela <br />
              De Shivaismo <br />
              De Cachemira
            </motion.p>
            <motion.p 
              className={styles.pTittle}
              initial={{ opacity: 1 }}
              animate={{ opacity: isAnimating ? 1 : 0 }}
            >Click aquí</motion.p>
          </motion.div>
          <motion.div
            style={{ width: '300px', height: '50px', borderRadius: '50%', background: 'rgba(0, 0, 0, 0.2)', position: 'absolute', top: '245px', filter: 'blur(10px)' , display: isAnimating ? 'flex' : 'none'}} // Added blur filter for diffused effect
            variants={shadowAnimation}
            animate={isAnimating ? "animate" : ""}
          />
      </div>
  
      <AnimatePresence>
      {isVisible && navItems.map((item, index) => {
        const radius = 190;
        const { x, y }: Position = calculateChildPosition(index, navItems.length, radius);
        const transformStyle: string = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

        return (
          <motion.div 
            // className={sltyles.navbar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              enter: { duration: 1 },
              exit: { duration: 0.5 }
            }} 
            key={index} 
            className={`${styles['nav-item']} ${styles['transformed-item']}`}
            style={{ transform: transformStyle , width: '150px', height: '150px'}} 
            onClick={() =>( item === 'Chamanismo' ||  item === 'Último material subido' ) ? handleGoTo(item) : handledDoubleSubItemClick(item)}
            >

              <a href="#" className={styles['nav-link']}>
               {item}
              </a>
          </motion.div>
        );
        })}
      </AnimatePresence>

      <AnimatePresence>
      {extraItemsVisible && clickedContent === 'Empieza por aquí' && empiezaNavItems.map((item, index) => {
          const position = index === 0 ? { x: 97, y: -301 } : { x: 232, y: -189 };
          const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;

          return (
            <motion.div 
            // className={styles.navbar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              enter: { duration: 1 },
              exit: { duration: 0.5 }
            }} 
            key={index} className={styles['nav-item']} 
            style={{ transform: transformStyle, width: '100px', height: '100px' }} 
            onClick={() => handleGoTo(item)}>
              <a href="#" className={styles['nav-link']}>
                {item}
              </a>
            </motion.div>
          );
        })}        
      </AnimatePresence>
      <AnimatePresence>
        {extraItemsVisible && (clickedContent === 'Enseñanza de la vía' || clickedContent === 'Comentarios de sutras' || clickedContent === 'Shiva Sutras: La Cosmovisión' || clickedContent === 'Vijñana Bhairava: La Práctica' || clickedContent === 'Los 36 Tattvas' || clickedContent === 'Conceptos de apoyo'   ) && ensenanzaNavItems.map((item, index) => {
            const position = index === 0 ? { x: 299, y: -81.545} : { x: 282, y: 100 };
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;

            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} 
                key={index} 
                className={styles['nav-item']} 
                style={{ background: '#9b51e094', transform: transformStyle, width: '100px', height: '100px' }} 
                onClick={() => handleSubItemClick(item)}>
                <a href="#" className={styles['nav-link']}>
                {item}
                </a>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {extraSubItemsVisible && (clickedContent === 'Comentarios de sutras' || fourthClickedContent === 'Shiva Sutras: La Cosmovisión' || clickedContent === 'Los 36 Tattvas' || clickedContent === 'Vijñana Bhairava: La Práctica')&& comentarioNavItems.map((item, index) => {
            let position;
            switch(index) {
              case 0:
                position = { x: 283, y:  -189.545 };
                break;
              case 1:
                position = { x: 402, y: -125 };
                break;
              case 2:
                position = { x: 377, y: -3 };
                break;
              default:
                position = { x: 282, y: 100 }; // default case if index is not 0, 1, 2, or 3
            }
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
    
            return (
              <motion.div 
                data-value={item} 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} 
                key={index} 
                className={styles['nav-item']} 
                style={{ background: '#a161dd77' ,transform: transformStyle, width: '100px', height: '100px' }} 
                onClick={() => item === 'Vijñana Bhairava: La Práctica' ? handleGoTo(item) : handledDoubleSubItemClick(item)}
                >       
                <a href="#" className={styles['nav-link']}>
                  {item}
                  </a>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {extraDoubleSubItemsVisible && clickedContent === 'Shiva Sutras: La Cosmovisión' && shivasutrasNavItems.map((item, index) => {
            let position;
            switch(index) {
              case 0:
                position = { x: 199, y:  -254.554 };
                break;
              case 1:
                position = { x: 298, y: -296 };
                break;
              case 2:
                position = { x: 384, y: -234 };
                break;
              default:
                position = { x: 282, y: 100 }; // default case if index is not 0, 1, 2, or 3
            }
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
    
            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} 
                key={index} 
                className={styles['nav-item']} 
                style={{ transform: transformStyle, width: '80px', height: '80px' }} 
                onClick={() => handleGoTo(item)}>
                  <a href="#" className={styles['nav-link']}>
                   {item}
                  </a>
              </motion.div>
            );
          })}
      </AnimatePresence>
      <AnimatePresence>
        {extraDoubleSubItemsVisible && clickedContent === 'Los 36 Tattvas' && tattvasNavItems.map((item, index) => {
          const position = index === 0 ? { x: 476, y: -21.545} : { x: 410, y: 91 };
          const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
  
          return (
            <motion.div 
              // className={styles.navbar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                enter: { duration: 1 },
                exit: { duration: 0.5 }
              }} 
              key={index} 
              className={styles['nav-item']} 
              style={{ transform: transformStyle, width: '80px', height: '80px' }} 
              onClick={() => handleGoTo(item)}>
                <a href="#" className={styles['nav-link']}>
                {item}
                </a>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <AnimatePresence>
        {extraSubItemsVisible && (clickedContent === 'Conceptos de apoyo')&& conceptoNavItems.map((item, index) => {
            let position;
            switch(index) {
              case 0:
                position = { x: 351, y:  15.455 };
                break;
              case 1:
                position = { x: 406, y: 112 };
                break;
              case 2:
                position = { x: 341, y: 203 };
                break;
              case 3:
                position = { x: 230, y: 196 };
                break;
              default:
                position = { x: 282, y: 100 }; // default case if index is not 0, 1, 2, or 3
            }
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
    
            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} 
                key={index} className={styles['nav-item']} 
                style={{ transform: transformStyle, width: '100px', height: '100px' }} 
                onClick={() => handleGoTo(item)}>
                  <a href="#" className={styles['nav-link']}>
                  {item}
                  </a>
              </motion.div>
            );
          })}
      </AnimatePresence>
      
      <AnimatePresence>
        {extraItemsVisible && clickedContent === 'Aplicación en tu vida' && aplicacionNavItems.map((item, index) => {
            const position = index === 0 ? { x: 231, y:  183.455 } : { x: 118, y: 301 };
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;

            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} 
                key={index} 
                className={styles['nav-item']} 
                style={{ 
                  background: '#9b51e094',
                  transform: transformStyle, 
                  width: '100px', 
                  height: '100px' }} 
                  onClick={() => handleGoTo(item)}>
                  <a href="#" className={styles['nav-link']}>
                    {item}
                  </a>
              </motion.div>
            );
          })}
      </AnimatePresence>

      <AnimatePresence>
        {extraItemsVisible && (clickedContent === 'Prácticas en diferido' || clickedContent === 'Visualizaciones' || clickedContent === 'Otras prácticas' || clickedContent === 'Yutkis' || clickedContent === 'Tandava y práctica con Mar y Juanjo')&& prácticaNavItems.map((item, index) => {
            let position;
            switch(index) {
              case 0:
                position = { x: 0, y: 265.455 };
                break;
              case 1:
                position = { x: -111, y: 300 };
                break;
              case 2:
                position = { x: -209, y: 239.455 };
                break;
              case 3:
                position = { x: -230, y: 129.455 };
                break;
              default:
                position = { x: 233, y: 184.455 }; // default case if index is not 0, 1, 2, or 3
            }
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;

            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} key={index} 
                className={styles['nav-item']} 
                style={{  
                  background: '#9b51e094',
                  transform: transformStyle, 
                  width: '100px', 
                  height: '100px' }} 
                  onClick={() => item === 'Visualizaciones' ? handledDoubleSubItemClick(item) : handleGoTo(item)}
                  >
                  <a href="#" className={styles['nav-link']}>
                    {item}
                  </a>
              </motion.div>
            );
          })}
      </AnimatePresence>
      <AnimatePresence>
        {extraSubItemsVisible && clickedContent === 'Visualizaciones' && visualizacionNavItems.map((item, index) => {
            const position = index === 0 ? { x: -332, y: 88.455 } : { x: -314, y: 199 };
            const transformStyle: string = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;

            return (
              <motion.div 
                // className={styles.navbar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  enter: { duration: 1 },
                  exit: { duration: 0.5 }
                }} key={index} 
                className={styles['nav-item']} style={{ background: '#a161dd77' , transform: transformStyle, width: '100px', height: '100px' }} 
                onClick={() => handleGoTo(item)}>
                <a href="#" className={styles['nav-link']}>
                {item}
                </a>
              </motion.div>
            );
          })}        
      </AnimatePresence>

    </div>      
  </motion.div>
  );
};

export default CircleMenu;