import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
let description = "";
export default function ExperiencePage(props) {
	const id = props.match.params.id;
	const [experience, setExperience] = useState(null);

	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
	}

	useEffect(() => {
		async function fetchData() {
			const data = await fetch(`https://airbnb-server-backend.herokuapp.com/experiences/${id}`);
			const resData = await data.json();
			console.log(resData);
			// description = resData.data.description.replace(/\n/g, "<br />");
			// console.log(description);
			setExperience(resData.data);
		}
		fetchData();
	}, []);
	if (!experience) {
		return <div>loading</div>;
	}
	return (
		<div>
			<div className="bg-black white p-2 position-relative">
				<Link to={`/experiences/${id}/edit`}>
					<button className="btn btn-success edit">Edit this page</button>
				</Link>
				<div className="container">
					<div className="d-flex photoGrid">
						<div className="bigPhoto" style={{ backgroundImage: `url(${experience.images[0]})`, backgroundSize: "cover" }}></div>
						<div className="bigPhoto" style={{ backgroundImage: `url(${experience.images[1]})`, backgroundSize: "cover" }}></div>

						<div className="d-flex smallPhoto flex-column smallPhotos">
							<div className="smallPhoto" style={{ backgroundImage: `url(${experience.images[2]})`, backgroundSize: "cover" }}></div>
							<div className="smallPhoto" style={{ backgroundImage: `url(${experience.images[3]})`, backgroundSize: "cover" }}></div>
						</div>
						<div className="bigPhoto" style={{ backgroundImage: `url(${experience.images[4]})`, backgroundSize: "cover" }}></div>
					</div>

					<div className="row">
						<div className="col-md-4 d-flex flex-column justify-content-center text-left">
							<h3 className="mini-title">{experience.title}</h3>
							<div className="mini-country">{experience.country}</div>
						</div>
						<div className="col-md-8">
							<hr />
							<i className="fas fa-mobile-alt"></i>
							<span> Book and join this experience from your computer, phone, or tablet.</span>
							<hr />
							<div className="d-flex">
								<div className="dflex flex-column text-left tour-feature">
									<i className="fas fa-clock mb-3"></i>
									<p className="thin-text mb-0">Duration</p>
									<p>{roundToTwo(experience.duration / 60)} hours</p>
								</div>
								<div className="dflex flex-column text-left tour-feature">
									<i className="fas fa-users mb-3"></i>
									<p className="thin-text mb-0">Group size</p>
									<p>Up to {experience.groupSize} people</p>
								</div>
								<div className="dflex flex-column text-left tour-feature">
									<i className="fas fa-comments mb-3"></i>
									<p className="thin-text mb-0">Hosted in</p>
									<p>{experience.language}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-2 text-left">
				<div className="container p-5">
					<div className="row">
						<div className="col-md-4">
							<h2>What you'll do</h2>
						</div>
						<div className="col-md-8">
							<div className="description">{ReactHtmlParser(description)}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-2 bg-gray text-left">
				<div className="container my-5 py-5">
					<div className="row">
						<div className="col-md-4">
							<h2>Try something new together</h2>
						</div>
						<div className="col-md-8">
							<div className="d-flex justify-content-between">
								<div className="dflex flex-column text-left try-new">
									<i className="far fa-smile fa-2x mb-3"></i>
									<p className="bold-text">Thoughtful hosts</p>
									<p>Get to know hosts who share their expertise and a window to their world.</p>
								</div>
								<div className="dflex flex-column text-left try-new">
									<i className="fas fa-user-friends fa-2x mb-3"></i>
									<p className="bold-text">Small group activities</p>
									<p>Meet people from all over the world while learning something new together.</p>
								</div>
								<div className="dflex flex-column text-left try-new">
									<i className="fas fa-laptop fa-2x mb-3"></i>
									<p className="bold-text">Simple and global</p>
									<p>Join easily and participate from home without a lot of prep.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-2 text-left">
				<div className="container p-5">
					<div className="row">
						<div className="col-md-4">
							<h2>What to bring</h2>
						</div>
						<div className="col-md-8">
							<div className="description">
								{description.items
									? description.items.map((item) => <span className="badge badge-warning">{item}</span>)
									: "Just yourself! This experience only requires a willingness to participate."}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-2 text-left">
				<div className="container p-5">
					<div className="row">
						<div className="col-md-4">
							<h2>What to bring</h2>
						</div>
						<div className="col-md-8">
							<div className="description">
								{description.items
									? description.items.map((item) => <span className="badge badge-warning">{item}</span>)
									: "Just yourself! This experience only requires a willingness to participate."}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
