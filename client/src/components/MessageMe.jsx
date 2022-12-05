import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfilePic } from "../components/ProfilePic";

export const MessageMe = ({ msg, pic, name }) => {
	const Root = styled.div`
        display: flex;
        align-items: center;
        padding: 0rem 1rem 0rem 2rem;
        height: 5rem;
        margin-left: auto;
		background-color: ${Color.Accent3};
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
		<Root>
			<MessageContainer>
				<Sender>{name}</Sender>
				<Message>{msg}</Message>
			</MessageContainer>
			<ProfilePic src={pic} />
		</Root>
	);
};
