import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("No userId found");
      return;
    }

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://aws-github-backend.onrender.com/repo/user/${userId}`
        );

        const data = await response.json();

        // ✅ Backend returns array directly
        setRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching user repositories:", err);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          `https://aws-github-backend.onrender.com/repo/all`
        );

        const data = await response.json();

        setSuggestedRepositories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching suggested repositories:", err);
        setSuggestedRepositories([]);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">
        {/* LEFT SIDE */}
        <aside>
          <h3>Suggested Repositories</h3>

          {suggestedRepositories.length === 0 ? (
            <p>No suggestions</p>
          ) : (
            suggestedRepositories.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
              </div>
            ))
          )}
        </aside>

        {/* MAIN */}
        <main>
          <h2>Your Repositories</h2>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchResults.length === 0 ? (
            <p>No repositories found</p>
          ) : (
            searchResults.map((repo) => (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <p>{repo.description || "No description"}</p>
              </div>
            ))
          )}
        </main>

        {/* RIGHT SIDE */}
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>Tech Conference - Dec 15</li>
            <li>Developer Meetup - Dec 25</li>
            <li>React Summit - Jan 5</li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;