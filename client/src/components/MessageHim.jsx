import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { ProfilePic } from "../components/ProfilePic";

export const MessageHim = ({ msg, pic, name }) => {
	const Root = styled.div`
        display: flex;
        align-items: center;
        height: 5rem;
        margin-right: auto;
		background-color: ${Color.Accent4};
		border-radius: 10px;
		margin-top: 1rem;

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
	`;
	const Message = styled.p`
		margin: 0px;
		padding: 0rem;
	`;
	return (
		<Root >
			<ProfilePic src={pic} />
			<MessageContainer>
				<Sender>{name}</Sender>
				<Message>{msg}</Message>
			</MessageContainer>
		</Root>
	);
};
