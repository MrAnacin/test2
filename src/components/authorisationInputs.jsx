import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSettingsQuery } from "../redux/baseApi";
import "./authorisationInputs.css";

function AuthorisationInputs() {
  const [idInstance, setIdInstance] = useState("1101852976");
  const [apiToken, setApiToken] = useState("3e4822062bc147b5b173e784b88709d97cee7dd9dd474d31a4");
  const navigate = useNavigate();
  const [triggerApi, setTriggerApi] = useState(false);

  const { data, error, isLoading } = useGetSettingsQuery(
    triggerApi
      ? {
          idInstance,
          apiTokenInstance: apiToken,
        }
      : undefined
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem("userId", idInstance);
      localStorage.setItem("apiToken", apiToken);
      console.log("True");
      navigate("/addressee");
    }
  }, [data, navigate, idInstance, apiToken]);

  if (error) {
    console.log(error);
  } else if (isLoading) {
    return <p>Загрузка.....</p>;
  }

  const handleSubmit = async () => {
    console.log(idInstance, apiToken);
    setTriggerApi(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Айди"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Апи"
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
        className="input-field"
      />
      <div className="button">
        <button onClick={handleSubmit}>Продолжить</button>
      </div>
    </div>
  );
}

export default AuthorisationInputs;

