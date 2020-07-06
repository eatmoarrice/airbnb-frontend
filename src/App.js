import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExperienceList from "./components/ExperienceList";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./components/Create";
import ExperiencePage from "./components/ExperiencePage";
import Edit from "./components/Edit";

function App() {
	return (
		<div className="App">
			<Router>
				<Navigation />
				<Route path="/" exact>
					<ExperienceList />
				</Route>
				<Route path="/experiences/:id" exact render={(props) => <ExperiencePage {...props} />} />
				<Route path="/experiences/:id/edit" exact render={(props) => <Edit {...props} />} />
				<Route path="/create" exact component={Create} />
			</Router>
		</div>
	);
}

export default App;
