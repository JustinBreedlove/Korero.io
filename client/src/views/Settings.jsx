import React, {useState} from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { Button } from "../components/Button";
import {Divider} from "../components/Divider"
import {Input} from "../components/Input"

const Root = styled.div`
	width: 100%;
	height: min(100% - 4rem);
	display: flex;
	background-color: ${Color.Secondary};
    justify-content: center;
`;
const UploadContainer = styled.div`
    width: 50%;
    height: 200px;
    justify-content:center;
    margin: 20px;

`
const Spacer = styled.div`
    height: 10px;
`

const Label = styled.label`
    text-align: center;
    background-color: ${Color.Accent3};
    &:hover {
        background-color: ${Color.Accent1};
        transition-duration: 250ms;
    }
    line-height: 75px;
    width: 100%
`
const LabelContainer = styled.div`
    display: flex;
    height: 75px;

`

export const Settings = () => {
    const [fileName, setFileName] = useState()
	const onClickSubmitHandler = (e) => {
        e.preventDefault()
		var file = document.getElementById('upload_avatar').files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
            
            let body = {
                upload: reader.result
            }
            console.log(reader.result)
            fetch(`/users/upload/pfp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
			body: JSON.stringify(body)

            }).then((res) => {
                if (res.ok)
                {
                    location.reload()
                }
            });
        };
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

    const onClickChangePasswordHandler = () =>
    {
        window.location.replace(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/forgot`)
    }
    const onChangeInputHandler = (e) =>
    {
        let path = e.target.value.split("\\")
        setFileName(path[path.length -1])
    }
	return (
		<Root>
            <UploadContainer>
				<input style = {{"opacity": "0"}}id = "upload_avatar" type="file"  name="filename" onChange={onChangeInputHandler}/>
                <LabelContainer>
                    <Label for = "upload_avatar" >Select an Avatar</Label>

                </LabelContainer>
                <p>{fileName}</p>
                <Spacer/>
				<Button onClickHandler={onClickSubmitHandler} text={"Upload"} type={"primary"} />
                <Spacer/>
                <Button onClickHandler={onClickChangePasswordHandler} text={"Change Password"} type={"Secondary"} />
            </UploadContainer>
		</Root>
	);
};
