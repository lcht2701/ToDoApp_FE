import React, { useState } from "react";
import { baseURL } from "../apis/link";
import axios from "axios";

const AddBox = ({ onAddItem }) => {
  const initialFormData = {
    title: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${baseURL}/ToDoItem`, formData);
      onAddItem();
      console.log(result.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Add data error: ", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <div className="w-full flex justify-center items-center py-5 my-3">
        <input
          name="title"
          type="text"
          placeholder="Add new task..."
          value={formData.title}
          onChange={handleChange}
          className="flex-grow bg-gray-100 rounded-full shadow-md mr-3 px-5 py-4"
        ></input>
        <button
          type="submit"
          className="bg-red-500 rounded-full px-10 py-4 uppercase font-bold text-white hover:bg-red-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddBox;
