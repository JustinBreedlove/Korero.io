import React from "react";
import styled from "styled-components";

export const ProfilePic = ({src, label}) => {
	const Root = styled.div`
        border-radius: 100%;
		display:flex;
		
	`;
	const Img = styled.img`
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
	return <Root><Img src ={src}  width = {"50px"}height = {"50px"} />{label}</Root>;
};
