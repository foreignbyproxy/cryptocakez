import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import getContract from "../../../utils/getContract";

type SaleStatus = "active" | "inactive";

function SaleActiveIndicator() {
	const [status, setStatus] = useState<SaleStatus | null>(null);
	const web3React = useWeb3React();

	useEffect(() => {
		if (web3React.active && web3React.library) {
			const signer = web3React.library.getSigner();
			const contract = getContract(signer);

			contract.saleIsActive().then((data: boolean) => {
				setStatus(data ? "active" : "inactive");
			});
		}
	}, [web3React.active, web3React.library]);

	if (!status) {
		return null;
	}

	let color = "green-500";
	let shadowColor = "rgba(16, 185, 129, 1)";
	if (status === "inactive") {
		color = "red-600";
		shadowColor = "rgba(220, 38, 38, 1)";
	}

	return (
		<div className={`flex items-center gap-2 rounded-full py-1 px-4 bg-gray-700`}>
			<span className={`text-${color} text-sm font-semibold`} style={{ textShadow: `0px 0px 9px ${shadowColor}` }}>
				{status.toLocaleUpperCase()}
			</span>
			<span
				className={`inline-block rounded-full w-3 h-3 bg-${color}`}
				style={{ boxShadow: `0px 0px 9px ${shadowColor}` }}
			></span>
		</div>
	);
}

export default SaleActiveIndicator;
