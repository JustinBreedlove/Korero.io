import React, { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import styled from "styled-components";
import { Chat } from "../containers/Chat";
import { ActiveChat } from "../containers/ActiveChat";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Color } from "../meta/Color.ts";


//TODO: Add user functionality to start a new chat


export const Inbox = () => {
	const chats = useRef([]);
	// const [messages, setMessages] = useLocalStorage("korero_msgs", []);
	const [isLoading, setIsLoading] = useState(true);
	const [activeChat, setActiveChat] = useState("");
	const [focusedChat, setFocusedChat] = useState(null);


	useEffect(() => {
		
		fetch("/chat/get").then(res => res.json()).then((res) =>
		{
			chats.current = res
			setIsLoading(false)
		})

		// setMessages([messages[0],...messages]);
	}, []);

	const Root = styled.div`
		width: 100%;
		height: min(100% - 4rem);
		display: flex;
	`;

	const ChatsContainer = styled.div`
		overflow-y: scroll;
		width: 600px;
		max-width: 30%;
		height: 100%;
	`;
	const FocusedChat = styled.div`
		overflow-y: scroll;
		overflow-x: hidden;
		width: 100%;
	`;
	const ComposeMessage = styled.div`
        display:flex;
        align-items: center;
        padding: 10px;
        position: sticky;
        bottom: 0px;
        background-color: ${Color.Primary};
    `;

	const onChangeMessageDraft = (e) => {
		// messageDraft = e.target.value;
	};
	return (
		<Root>
			<ChatsContainer>
				{!isLoading
					? chats.current.map((chat) => {
							console.log(chat)
						return	(<Chat
								onClick={() => {
									setActiveChat(chat.chatid);
								}}
								latest_msg={chat.messages[0].message}
								pic={"msg.his_b64_pfp"}></Chat>
					  )})
					: []}
					{chats.current.map((chat) => {
							console.log(chat)
						return	(<Chat
								onClick={() => {
									setActiveChat(chat.chatid);
								}}
								latest_msg={chat.messages[0].message}
								pic={"msg.his_b64_pfp"}></Chat>
					  )})}
			</ChatsContainer>
			<FocusedChat>
				{focusedChat}
				<ComposeMessage>
					<Input onChangeHandler={onChangeMessageDraft} text={"Message"} />
                    <Button text={"Send"} type={"secondary"} />
				</ComposeMessage>
			</FocusedChat>
		</Root>
	);
	// return (<div>TEST</div>)
};
