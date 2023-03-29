import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Ooops.. something went wrong</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
