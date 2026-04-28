import React, { useState } from "react";

const CreateRepo = () => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const userId = localStorage.getItem("userId");

    const res = await fetch("https://aws-github-backend.onrender.com/repo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        owner: userId,
        visibility: true
      })
    });

    const data = await res.json();
    console.log(data);
    alert("Repo Created!");
  };

  return (
    <div>
      <h2>Create Repository</h2>
      <input
        placeholder="Repo name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateRepo;