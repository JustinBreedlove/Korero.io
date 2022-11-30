import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfilePic } from "../components/ProfilePic";
import { MessageMe } from "../components/MessageMe";
import { MessageHim } from "../components/MessageHim";

export const ActiveChat = ({ onClick, msg }) => {
	const Root = styled.div`
		display: flex;
		align-items: center;
		padding: 0rem 1rem 0rem 2rem;
		height: 5rem;
        flex-direction: column-reverse;
        height: 100%;
	`;

    console.log(msg)
	return <Root onClick={onClick}>{msg.messages.map((currentMessage) => {

        if (currentMessage.who == "me")
        {
            return <MessageMe name = {msg.my_name} msg = {currentMessage.msg}/>
        }
        else
        {
            return <MessageHim name = {msg.his_name} msg = {currentMessage.msg}/>
        }

    })}</Root>;
};
