import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const ProfilePic = ({src = "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"}) => {
	const Root = styled.img`
        border-radius: 100%;
	`;

	return <Root src ={src}  width = {"50px"}height = {"50px"}></Root>;
};
