import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Header2 = ({text}) => {
	const Root = styled.h2`
        text-align: center;

	`;

	return <Root>{text}</Root>;
};
