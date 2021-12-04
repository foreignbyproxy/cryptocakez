import React, { FunctionComponent, useMemo } from "react";

interface ShortAddressProps {
	address: string;
}

export function formatShortAddress(address: string) {
	return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

const ShortAddress: FunctionComponent<ShortAddressProps> = ({ address }) => {
	const shortAddress = useMemo(() => formatShortAddress(address), [address]);
	return <p>{shortAddress}</p>;
};

export default ShortAddress;
