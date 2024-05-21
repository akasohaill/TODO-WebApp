"use client";

// Importing necessary dependencies from React and other libraries
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Functional component Home representing the main page of the Todo application
export default function Home() {

  // State to manage form data for adding new todos
  const [formData, setFormData] = useState({
    title:"",
    description: ""
  });

  // State to store todo data fetched from the server
  const [todoData, setTodoData] = useState([]);

  // Function to fetch todos from the server
  const fetchTodos = async () => {
    const response = await axios('/api');
    setTodoData(response.data.todos);
  }

  // useEffect hook to fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to delete a todo item
  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    });
    toast.success(response.data.msg);
    fetchTodos();
  }

  // Function to mark a todo item as completed
  const putTodo = async (id) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId: id
      }
    });
    toast.success(response.data.msg);
    fetchTodos();
  }

  // Function to handle form input change
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...formData, [name]: value }));
  }

  // Function to handle form submission for adding a new todo
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({ title: "", description: "" });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  }

  // Rendering the component
  return (
    <>
      <ToastContainer theme="dark"/>
      {/* Form for adding new todos */}
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 mx-auto" onSubmit={onSubmitHandler}>
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter the Title" className="px-3 py-2 w-full border-2" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter the description" className="px-3 py-2 w-full border-2"></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add To List</button>
      </form>
      {/* Table displaying the list of todos */}
      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left light:bg-white-700 rtl:text-right text-gray-500 dark:text-gray-400">
          {/* Table header */}
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-white-700 dark:text-gray">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Mapping over todoData to render each todo item */}
            {todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoID={item._id} deleteTodo={deleteTodo} putTodo={putTodo}/>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
