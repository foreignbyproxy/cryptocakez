import React, { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import Image from "next/image";

import Label from "../../elements/FormLabel/FormLabel";

import { getNFTByID } from "../../../utils/functions";
import { NFTMetaData } from "../../../utils/types";

interface FormValues {
	id: string;
}

function FormGetNFTByID() {
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [nft, setNFT] = useState<NFTMetaData | null>(null);

	const initialValues: FormValues = {
		id: "",
	};

	async function handleOnSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
		setError("");
		setMessage("");
		setNFT(null);

		if (!values.id) {
			setError("No id submitted");
			actions.setSubmitting(false);
			return;
		}

		const nft = await getNFTByID(values.id).catch((err) => {
			setError("There was an error fetching the NFT");
			return;
		});

		if (nft) {
			setNFT(nft);
		}

		actions.setSubmitting(false);
		actions.resetForm();
	}

	return (
		<div className="grid gap-4 grid-cols-12 px-4 py-6 sm:px-0">
			<div
				className="col-span-8 border-4 border-dashed border-gray-200 rounded-lg p-4"
				style={{ minHeight: "600px" }}
			>
				{nft && (
					<div>
						<p className="mb-4">Seed: {nft.seed}</p>
						<Image src={nft.image} layout="responsive" width="240" height="240" alt=""/>
					</div>
				)}
			</div>
			<div className="col-span-4 border-4 border-dashed border-gray-200 rounded-lg p-4">
				<Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
					{({ setFieldValue }) => (
						<Form>
							{message && <p className="text-green-500">{message}</p>}
							{error && <p className="text-red-500">{error}</p>}
							<div className="mb-2">
								<Label htmlFor="id">TokenID</Label>
								<Field className="w-full border border-black" id="id" name="id" />
							</div>
							<div className="flex gap-2">
								<button
									className="py-2 px-4 bg-blue-600 text-white rounded-lg"
									type="submit"
								>
									Submit
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default FormGetNFTByID;
