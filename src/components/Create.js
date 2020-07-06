import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Create() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [country, setCountry] = useState("");
	const [duration, setDuration] = useState(0);
	const [price, setPrice] = useState(0);
	const [groupSize, setSize] = useState(1);
	const [images, setImages] = useState("");
	let history = useHistory();

	const createExperience = async (e) => {
		e.preventDefault();
		let experienceData = {
			title,
			country,
			price,
			duration,
			images,
			groupSize
		};

		if (description) experienceData.description = description;

		console.log(experienceData);
		const newExperience = await fetch("https://airbnb-server-backend.herokuapp.com/experiences", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(experienceData)
		});
		const content = await newExperience.json();
		console.log(content);
		history.push(`/experiences/${content.data._id}`);
	};

	return (
		<div className="text-left">
			<div className="container d-flex justify-content-center">
				<div className="expForm">
					<label for="title">Title</label>
					<form onSubmit={createExperience}>
						<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
						<br />

						<label for="description">Description</label>
						{/* <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
						<textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
						<br />

						<label for="country">Country</label>
						<input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
						<br />

						<label for="duration">Duration</label>
						<input type="text" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
						<br />

						<label for="size">Group size</label>
						<input type="text" name="size" value={groupSize} onChange={(e) => setSize(e.target.value)} />
						<br />

						<label for="price">Price</label>
						<input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
						<br />

						<label for="pictureUrl">Picture URL</label>
						<input type="text" name="pictureUrl" value={images} onChange={(e) => setImages(e.target.value)} />
						<br />
						<input type="submit" value="Create Experience" />
					</form>
				</div>
			</div>
		</div>
	);
}
