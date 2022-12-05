import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProfilePic } from "../components/ProfilePic";
import { MessageMe } from "../components/MessageMe";
import { MessageHim } from "../components/MessageHim";
import Cookies from 'js-cookie'

export const ActiveChat = ({ onClick, chat }) => {
	const Root = styled.div`
		display: flex;
		align-items: center;
		padding: 0rem 1rem 0rem 2rem;
		height: 5rem;
        flex-direction: column-reverse;
        height: 100%;
	`;

    console.log(chat)
	return <Root onClick={onClick}>{chat.messages.map((chatinfo) => {

        if (chatinfo.sender == Cookies.get('userid'))
        {
            return <MessageMe name = {chatinfo.name} msg = {chatinfo.message} pic = {chatinfo.sender}/>
        }
        else
        {
            return <MessageHim name = {chatinfo.name} msg = {chatinfo.message} pic = {chatinfo.sender}/>
        }

    })}</Root>;
};
