import React, { useState , useEffect , useRef} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrincipalSphere from './principalSphere';
import SecondSphere from './secondSphere';
import ThirdSphere from './thirdSphere';
import FourthSphere from './fourthSphere';
import FifthSphere from './fifthSphere';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  text: string;
  position: {
    top: string;
    left: string;
  };
  subItems?: MenuItem[];
}

const CircleMenuDesktop: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSecondItem, setSelectedSecondItem] = useState<MenuItem | null>(null);
  const [selectedThirdItem, setSelectedThirdItem] = useState<MenuItem | null>(null);
  const [selectedFourthItem, setSelectedFourthItem] = useState<MenuItem | null>(null);

  const audioRef = useRef()
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const itemFromParams = params.get('item') || '';

  // Convertimos el breadcrumb en un array
  const breadcrumbString = params.get('breadcrumb') || '';
  const breadcrumb = breadcrumbString.split(',').filter((item) => item);  // Convertir a array y eliminar valores vacíos
  console.log('breadcrumb', breadcrumb);

    const items: MenuItem[] = [
    { text: 'Empieza por aquí', position: { top: 'calc(50% - 256px)', left: 'calc(50% + 32px)' }, 
      subItems: [
        { text: 'Fechas conferencias y recursos', position: { top: 'calc(50% - 350px)', left: 'calc(50% + 148px)' } },
        { text: 'Conceptos importantes y prácticas básicas', position: { top: 'calc(50% - 218px)', left: 'calc(50% + 194px)' } }
      ]
    },
    {
      text: 'Enseñanza de la vía', position: { top: 'calc(50% - 82px)', left: 'calc(50% + 134px)' },
      subItems: [
        {
          text: 'Comentarios de sutras',
          position: { top: 'calc(50% - 152px)', left: 'calc(50% + 274px)' },
          subItems: [
            {
              text: 'Shiva Sutras: La Cosmovisión',
              position: { top: 'calc(50% - 216px)', left: 'calc(50% + 390px)' },
              subItems: [
                { text: '1 Despertar', position: { top: 'calc(50% - 326px)', left: 'calc(50% + 394px)' } },
                { text: '2 Despertar', position: { top: 'calc(50% - 270px)', left: 'calc(50% + 500px)' } },
                { text: '3 Despertar', position: { top: 'calc(50% - 152px)', left: 'calc(50% + 500px)' } }
              ]
            },
            { text: 'Vijñana Bhairava Tantra: La Práctica', position: { top: 'calc(50% - 274px)', left: 'calc(50% + 264px)' } },
            { 
              text: 'Los 36 Tattvas', 
              position: { top: 'calc(50% - 79px)', left: 'calc(50% + 390px)' },
              subItems: [
                { text: 'Spandakarika', position: { top: 'calc(50% - 94px)', left: 'calc(50% + 512px)' } },
                { text: 'Pratiabhidjaridayam', position: { top: 'calc(50% + 28px)', left: 'calc(50% + 456px)' } }
              ]
            }
          ]
        },
        {
          text: 'Conceptos de apoyo',
          position: { top: 'calc(50% + 12px)', left: 'calc(50% + 274px)' },
          subItems: [
            { text: 'Sat Sang', position: { top: 'calc(50% - 68px)', left: 'calc(50% + 378px)' } },
            { text: 'Textos en PDF', position: { top: 'calc(50% + 52px)', left: 'calc(50% + 410px)' } },
            { text: 'Libros Recomendados', position: { top: 'calc(50% + 142px)', left: 'calc(50% + 324px)' } },
            { text: 'Pruebas', position: { top: 'calc(50% + 120px)', left: 'calc(50% + 203px)' } }
          ]
        }
      ]
    },
    {
      text: 'Aplicación en tu vida', position: { top: 'calc(50% + 100px)', left: 'calc(50% + 32px)' },
      subItems: [
        {
          text: 'Preguntas y respuestas',
          position: { top: 'calc(50% + 88px)', left: 'calc(50% + 192px)' }
        },
        {
          text: 'War Room',
          position: { top: 'calc(50% + 235px)', left: 'calc(50% + 129px)' }
        },
        {
          text: 'Conferencias temáticas',
          position: { top: 'calc(50% + 235px)', left: 'calc(50% - 36px)' }
        }
      ]
    },
    {
      text: 'Prácticas en diferido', position: { top: 'calc(50% - 82px)', left: 'calc(50% - 282px)' } ,
      subItems: [
        {
          text: 'Tandava y práctica con Mar y Juanjo',
          position: { top: 'calc(50% + 4px)', left: 'calc(50% - 421px)' }
        },
        {
          text: 'Yutkis',
          position: { top: 'calc(50% - 130px)', left: 'calc(50% - 421px)' }
        },
        {
          text: 'Otras prácticas',
          position: { top: 'calc(50% + 72px)', left: 'calc(50% - 303px)' }
        },
        {
          text: 'Visualizaciones',
          position: { top: 'calc(50% - 206px)', left: 'calc(50% - 303px)' },
          subItems: [
            { text: 'Kali', position: { top: 'calc(50% - 328px)', left: 'calc(50% - 293px)' } },
            { text: 'Masyendranath', position: { top: 'calc(50% - 266px)', left: 'calc(50% - 408px)' } }
          ]
        }
      ]
    },
    { text: 'Chamanismo', position: { top: 'calc(50% + 100px)', left: 'calc(50% - 180px)' }},
    { text: 'Últimos videos subidos', position: { top: 'calc(50% - 256px)', left: 'calc(50% - 180px)' } },
  ];

 // Función para encontrar un item por texto
 const findItem = (items: MenuItem[], text: string): MenuItem | null => {
  for (const item of items) {
    if (item.text === text) return item;
    if (item.subItems) {
      const result = findItem(item.subItems, text);
      if (result) return result;
    }
  }
  return null;
};

// // Inicializar los estados basados en el breadcrumb
//   useEffect(() => {
//     if (breadcrumb.length > 0) {
//       setIsClicked(true);
//       const firstItem = findItem(items, breadcrumb[0]);
//       if (firstItem) setSelectedItem(firstItem);

//       if (breadcrumb.length > 1) {
//         const secondItem = findItem(firstItem?.subItems || [], breadcrumb[1]);
//         if (secondItem) setSelectedSecondItem(secondItem);

//         if (breadcrumb.length > 2) {
//           const thirdItem = findItem(secondItem?.subItems || [], breadcrumb[2]);
//           if (thirdItem) setSelectedThirdItem(thirdItem);
//         }
//       }
//     }
//   }, [breadcrumb]);  
 // Función para encontrar el camino del breadcrumb
  const findItemPath = (items: MenuItem[], text: string, path: string[] = []): string[] | null => {
    for (const item of items) {
      if (item.text === text) return [...path, text];
      if (item.subItems) {
        const result = findItemPath(item.subItems, text, [...path, item.text]);
        if (result) return result;
      }
    }
    return null;
  };

  const handleNavigation = (item: MenuItem) => {
    const breadcrumbPath = findItemPath(items, item.text);
    if (breadcrumbPath) {
      console.log("Breadcrumb Path:", breadcrumbPath);
      const params = new URLSearchParams({
        item: item.text,
        breadcrumb: breadcrumbPath.join(','),
      });
      router.push(`/portal/categorias?${params.toString()}`);
    }
  };

  const handlePrincipalSphereClick = () => {
    if (isClicked) {
      setSelectedItem(null);
      setSelectedSecondItem(null);
      setSelectedThirdItem(null);
      setSelectedFourthItem(null);
      setIsClicked(false);
    } else {
      setSelectedItem(items[0]);
      console.log('setSelectedItem', setSelectedItem)
      setIsClicked(true);
    }
  };

  const handleSecondSphereClick = (item: MenuItem) => {
    if (item.subItems) {
      if (selectedSecondItem?.text === item.text) {
        setSelectedSecondItem(null);
        setSelectedThirdItem(null);
        setSelectedFourthItem(null);
      } else {
        setSelectedSecondItem(item);
        console.log('selectedSecondItem', selectedSecondItem)
        setSelectedThirdItem(null);
        setSelectedFourthItem(null);
      }
    } else {
      handleNavigation(item);
    }
  };

  const handleThirdSphereClick = (item: MenuItem) => {
    if (item.subItems) {
      if (selectedThirdItem?.text === item.text) {
        setSelectedThirdItem(null);
        setSelectedFourthItem(null);
      } else {
        setSelectedThirdItem(item);
        setSelectedFourthItem(null);
      }
    } else {
      handleNavigation(item);
    }
  };

  const handleFourthSphereClick = (item: MenuItem) => {
    if (item.subItems) {
      if (selectedFourthItem?.text === item.text) {
        // setSelectedFourthItem(null); // Comentado para evitar el cierre al hacer clic en el mismo ítem
      } else {
        setSelectedFourthItem(item);
      }
    } else {
      handleNavigation(item);
    }
  };

  return (
    <div>
      <PrincipalSphere onClick={handlePrincipalSphereClick} />
      <AnimatePresence>
        {isClicked && selectedItem && (
          items.map((item) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                top: item.position.top,
                left: item.position.left,
              }}
            >
              <SecondSphere
                text={item.text}
                position={item.position}
                onClick={() => handleSecondSphereClick(item)}
              />
            </motion.div>
          ))
        )}
        {selectedSecondItem && selectedSecondItem.subItems && (
          selectedSecondItem.subItems.map((subItem) => (
            <motion.div
              key={subItem.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                top: subItem.position.top,
                left: subItem.position.left,
              }}
            >
              <ThirdSphere
                text={subItem.text}
                position={subItem.position}
                onClick={() => handleThirdSphereClick(subItem)}
              />
            </motion.div>
          ))
        )}
        {selectedThirdItem && selectedThirdItem.subItems && (
          selectedThirdItem.subItems.map((subItem) => (
            <motion.div
              key={subItem.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                top: subItem.position.top,
                left: subItem.position.left,
              }}
            >
              <FourthSphere
                text={subItem.text}
                position={subItem.position}
                onClick={() => handleFourthSphereClick(subItem)}
              />
            </motion.div>
          ))
        )}
        {selectedFourthItem && selectedFourthItem.subItems && (
          selectedFourthItem.subItems.map((subItem) => (
            <motion.div
              key={subItem.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                top: subItem.position.top,
                left: subItem.position.left,
              }}
            >
              <FifthSphere
                text={subItem.text}
                position={subItem.position}
                onClick={() => handleFourthSphereClick(subItem)}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircleMenuDesktop;
