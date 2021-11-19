import dotenv from 'dotenv';
dotenv.config({
	path: '.env.local'
});

import fetch from 'node-fetch';
import GeoPattern from "geopattern";
import faker from "faker";
import fs from "node:fs";
import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({ token: process.env.NFTSTORAGE_API_KEY });

// for (let index = 0; index < 1; index++) {
// 	let seed = faker.finance.ethereumAddress();
// 	let svg = GeoPattern.generate(seed).toSvg();


// 	const metadata = await client.store({
// 		name: `pattern-${index}`,
// 		description: seed,
// 		image: new File(
// 			[
// 				svg
// 			],
// 			`pattern-${index}.svg`,
// 			{ type: "image/svg+xml" }
// 		),
// 	});

// 	debugger;
// }
