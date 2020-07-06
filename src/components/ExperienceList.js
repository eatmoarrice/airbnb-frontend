import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ExperienceList(props) {
	const [pageNum, setPageNum] = useState(1);
	const [experiences, setExperiences] = useState([]);
	const goNextPage = () => {
		setPageNum(pageNum + 1);
	};
	const goPreviousPage = () => {
		setPageNum(pageNum - 1);
	};
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`https://airbnb-server-backend.herokuapp.com/experiences?page=${pageNum}`);
			const resData = await data.json();
			console.log(resData);
			setExperiences(resData.data);
		}
		fetchData();
	}, [pageNum]);
	if (!experiences) {
		return <div>loading</div>;
	}
	return (
		<div>
			<div className="d-flex justify-content-between">
				<a href="#" onClick={() => goPreviousPage()}>
					Previous Page
				</a>
				<a href="#" onClick={() => goNextPage()}>
					Next Page
				</a>
			</div>

			<h1 className="text-center experiences">Experiences: </h1>
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

const Experience = ({ title, images, description, country, duration, price, _id }) => (
	<Link to={`/experiences/${_id}`}>
		<div className="tourCard">
			<div className="d-flex justify-content-center">
				<div className="image-limit" style={{ backgroundImage: `url(${images[0]})` }}></div>
			</div>
			<p className="font-weight-bold mb-1">{country.toUpperCase()}</p>
			<p className="mb-0">{title}</p>
			<p className="mb-0">Starting from: ${price}</p>
			<p className="mb-0">{roundToTwo(duration / 60)} hour</p>
		</div>
	</Link>
);
