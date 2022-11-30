import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import styled from "styled-components";
import { Chat } from "../containers/Chat";
import { ActiveChat } from "../containers/ActiveChat";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Color } from "../meta/Color.ts";

export const Inbox = () => {
	const [messages, setMessages] = useLocalStorage("korero_msgs", []);
	const [isLoading, setIsLoading] = useState(true);
	const [activeChat, setActiveChat] = useState("");
	const [focusedChat, setFocusedChat] = useState(null);

	let messageDraft = "";

	useEffect(() => {
		messages.map((msg) => {
			if (msg.his_username == activeChat) {
				setFocusedChat(<ActiveChat msg={msg} />);
			}
		});
		// setMessages([messages[0],...messages]);
		setIsLoading(false);
	}, [activeChat]);

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
		messageDraft = e.target.value;
	};
	return (
		<Root>
			<ChatsContainer>
				{!isLoading
					? messages.map((msg) => (
							<Chat
								onClick={() => {
									setActiveChat(msg.his_username);
								}}
								latest_msg={msg.latest_msg}
								pic={msg.his_b64_pfp}></Chat>
					  ))
					: []}
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
};
