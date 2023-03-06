import React from "react";
import styled from "styled-components";


export const Spacer = ({size}) => {
	const Root = styled.div`
        border-radius: 100%;
        width: min(100% - ${size}rem, 45%);

	`;

	return <Root/>;
};
