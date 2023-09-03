import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChoosingReciever() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("addressee", number); // Save the number in local storage
    navigate("/chat");
  };

  return (
    <div>
      <h1>Please enter a number you want to send message to</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Start chatting</button>
    </div>
  );
}

export default ChoosingReciever;
