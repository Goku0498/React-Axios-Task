import React from "react";
import { useUserContext } from "./context/usercontext";

function Home() {
  const { formData, setFormData, handleFormSubmit } = useUserContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formFields = [
    { name: "name", type: "text", placeholder: "Enter the Name" },
    { name: "email", type: "email", placeholder: "name@example.com" },
    { name: "phone", type: "number", placeholder: "Enter Phone Number" },
    { name: "website", type: "text", placeholder: "Website URL" },
    { name: "company", type: "text", placeholder: "Company Name" },
    { name: "address", type: "text", placeholder: "Address" },
  ];

  return (
    <div className="container my-5">
      <h2 className="display-4 text-white mb-4">Enter User Data</h2>
      <form onSubmit={handleFormSubmit} className="p-4 bg-light rounded">
        {formFields.map((field) => (
          <div key={field.name} className="mb-3">
            <input
              type={field.type}
              name={field.name}
              className="form-control"
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">
          Add To List
        </button>
      </form>
    </div>
  );
}

export default Home;
