import { React, useState } from "react";
import styled from "styled-components";
import { useSendMessageMutation } from "../redux/baseApi";
import { Icon } from "@iconify/react";

const ChatInputBox = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextInput = styled.input`
  position: relative;
  width: 90%;
  margin: 0 20px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 1em;
  border: none;
  outline: none;
`;

const SendButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  flex: 0 0 auto;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0;
  position: relative;
  outline: none;
`;

const SendCircle = styled.div`
  background: #008a7c;
  border-radius: 50%;
  color: #fff;
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function InputField({ setMessage }) {
  const [messageText, setMessageText] = useState("");

  const [sendMessage, { isLoading, isError, error }] = useSendMessageMutation();

  const reciever = localStorage.getItem("addressee");
  console.log(reciever);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || error) {
    return <div>{error}</div>;
  }

  const handleSend = async () => {
    setMessage((prevMessages) => [...prevMessages, messageText]);

    const idInstance = localStorage.getItem("userId");
    const apiTokenInstance = localStorage.getItem("apiToken");

    console.log(idInstance);
    console.log(apiTokenInstance);

    try {
      await sendMessage({
        idInstance,
        apiTokenInstance,
        reciever,
        message: messageText,
      });
      setMessageText("");
    } catch (err) {
      console.error("Error sending the message:", err);
    }
  };

  return (
    <ChatInputBox>
      <TextInput
        type="text"
        placeholder="Пиши сообщение тут"
        name="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <SendButton onClick={handleSend}>
        <SendCircle>
          <Icon icon="zmdi:mail-send"></Icon>
        </SendCircle>
      </SendButton>
    </ChatInputBox>
  );
}

export default InputField;
