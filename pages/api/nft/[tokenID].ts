// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { tokenID } = req.query;

	const url = `${process.env.NEXT_PUBLIC_BASEURL}/meta/pattern-${tokenID}.json`;

	const meta = await fetch(url)
		.then((res) => {
			if (res?.status === 200) {
				return res.json();
			}
		})
		.catch((err) => {
			return res.status(404).end();
		});

	res.status(200).json(meta);
}
