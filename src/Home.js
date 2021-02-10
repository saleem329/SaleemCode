import React, { useState, useEffect } from "react";

const Home = () => {
  const [query, setQuery] = useState("");

  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    // Default options are marked with *

    const response = await fetch(
      "https://api.github.com/users/ethanboxx/repos?per_page=50"
    );

    return response.json();
  };

  useEffect(() => {
    getRepos().then((response) => {
      const filteredData = response.map((repoInfo) => repoInfo.name);

      setRepos(filteredData);
    });
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ margin: 30, maxWidth: 500, textAlign: "left" }}>
      Search a Repo{" "}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {(filteredRepos.length && (
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <b> List of Repos:</b>

          <div style={{ border: "1px solid gray", marginTop: 10 }}>
            {filteredRepos.map((repo) => (
              <div style={{ padding: 10, borderBottom: "1px solid gray" }}>
                {repo}
              </div>
            ))}
          </div>
        </div>
      )) || <div>No Repo available</div>}
    </div>
  );
};

export default Home;
