import React from "react";
import styled from "styled-components";
import { Color } from "../meta/Color.ts";
import { Button } from "../components/Button";

const Root = styled.div`
	width: 100%;
	height: min(100% - 4rem);
	display: flex;
	background-color: ${Color.Secondary};
`;
const UploadContainer = styled.div`
    width: 50%;
    height: min(100% - 4rem);
    justify-content:center;
    margin: 20px;
`

export const Settings = () => {
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
	return (
		<Root>
            <UploadContainer>
				<input id = "upload_avatar" type="file"  name="filename" />
				<Button onClickHandler={onClickSubmitHandler} text={"Upload"} type={"primary"} />
            </UploadContainer>
		</Root>
	);
};
