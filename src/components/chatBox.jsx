import React, { useState, useEffect } from "react";
import InputField from "./inputField";
import styled from "styled-components";
import MessageSent from "./messageSent";
import MessageRecieved from "./messageRecieved";
import {
  useRecieveNotificationQuery,
  useDeleteNotificationMutation,
} from "../redux/baseApi";

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ConversationContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 120px); /*60+60*/
  padding: 50px;
  overflow-y: auto;
`;

const AddresseeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #00FF00;
  color: black;
  padding: 0 8px;
  font-size: 24px;
  position: relative;
  z-index: 1;
`;

const AddresseeName = styled.h4`
  font-size: 30px;
  font-weight: 400;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;
  margin: 0 0 0 8px;
  overflow: hidden;
  white-space: nowrap;
`;


function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [recMessages, setRecMessages] = useState([]);
  const addressee = localStorage.getItem("addressee");

  const [deleteNotification] = useDeleteNotificationMutation();

  const { data: receivedMessages, refetch: refetchNotifications } =
    useRecieveNotificationQuery({
      idInstance: localStorage.getItem("userId"),
      apiTokenInstance: localStorage.getItem("apiToken"), 
    });
  console.log(receivedMessages);

  useEffect(() => {
    if (receivedMessages && receivedMessages.length > 0) {
      setRecMessages((prev) => [...prev, ...receivedMessages]);

      deleteNotification({
        idInstance: localStorage.getItem("userId"),
        apiTokenInstance: localStorage.getItem("apiToken"),
        receiptId: receivedMessages.receiptId,
      });
    }
  }, [receivedMessages, deleteNotification]);

  useEffect(() => {
    if (receivedMessages) {
      const fetchInterval = setInterval(() => {
        refetchNotifications();
      }, 5000);

      return () => clearInterval(fetchInterval);
    }
  }, [receivedMessages, refetchNotifications]);

  const HandleReceiving = async () => {
    try {
      const data = await refetchNotifications();
      console.log(data);
      console.log(data.requestId);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };
  return (
    <div>
      <MainBox>
        <AddresseeBox>
          <AddresseeName>{addressee}</AddresseeName>
        </AddresseeBox>
        <ConversationContainer>
          {messages.map((msg, index) => (
            <MessageSent key={index} message={msg} />
          ))}

          {recMessages.map((text, index) => (
            <MessageRecieved key={index} message={text} />
          ))}
        </ConversationContainer>
        <InputField setMessage={setMessages} />
        <div>
          <button onClick={HandleReceiving}>Проверка</button>
        </div>
      </MainBox>
    </div>
  );
}

export default ChatBox;
