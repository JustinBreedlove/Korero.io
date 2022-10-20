import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const Spacer = ({size}) => {
	const Root = styled.div`
        border-radius: 100%;
        width: min(100% - ${size}rem, 45%);

	`;

	return <Root/>;
};
