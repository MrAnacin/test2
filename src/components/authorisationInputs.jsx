import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSettingsQuery } from "../redux/baseApi";

function AuthorisationInputs() {
  const [idInstance, setIdInstance] = useState("");
  const [apiToken, setApiToken] = useState("");
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
      console.log(`ok`);
      navigate("/addressee");
    }
  }, [data, navigate, idInstance, apiToken]);

  if (error) {
    console.log(error);
  } else if (isLoading) {
    return <p>Its loading</p>;
  }

  const handleSubmit = async () => {
    console.log(idInstance, apiToken);
    setTriggerApi(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your IdInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your ApiToken"
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
      />
      <button onClick={handleSubmit}> Enter </button>
    </div>
  );
}

export default AuthorisationInputs;

// 7103850205;
// aaa771e2666641adbf924f167349a6789a240e5e18ae49f1be;
