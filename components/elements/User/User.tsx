import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import makeBlockie from "ethereum-blockies-base64";
import classNames from "classnames";

import styles from "./User.module.scss";

import { formatAddress } from "../../../utils/functions";

import Web3Connector from "../Web3Connector/Web3Connector";

const User = () => {
	const Web3Context = useWeb3React();
	const [displayENS, setENS] = useState<string | null>(null);
	useEffect(() => {
		if (
			Web3Context.account &&
			Web3Context.chainId &&
			![1337, 31337].includes(Web3Context.chainId)
		) {
			console.log("Looking up ENS name for address");

			Web3Context.library.lookupAddress(Web3Context.account).then((ens: string | null) => {
				setENS(ens);
			});
		}
	}, [Web3Context.account]);

	if (!Web3Context.active || !Web3Context.account) {
		return <Web3Connector />;
	}

	const icon = makeBlockie(Web3Context.account);

	return (
		<div className={styles.User}>
			<div className={styles.top}>
				<img className={styles.blockie} src={icon} />
				<div className={styles.addressWrapper} title={Web3Context.account}>
					{displayENS && <p className={styles.ens}>{displayENS}</p>}
					<p className={styles.address}>{formatAddress(Web3Context.account)}</p>
				</div>
			</div>
		</div>
	);
};

export default User;
