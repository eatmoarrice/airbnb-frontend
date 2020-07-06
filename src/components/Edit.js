import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Edit(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [language, setLanguage] = useState("");
	const [country, setCountry] = useState("");
	const [duration, setDuration] = useState(0);
	const [price, setPrice] = useState(0);
	const [groupSize, setSize] = useState(1);
	const [images, setImages] = useState("");
	const id = props.match.params.id;
	const [experience, setExperience] = useState(null);

	let history = useHistory();

	const updateExperience = async (e) => {
		e.preventDefault();
		let updatedExperience = {
			title,
			country,
			price,
			duration,
			images,
			description,
			language,
			groupSize
		};
		console.log(updatedExperience);
		let trimmedExperience = {};

		for (const [key, value] of Object.entries(experience)) {
			if (value != updatedExperience[key]) {
				console.log(value, updatedExperience[key]);
				trimmedExperience[key] = updatedExperience[key];
			}
		}
		console.log(trimmedExperience);
		const newExperience = await fetch(`http://localhost:5000/experiences/${id}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(trimmedExperience)
		});
		history.push(`/experiences/${id}`);
	};

	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`http://localhost:5000/experiences/${id}`);
			const resData = await data.json();
			setDescription(resData.data.description.replace(/\n/g, "<br />"));
			setExperience(resData.data);
			setDuration(resData.data.duration);
			setImages(resData.data.images);
			setPrice(resData.data.price);
			setTitle(resData.data.title);
			setLanguage(resData.data.language);
			setCountry(resData.data.country);
			setSize(resData.data.groupSize);
		}
		fetchData();
	}, []);

	return (
		<div className="text-left">
			<div className="container d-flex justify-content-center">
				<div className="expForm">
					<form onSubmit={updateExperience}>
						<label for="title">Title</label>
						<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
						<br />
						<label for="description" className="label-class">
							Description
						</label>
						<textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
						<br />

						<label for="country">Country</label>
						<input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)} />
						<br />

						<label for="country">Language</label>
						<input type="text" name="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
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
						<input type="submit" value="Update Experience" />
					</form>
				</div>
			</div>
		</div>
	);
}
