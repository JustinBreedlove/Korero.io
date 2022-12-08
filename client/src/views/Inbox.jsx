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
	const [isLoading, setIsLoading] = useState(true);
	const [activeChat, setActiveChat] = useState(null);
	const [activeChatId, setActiveChatId] = useState(null);
	const [activeChatLocal, setActiveChatLocal] = useLocalStorage("activeChat", "");

	const messageDraft = useRef(null);
	const messageStartDraft = useRef(null);


	const getMessages = () =>
	{
		
	}

	useEffect(() => {
		fetch(`/chat/get`)
		.then((res) => res.json())
		.then((res) => {
			chats.current = res;

			if (activeChatLocal != "") {
				res.forEach((chat) => {
					if (chat.chatid == activeChatLocal) {
						setActiveChat(<ActiveChat chat={chat} />);
					}
				});
			}
			setIsLoading(false);
		});
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
		display: flex;
		align-items: center;
		padding: 10px;
		position: sticky;
		bottom: 0px;
		background-color: ${Color.Primary};
		margin-top: 1rem;
	`;

	const NewChatBox = styled.div`
	display: flex;

	align-items: center;
	padding: 0rem 1rem 0rem 1rem;
	height: 5rem;
	background-color: ${Color.Accent3};
	border: 1px solid ${Color.Accent2};
`;
	const onChangeMessageDraft = (e) => {
		messageDraft.current = e.target.value;
	};
	const onChangeMessageStartDraft = (e) => {
		messageStartDraft.current = e.target.value;
	};
	const onClickSendHandler = (e) => {
		fetch("/chat/send", { headers: { "x-korrero-chatid": activeChatId || activeChatLocal, "x-korrero-msg": messageDraft.current } }).then((res) => {
			messageDraft.current = "";
		});
	};
	const onClickStartHandler = (e) => {
		fetch("/chat/start", { headers: { "x-korrero-receiver": messageStartDraft.current, "x-korrero-msg": "" } }).then((res) => {
			messageStartDraft.current = "";
		});
	};
	return (
		<Root>
			<ChatsContainer>
				<NewChatBox>	
					<Input onChangeHandler={onChangeMessageStartDraft} text={"User/Email/Phone"} />
					<Button text={"Start"} type={"secondary"} onClickHandler={onClickStartHandler} />
				</NewChatBox>
				{!isLoading
					? chats.current.map((chat) => {
							return (
								<Chat
									onClick={() => {
										setActiveChat(<ActiveChat chat={chat} />);
										setActiveChatId(chat.chatid);
										setActiveChatLocal(chat.chatid);
									}}
									message={chat.messages[0]}
									userid1={chat.userid1}
									userid2={chat.userid2}
								/>
							);
					  })
					: []}
			</ChatsContainer>
			<FocusedChat>
				{activeChat}
				{activeChat ? 
				<ComposeMessage>
					<Input onChangeHandler={onChangeMessageDraft} text={"Message"} />
					<Button text={"Send"} type={"secondary"} onClickHandler={onClickSendHandler} />
				</ComposeMessage>
				:
				[]}
			</FocusedChat>
		</Root>
	);
};
