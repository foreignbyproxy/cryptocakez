import GeoPattern from "geopattern";
import faker from "faker";
import fs from "node:fs";

// for (let index = 0; index < 100; index++) {
// 	let seed = faker.finance.ethereumAddress();
// 	let svg = GeoPattern.generate(seed);

// 	let name = `pattern-${index}`;

// 	// debugger;

// 	fs.writeFileSync(`public/images/${name}.svg`, svg.toSvg());
// 	fs.writeFileSync(
// 		`public/meta/${name}.json`,
// 		JSON.stringify({
// 			name: `Pattern ${index}`,
// 			description: `A ${svg.color} and ${svg.opts.baseColor} pattern generated with the seed ${seed}`,
// 			//Link to image
// 			image: `https://cryptocakez.vercel.app/images/${name}.svg`,
// 			//Link to view on the website
// 			external_url: `https://cryptocakez.vercel.app/view?tokenid=${index}`,
// 			attributes: [
// 				{
// 					trait_type: "Color #1",
// 					value: svg.color,
// 				},
// 				{
// 					trait_type: "Color #2",
// 					value: svg.opts.baseColor,
// 				},
// 			],
// 		})
// 	);
// }
