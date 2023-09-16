import React, { useState } from "react";
import Task from "../Task";
import "../../CSS/Paginationstyles.css";
import ReactPaginate from "react-paginate";
import LoadingScreen from "../Loader/LoadingScreen";
import NoTask from "../NoTask";

export const Tasks = ({
  tasks,
  colors,
  deleteTask,
  handleEditEvent,
  firstTime,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const tasksPerPage = 9;
  let pageVisited = pageNumber * tasksPerPage;
  const pageCount = Math.ceil(tasks?.length / tasksPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const paginateTask = (taskLists) => {
    return taskLists
      ?.slice(pageVisited, pageVisited + tasksPerPage)
      .map((taskObject, index) => (
        <Task
          key={taskObject._id}
          task={taskObject}
          indexNo={index}
          colors={colors}
          deleteTask={deleteTask}
          handleEditEvent={handleEditEvent}
        />
      ));
  };
  return (
    <>
      <div className="w-full p-5 flex flex-col  items-center justify-center gap-2">
        {tasks?.length === 0 ? (
          firstTime ? (
            <NoTask />
          ) : (
            <LoadingScreen />
          )
        ) : (
          paginateTask(tasks)
        )}
      </div>
      <div className="pagination-bar ">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel="..."
          onPageChange={changePage}
          pageRangeDisplayed={10}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={"pagination-btn"}
          previousLinkClassName={"previous-btn"}
          nextLinkClassName={"next-btn"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </>
  );
};
