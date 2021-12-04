import React, { useEffect, useState } from "react";

interface CoinGeckoAPIResponse {
	[k: string]: {
		[j: string]: number;
	};
}

interface LocalPrice {
	price: number;
	expiration: number;
}

function useETHPrice() {
	const [price, setPrice] = useState<number | null>(() => {
		const localPrice = localStorage.getItem('ETHPrice');
		if(localPrice) {
			let priceData: LocalPrice = JSON.parse(localPrice);
			return (Date.now() < priceData.expiration) ? priceData.price : null;
		} else {
			return null;
		}
	});

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if(!price) {
			fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
				.then((res) => {
					if (res.status === 200) {
						return res.json();
					} else {
						setError("Failed to get ETH price");
					}
				})
				.then((data: CoinGeckoAPIResponse) => {
					localStorage.setItem('ETHPrice', JSON.stringify({
						price: 	data.ethereum.usd,
						expiration: Date.now() + ( 15 * 60 * 1000)
					}));

					setPrice(data.ethereum.usd);
					setError(null);
				})
				.catch((err) => {
					setError("Failed to get ETH price");
				});
		}
	}, []);

	return [price, error];
}

export default useETHPrice;
