import React from "react";
import styled from "styled-components";

export const ProfilePic = ({src}) => {
	const Root = styled.img`
        border-radius: 100%;
	`;

	if (!src)
	{
		src = `/users/pfp/${src}`
	}
	else
	{
		src = "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
	}
	return <Root src ={src}  width = {"50px"}height = {"50px"}></Root>;
};
