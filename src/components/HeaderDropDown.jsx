import { useState } from "react";
import { useSelector } from "react-redux";
import useDarkMode from "../hooks/useDarkMode";
import boardIcon from "../assets/icon-board.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import { Switch } from "@headlessui/react";

/* eslint-disable react/prop-types */
const HeaderDropDown = ({ setOpenDropdown, setOpenBoardModal }) => {
  const [colorTheme, setTheme] = useDarkMode();
  const boards = useSelector((state) => state.boards);
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const handleOutsideClick = (e) => {
    if (e.target !== e.currentTarget) return;
    setOpenDropdown(false);
  };

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => handleOutsideClick(e)}
    >
      <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          All boards ({boards?.length})
        </h3>
        <div>
          {boards?.map((board, index) => (
            <div
              key={index}
              className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 ${
                board.isActive && "bg-[#635fc7] rounded-full text-white mr-8"
              }`}
            >
              <img src={boardIcon} alt="board-icon" className="h-4 " />
              <p className="text-lg font-bold">{board.name}</p>
            </div>
          ))}
          <div
            className="cursor-pointer flex items-baseline space-x-2 text-[#635fc7] px-5 py-4"
            onClick={() => {
              setOpenBoardModal(true);
              setOpenDropdown(false);
            }}
          >
            <img src={boardIcon} alt="board-icon" className="h-4" />
            <p className="text-lg font-bold">Create New Board</p>
          </div>
          <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="light-icon" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src={darkIcon} alt="dark-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropDown;
