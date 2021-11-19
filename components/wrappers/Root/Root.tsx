import React, { FunctionComponent } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Web3Provider from "../../context/Web3Provider/Web3Provider";
import useEagerConnect from "../../../utils/useEagerConnect";

import App from "../App/App";

interface RootProps {}

const Root: FunctionComponent<RootProps> = () => {
	const hasTried = useEagerConnect();

	return (
		<Router>
			<Web3Provider>{hasTried && <App />}</Web3Provider>
		</Router>
	);
};

export default Root;
