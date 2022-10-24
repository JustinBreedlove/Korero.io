import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Divider = ({size}) => {
	const Root = styled.div`
        height: min(${size}rem);
	`;

	return <Root/>;
};
