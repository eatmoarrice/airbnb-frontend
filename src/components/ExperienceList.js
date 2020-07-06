import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ExperienceList() {
	const [experiences, setExperiences] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const data = await fetch("http://localhost:5000/experiences");
			const resData = await data.json();
			console.log(resData);
			setExperiences(resData.data);
		}
		fetchData();
	}, []);
	if (!experiences) {
		return <div>loading</div>;
	}
	return (
		<div>
			<h1>Experiences: </h1>
			<hr></hr>
			<div className="d-flex flex-wrap justify-content-around">
				{experiences.map((e) => (
					<Experience {...e} />
				))}
			</div>
		</div>
	);
}

function roundToTwo(num) {
	return +(Math.round(num + "e+2") + "e-2");
}

const Experience = ({ title, images, description, country, duration, rate, _id }) => (
	<Link to={`/experiences/${_id}`}>
		<div className="tourCard">
			<h4>{title}</h4>
			<h5>{country}</h5>
			<div className="d-flex justify-content-center">
				<div className="image-limit">
					<img width="400px" src={images} />
				</div>
			</div>
			{/* <h4>Starting from: ${rate}</h4> */}
			<h4>{roundToTwo(duration / 60)} hour</h4>
		</div>
	</Link>
);
