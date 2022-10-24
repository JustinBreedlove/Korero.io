import React, { useEffect, useState } from "react";
import  {useLocalStorage}  from "usehooks-ts"
import styled from "styled-components";
import { Chat } from "../containers/Chat";

export const Inbox = () => {
    const [messages, setMessages] = useLocalStorage('korero_msgs',[])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() =>
    {
        // setMessages([messages[0],...messages]);
        setIsLoading(false)
    }, [])

    const Root = styled.div`
		width: 100%;
        height: min(100% - 4rem);
	`;


    const ChatsContainer = styled.div`
        overflow-y: scroll;
		max-width: 30%;
        height: 100%;

    `
    const FocusedChat = styled.div`

    `
    console.log(messages)
	return (<Root>
        <ChatsContainer>
            {!isLoading ? messages.map((msg) => <Chat latest_msg = {msg.latest_msg} pic = {msg.his_b64_pfp}></Chat>)  : console.log("test")}
        </ChatsContainer>
        <FocusedChat>
            
        </FocusedChat>
    </Root>);
};
