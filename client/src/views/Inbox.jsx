import React, { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import styled from "styled-components";
import { Chat } from "../containers/Chat";
import { ActiveChat } from "../containers/ActiveChat";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Color } from "../meta/Color.ts";
import {Error} from "../components/Error"
//TODO: Add user functionality to start a new chat

export const Inbox = () => {
	const chats = useRef([]);
	const error = useRef([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [activeChatId, setActiveChatId] = useState(null);
	const [activeChatLocal, setActiveChatLocal] = useLocalStorage("activeChat", "");

	const messageDraft = useRef(null);
	const messageStartDraft = useRef(null);


	const getMessages = () =>
	{
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
	}
	
	useEffect(() => {
		getMessages();
	}, []);

	const Root = styled.div`
		width: 100%;
		height: min(100% - 4rem);
		display: flex;
		background-color: ${Color.Secondary};

	`;

	const ChatsContainer = styled.div`
		overflow-y: scroll;
		width: 600px;
		max-width: 30%;
		height: 100%;
	`;
	const FocusedChat = styled.div`
		display: flex;
		flex-direction: column-reverse;
		overflow-y: scroll;
		overflow-x: hidden;
		width: 100%;
	`;
	const ComposeMessage = styled.div`
		display: flex;
		align-items: center;
		padding: 10px;
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
		
		// Encrypt messsageDraft.current


		let body = {
			chatid: activeChatId || activeChatLocal,
			msg : messageDraft.current
		}
		

		fetch("/chat/send", { method: "POST", body: JSON.stringify(body) }).then((res) => {
			messageDraft.current = "";
			getMessages()
		});
	};
	const onClickStartHandler =  (e) => {
		setIsError(false)
		let body = {
			receiver: messageStartDraft.current,
			msg : "Your friend wants to chat"
		}

		fetch("/chat/start", { method: "POST", body: JSON.stringify(body) }).then(async (res) => {
			
			messageStartDraft.current = "";
			if(res.status == 400)
			{
				error.current = [<Error errorMessage = {"Invalid Account Details"}/>]
				setIsError(true)
				
				return;
			}

			getMessages()
		});
		
	};
	return (
		<Root>
			<ChatsContainer>
				{
					error.current
				}
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
			{activeChat ? 
					<ComposeMessage>
						<Input onChangeHandler={onChangeMessageDraft} text={"Message"} />
						<Button text={"Send"} type={"secondary"} onClickHandler={onClickSendHandler} />
					</ComposeMessage>
					:
					[]}
				{activeChat}


			</FocusedChat>

		</Root>
	);
};
