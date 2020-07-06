import React from "react";
import { Navbar, Nav, Button, FormControl, Form } from "react-bootstrap";

export default function Navigation() {
	return (
		<div>
			<Navbar bg="light" expand="md">
				<Navbar.Brand href="/">WorldTour</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/create">Create</Nav.Link>
					</Nav>
					{/* <Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form> */}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
