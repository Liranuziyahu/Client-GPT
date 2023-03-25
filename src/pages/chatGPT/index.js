import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Img from "../../img/Noviopus.png";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import axios from "axios";

const Index = () => {
  const [chat, setChat] = useState([]);

  const Send = (e) => {
    e.preventDefault();
    setChat((chat) => [
      ...chat,
      { message: e.target[0].value, response: "USER" },
    ]);

    axios
      .post("http://localhost:8080/translate", { text: e.target[0].value })
      .then((response) => {
        e.target[0].value = "";
        setChat((chat) => [
          ...chat,
          { message: response.data.message, response: "BOT" },
        ]);
      });
  };

  return (
    <Background>
      <WarpContent>
        <WarpPictureAndName>
          <Picture></Picture>
          <TitleName>Doctor</TitleName>
        </WarpPictureAndName>
        <AreaMessage>
          {chat.length == 0 && (
            <WarpMassage>
              <MiniPicture></MiniPicture>
              <Message>
                <TextMessage>
                  We didn't start convication yet. Please let me help you.
                </TextMessage>
              </Message>
            </WarpMassage>
          )}
          {chat.length > 0 &&
            chat.map((message) => {
              return message.response === "BOT" ? (
                <WarpMassage>
                  <MiniPicture></MiniPicture>
                  <Message>
                    <TextMessage>{message.message}</TextMessage>
                  </Message>
                </WarpMassage>
              ) : (
                <div style={{width:'96%'}}>
                     <Message
                  float="right"
                  direction="right"
                  margin="0px 5px 12px 0px"
                >
                  <TextMessage>{message.message}</TextMessage>
                </Message>
                </div>
               
              );
            })}
        </AreaMessage>

        <WarpMaassgeBoxAndSend>
          <TextAreaBot onSubmit={Send}>
            <MassageBox></MassageBox>
            <SendButton type="submit">
              <SendOutlinedIcon fontSize="small"></SendOutlinedIcon>
            </SendButton>
          </TextAreaBot>
        </WarpMaassgeBoxAndSend>
      </WarpContent>
    </Background>
  );
};
export default Index;

const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background: #553e64;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const WarpContent = styled.div`
  display: inline-grid;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 95vh;
  align-content: space-between;
  overflow: hidden;
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #2e2929 #553e64;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #553e64;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #2e2929;
    border-radius: 10px;
    border: 3px solid #2e2929;
    margin: 3px;
  }
`;

const WarpPictureAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;
const Picture = styled.img`
  width: 38px;
  height: 36px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background-image: url("${Img}");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const MiniPicture = styled(Picture)`
  width: 20px;
  height: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: 0.1px solid #ffffff;
  margin-top: 5px;
`;

const TitleName = styled.div`
  font-family: "Inter";
  font-style: italic;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  margin-top: 12px;
  margin-bottom: 12px;
  letter-spacing: 0.3em;
`;
const TextAreaBot = styled.form`
  display: flex;
  width: 96%;
  background: rgba(217, 217, 217, 0.2);
  border-radius: 3px;
  height: 50px;
  align-items: center;
  margin-left: 2%;
  margin-top: -5px;
`;
const WarpMassage = styled.div`
  width: 96%;
  display: flex;
  margin-left: 2%;
`;
const AreaMessage = styled.div`
  width: 100%;
  height: auto;
  max-height: 95%;
  margin-top: 4px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Message = styled.div`
  width: auto;
  max-width: 70%;
  height: auto;
  background: #d9d9d9;
  border-radius: 50px;
  padding: 10px 20px;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  float: ${({ float }) => float || "left"};
  direction: right;
  margin: ${({ margin }) => margin || "0px 0px 12px 5px"};
`;
const TextMessage = styled.div`
  font-family: "Lexend", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
  color: #000000;
  overflow: hidden;
`;
const WarpMaassgeBoxAndSend = styled.div`
  width: 100%;
  height: 40px;
`;

const MassageBox = styled.textarea`
  width: 82%;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 3px;
  margin: 3px;
`;

const SendButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;
  border: 0px;
`;
