import { useEffect, useState } from "react";
import { users } from "../axios/NavBar/navbar";

export default function NavBar({ toggleMenu }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    users()
      .then((rs) => setData(rs))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="w-full bg-[#613b76] text-white p-4 flex justify-between md:justify-start items-center shadow-md shadow-violet-200">
      <img src="logo.jpeg" alt="Logo" className="h-10 rounded-full" />

      <h1 className="text-lg font-bold ml-4 text-white md:ml-50">
        Bienvenid@: {data.nombre}
      </h1>

      <button className="md:hidden" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-[#8b7ce8]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}
