import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  data: [],
  setData: () => {},
  formData: {},
  setFormData: () => {},
  AddtoTable: () => {},
  handleFormSubmit: () => {},
  handleUpdate: () => {},
  handleDelete: () => {},
});

const API = "https://jsonplaceholder.typicode.com/users";

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});

  const AddtoTable = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  let navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API, formData)
      .then((response) => {
        console.log("Data added:", response.data);
        AddtoTable(response.data);
        navigate("/ListPages");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFormData({});
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`${API}/${id}`, updatedData)
      .then((response) => {
        const updatedUser = response.data;
        setData((prevData) =>
          prevData.map((user) => (user.id === id ? updatedUser : user))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const value = {
    data,
    formData,
    setFormData,
    setData,
    AddtoTable,
    handleFormSubmit,
    handleUpdate,
    handleDelete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
