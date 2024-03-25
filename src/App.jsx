import { useState } from "react";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import boardSlice from "./redux/boardSlice";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const [openBoardModal, setOpenBoardModal] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              setIsBoardModalOpen={setOpenBoardModal}
              isBoardModalOpen={openBoardModal}
            />
            <Home
              setIsBoardModalOpen={setOpenBoardModal}
              isBoardModalOpen={openBoardModal}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
