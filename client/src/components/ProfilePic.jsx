import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const ProfilePic = ({ src, label }) => {
	const [b64, setB64] = useState("default");

	const Root = styled.div`
		border-radius: 100%;
		display: flex;
	`;
	const Img = styled.img`
		border-radius: 100%;
	`;

	useEffect(() => {
		fetch(`/users/pfp/${src}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.body)
			.then((rb) => {
				const reader = rb.getReader();

				return new ReadableStream({
					start(controller) {
						function push() {
							reader.read().then(({ done, value }) => {
								if (done) {
									controller.close();
									return;
								}
								controller.enqueue(value);
								push();
							});
						}

						push();
					}
				});
			})
			.then((stream) => new Response(stream, { headers: { "Content-Type": "text/html" } }).text())
			.then((pfp) => {
				console.log(pfp);
				setB64(pfp);
			});
	}, []);

	return (
		<Root>
			<Img src={b64 === "default" ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png" : `data:image/png;base64, ${b64}`} width={"50px"} height={"50px"} />
			{label}
		</Root>
	);
};

