import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://samsung-backend-xds3.onrender.com/api/auth/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div className="users flex flex-col md:flex-row min-h-screen">
      <Sidebar />

      <div className="usercontainer flex-1 p-4 md:p-6 lg:p-10 w-full overflow-x-auto bg-gray-50 md:bg-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Users</h2>

        <table className="w-full border-collapse border border-gray-300 shadow-lg text-sm md:text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-2 md:p-3">ID</th>
              <th className="border p-2 md:p-3">Name</th>
              <th className="border p-2 md:p-3">Email</th>
              <th className="border p-2 md:p-3">Password</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="border p-2 md:p-3">{user.id}</td>
                  <td className="border p-2 md:p-3">{user.name}</td>
                  <td className="border p-2 md:p-3">{user.email}</td>
                  <td className="border p-2 md:p-3">{user.password}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="border p-5 text-center text-gray-500"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;