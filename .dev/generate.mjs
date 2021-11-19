import GeoPattern from "geopattern";
import faker from "faker";
import fs from "node:fs";

for (let index = 0; index < 100; index++) {
	let seed = faker.finance.ethereumAddress();
	let svg = GeoPattern.generate(seed).toString();

	fs.writeFileSync(`public/images/pattern-${index}.svg`, svg);
	fs.writeFileSync(
		`public/meta/pattern-${index}.json`,
		JSON.stringify({
			seed,
			image: `/images/pattern-${index}.svg`,
		})
	);
}
