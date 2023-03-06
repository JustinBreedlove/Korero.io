import React from "react";
import styled from "styled-components";


export const Divider = ({size}) => {
	const Root = styled.div`
        height: min(${size}rem);
	`;

	return <Root/>;
};
