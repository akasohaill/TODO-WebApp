// Importing React library
import React from 'react';

// Functional component Todo to render a single todo item
const Todo = ({title, description, complete, id, mongoID, deleteTodo, putTodo}) => {
  return (
    // Table row representing a todo item
    <tr className="bg-white border-b dark:bg-white-800 dark:border-white-700">
      {/* Table cell for todo item number */}
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
        {/* Displaying the todo item number */}
        {id + 1}
      </th>
      {/* Table cell for todo item title */}
      <td className="px-6 py-4">
        {/* Displaying the todo item title */}
        {title}
      </td>
      {/* Table cell for todo item description */}
      <td className="px-6 py-4">
        {/* Displaying the todo item description */}
        {description}
      </td>
      {/* Table cell for todo item status */}
      <td className="px-6 py-4">
        {/* Displaying the status based on completeness */}
        {complete ? "Completed" : "Pending"} 
      </td>
      {/* Table cell for todo item actions */}
      <td className="px-6 py-4 flex gap-1">
        {/* Button to delete todo item */}
        <button onClick={() => deleteTodo(mongoID)} className='py-2 px-4 bg-red-500 text-white'>Delete</button>
        {/* Button to mark todo item as done */}
        <button onClick={() => putTodo(mongoID)} className='py-2 px-4 bg-green-500 text-white'>Done</button>
      </td>
    </tr>
  );
}

// Exporting the Todo component as default
export default Todo;
