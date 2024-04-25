import React, { useCallback, useEffect, useState } from "react";
import { baseURL } from "../apis/link";
import { FaTimes, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import axios from "axios";

const ToDoItem = ({ item, onDeleteItem }) => {
  const [checkBox, setCheckBox] = useState(item.isDone);

  const handleCheck = useCallback(async () => {
    try {
      const result = await axios.patch(
        `${baseURL}/ToDoItem/${item.id}/is-done`
      );
      setCheckBox(result.data.data.isDone);
      console.log(result.data);
    } catch (error) {
      console.error("Update data error: ", error);
      throw error;
    }
  });

  const handleDelete = useCallback(async () => {
    try {
      const result = await axios.delete(`${baseURL}/ToDoItem/${item.id}`);
      if (result.status === 200) {
        onDeleteItem(item.id);
        console.log(result.data);
      }
    } catch (error) {
      console.error("Delete data error: ", error);
      throw error;
    }
  });

  return (
    <div className="flex justify-between w-full py-3 px-2 rounded">
      <div className="flex gap-5 justify-start items-center">
        <button
          onClick={handleCheck}
          className="text-3xl text-orange-400 rounded-full hover:bg-orange-100"
        >
          {checkBox ? <FaCheckCircle /> : <FaRegCircle />}
        </button>
        <div className={`text-xl ${checkBox ? "line-through" : ""}`}>
          {item.title}
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="rounded-full hover:bg-gray-100 p-3 text-gray-400"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ToDoItem;
