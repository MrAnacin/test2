import styled from "styled-components";

const MessageBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 5px 0;
  justify-content: flex-end;
`;

const MessageText = styled.p`
  position: relative;
  right: 0;
  text-align: right;
  max-width: 65%;
  padding: 12px;
  background: #dcf8c6;
  border-radius: 10px;
  font-size: 0.9em;
`;

function MessageSent({ message }) {
  console.log(message);
  return (
    <MessageBox>
      <MessageText>{message}</MessageText>
    </MessageBox>
  );
}

export default MessageSent;
