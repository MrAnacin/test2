import styled from "styled-components";

const MessageBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 5px 0;
  justify-content: flex-start;
`;

const MessageText = styled.p`
  position: relative;
  right: 0;
  text-align: right;
  max-width: 65%;
  padding: 12px;
  background: #fff;
  border-radius: 10px;
  font-size: 0.9em;
`;

function MessageRecieved() {
  return (
    <MessageBox>
      <MessageText>Hi there</MessageText>
    </MessageBox>
  );
}

export default MessageRecieved;
