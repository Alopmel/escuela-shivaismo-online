'use client'
import { useState } from 'react';
import { RiAlignRight, RiCloseLine, RiHomeHeartLine, RiUploadCloud2Line } from "react-icons/ri";
import { BiShow } from "react-icons/bi";
import { MdOutlineRecommend } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="site">
      <div id="page">
        <div className="container">
          <nav className="nav">
            <input
              type="checkbox"
              id="link"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <ul className={`submenu ${isChecked ? 'block' : 'hidden'}`}>
              <li>
                <Link className="linkTo" href="#">
                  <span>Inicio</span><RiHomeHeartLine className="menuIcon" />
                </Link>
              </li>
              <li>
                <Link className="linkTo" href="#">
                  <span>Más vistos</span><BiShow className="menuIcon" />
                </Link>
              </li>
              <li>
                <Link className="linkTo" href="#">
                  <span>Recomendados</span><MdOutlineRecommend className="menuIcon" />
                </Link>
              </li>
              <li>
                <Link className="linkTo" href="#">
                  <span>Último material</span><RiUploadCloud2Line className="menuIcon" />
                </Link>
              </li>
              <li>
                <Link className="linkTo" href="#">
                  <span>Salir</span><IoMdLogOut className="menuIcon" />
                </Link>
              </li>
            </ul>
            <label htmlFor="link" className="link cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2">
              {!isChecked ? 
                <RiAlignRight className="text-2xl text-white" /> :
                <RiCloseLine className="text-2xl text-white" />
              }
            </label>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
