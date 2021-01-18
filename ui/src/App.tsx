import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <h1></h1>;
}

export default App;
