import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authorisationInputs.css";

function ChoosingReciever() {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("addressee", number);
    navigate("/chat");
  };

  return (
    <div>
      <h1>Введите номер телефона</h1>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSubmit}>Начало</button>
    </div>
  );
}

export default ChoosingReciever;
