import React, { useState } from "react";
import { useUserContext } from "./context/usercontext";

function ListPages() {
  const { data, handleDelete, handleUpdate } = useUserContext();

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUserData({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUserData({});
  };

  const handleSaveEdit = () => {
    handleUpdate(editingUserId, editedUserData);
    setEditingUserId(null);
  };

  // Get the columns, but exclude 'username' from the table
  const columns =
    data.length > 0
      ? Object.keys(data[0]).filter((col) => col !== "username")
      : [];

  const renderCellContent = (col, user) => {
    const value = user[col];
    if (typeof value === "object" && value !== null) {
      if (col === "company" && value.name) {
        // Only show company name
        return value.name;
      }
      if (value.street && value.city && value.zipcode) {
        // Render address properly
        return `${value.street}, ${value.suite}, ${value.city}, ${value.zipcode}`;
      }
      if (value.lat && value.lng) {
        // Render geo location
        return `lat: ${value.lat}, lng: ${value.lng}`;
      }
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div className="container">
      <h2 className="display-4 text-white mb-4">User List</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="text-center">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={user.id}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="text-center">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      name={col}
                      value={editedUserData[col] || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    renderCellContent(col, user)
                  )}
                </td>
              ))}
              <td className="text-center">
                {editingUserId === user.id ? (
                  <div className="d-flex flex-column align-items-center gap-2">
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEdit}
                      style={{ width: "100px" }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={handleCancelEdit}
                      style={{ width: "100px" }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(user)}
                      style={{ width: "100px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                      style={{ width: "100px" }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPages;
