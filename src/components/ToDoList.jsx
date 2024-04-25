import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ToDoItem from "./ToDoItem";
import AddBox from "./AddBox";
import noteIcon from "../assets/note.png";

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const fetchToDoList = useCallback(async () => {
    try {
      const result = await axios.get(`https://localhost:7174/api/ToDoItem`);
      setTodoList(result.data.data);
      console.log(result.data);
    } catch (error) {
      console.error("Fetching data error: ", error);
      throw error;
    }
  });

  useEffect(() => {
    fetchToDoList();
  }, []);

  const handleOnAction = useCallback(() => {
    fetchToDoList();
  }, []);

  return (
    <div className="md:container bg-white p-10 rounded-3xl shadow-lg">
      <h1 className="flex gap-4 text-4xl font-bold">
        To-Do List
        <span>
          <img src={noteIcon} className="h-10" />
        </span>
      </h1>
      <AddBox onAddItem={handleOnAction} />
      <div className="container-lg">
        <div className="grid grid-cols-1 gap-2">
          {todoList.map((item) => (
            <ToDoItem key={item.id} item={item} onDeleteItem={handleOnAction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
