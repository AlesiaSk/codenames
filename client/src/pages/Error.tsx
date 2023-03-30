import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Oops.. something went wrong</h1>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Try again
      </button>
    </>
  );
};

export default Error;
