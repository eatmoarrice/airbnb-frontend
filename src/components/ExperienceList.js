import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rheostat from "rheostat";

export default function ExperienceList(props) {
	const [pageNum, setPageNum] = useState(1);
	const [experiences, setExperiences] = useState([]);
	const [maxPageNum, setMaxPageNum] = useState(1);
	const [minPrice, setMinPrice] = useState(1);
	const [maxPrice, setMaxPrice] = useState(1000);
	const goNextPage = () => {
		setPageNum(pageNum + 1);
	};
	const goPreviousPage = () => {
		setPageNum(pageNum - 1);
	};

	const handleChange = (e) => {
		setMinPrice(e.values[0]);
		setMaxPrice(e.values[1]);
	};
	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`https://airbnb-server-backend.herokuapp.com/experiences?page=${pageNum}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
			const resData = await data.json();
			console.log(resData);
			setExperiences(resData.data);
			setMaxPageNum(resData.maxPageNum);
		}
		fetchData();
	}, [pageNum, minPrice, maxPrice]);
	if (!experiences) {
		return <div>loading</div>;
	}
	return (
		<div>
			<div className="d-flex justify-content-between">
				<button className="btn  btn-secondary btn-sm m-4" disabled={pageNum === 1} onClick={() => goPreviousPage()}>
					Previous Page
				</button>
				<button className="btn  btn-secondary btn-sm m-4" disabled={pageNum === maxPageNum} onClick={() => goNextPage()}>
					Next Page
				</button>
			</div>

			<h1 className="text-center experiences">Experiences: </h1>
			<div className="container">
				<Rheostat min={1} max={1000} values={[minPrice, maxPrice]} onChange={handleChange} />

				<div className="d-flex justify-content-between">
					<p>Min Price ${minPrice}</p>
					<p>Max Price ${maxPrice}</p>
				</div>
			</div>
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
