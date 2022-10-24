import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfilePic } from "../components/ProfilePic";

export const Chat = ({ latest_msg, pic }) => {
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
        ${latest_msg.is_read ? "" : "font-weight: bold" };
	`;
	const Message = styled.p`
		margin: 0px;
		padding: 0rem;
	`;
	return (
		<Root>
			<ProfilePic src={pic} />
			<MessageContainer>
				<Sender>{latest_msg.from}</Sender>
				<Message>{latest_msg.message}</Message>
			</MessageContainer>
		</Root>
	);
};
