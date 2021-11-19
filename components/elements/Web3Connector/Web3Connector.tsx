import React, { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
	NoEthereumProviderError,
	UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

import { connectorsByName } from "../../../utils/Web3Connectors";
import GenericButton from "../../elements/GenericButton/GenericButton";

interface Web3ConnectorProps {
	onConnect?: () => void;
}

const Web3Connector = ({ onConnect }: Web3ConnectorProps) => {
	const Web3Context = useWeb3React();
	const { connector, library, chainId, account, activate, deactivate, active, error } =
		Web3Context;

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = useState<any>();
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	return (
		<div className="">
			<GenericButton
				onClick={() => {
					setActivatingConnector(connectorsByName.Injected);
					activate(connectorsByName.Injected);
				}}
			>
				Connect
			</GenericButton>
		</div>
	);
};

function getErrorMessage(error: Error) {
	if (error instanceof NoEthereumProviderError) {
		return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network.";
	} else if (error instanceof UserRejectedRequestErrorInjected) {
		return "Please authorize this website to access your Ethereum account.";
	} else {
		console.error(error);
		return "An unknown error occurred. Check the console for more details.";
	}
}

export default Web3Connector;
