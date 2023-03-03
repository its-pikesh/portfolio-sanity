import React, { useRef, useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";

import "./ChatGpt.scss";

const ChatGpt = () => {
  const [messageText, setMessageText] = useState(null);
  const [chatData, setChatData] = useState([]);

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  const scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    chat.scrollTop = chat.scrollHeight;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uniqueId = generateUniqueId();
    //new msg object
    const umsg = {
      id: uniqueId,
      isAi: false,
      msg: messageText,
    };
    setChatData([...chatData, umsg]);
    e.target.reset();

    const response = await fetch("https://codex-mh3i.onrender.com/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: messageText,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();
      // typeText(messageDiv, parsedData);
      let uId = generateUniqueId();
      const bmsg = {
        id: uId,
        isAi: true,
        msg: parsedData,
      };
      scrollToBottom();

      setChatData([...chatData, umsg, bmsg]);
    } else {
      const err = await response.text();
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="head-text">
        ChatGpt <span>App</span>
      </h2>
      <div id="chatWindow" className="chatWindow">
        <ul className="chat" id="chatList">
          {chatData.map((data) => {
            scrollToBottom();
            return (
              <div key={data.id}>
                <li className={data.isAi ? "other" : "self"}>
                  <div className="msg">
                    <p>{data.isAi ? "Bot" : "Human"}</p>
                    <div className="message"> {data.msg} </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>

        <div className="chatInputWrapper">
          <form onSubmit={handleSubmit}>
            <input
              className="textarea input"
              type="text"
              placeholder="Enter your message..."
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
      <button onClick={() => scrollToBottom()}>click</button>
    </>
  );
};

export default AppWrap(
  MotionWrap(ChatGpt, "app__chatgpt"),
  "chatgpt",
  "app__primarybg"
);
