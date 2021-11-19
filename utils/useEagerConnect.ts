import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "./Web3Connectors";

export default function useEagerConnect() {
	const { activate, active } = useWeb3React();

	const [tried, setTried] = useState(false);

	useEffect(() => {
		console.log("Checking if MetaMask is working");

		injected.isAuthorized().then((isAuthorized: boolean) => {
			if (isAuthorized) {
				console.log("MetaMask is authorized");
				activate(injected, undefined, true).catch(() => {
					setTried(true);
				});
			} else {
				console.log("MetaMask is not authorized");
				setTried(true);
			}
		});
	}, []); // intentionally only running on mount (make sure it's only mounted once :))

	// if the connection worked, wait until we get confirmation of that to flip the flag
	useEffect(() => {
		if (!tried && active) {
			setTried(true);
		}
	}, [tried, active]);

	return tried;
}
