import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { ProfilePic } from "../components/ProfilePic";

export const Chat = ({ message, userid1, userid2, onClick }) => {
	if (!message)
	{
		message = ""
	}
	const Root = styled.div`
        display: flex;
        align-items: center;
        padding: 0rem 1rem 0rem 2rem;
        height: 5rem;
		background-color: ${Color.Accent3};
        border: 1px solid ${Color.Accent2};
	`;
	const MessageContainer = styled.div`
		display: flex;
		flex-direction: column;
		margin: 0px;
		padding: 0rem 1rem 0rem 1rem;

	`;
	const Sender = styled.p`
		margin: 0px;
		padding: 0px;
        ${message.isread ? "" : "font-weight: bold" };
	`;
	const Message = styled.p`
		margin: 0px;
		padding: 0rem;
	`;
	return (
		<Root onClick={onClick}>
			<ProfilePic src={message.sender == userid1 ? userid1 : userid2} />
			<MessageContainer>
				<Sender>{message.name}</Sender>
				<Message>{message.message}</Message>
			</MessageContainer>
		</Root>
	);
};
