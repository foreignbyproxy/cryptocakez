import React, { useState } from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";

import Label from "../../elements/FormLabel/FormLabel";

import { NFTMetaData } from "../../../utils/types";

interface Props {
	afterSubmit: (tokenID: string) => void;
}

interface FormValues {
	id: string;
}

function FormGetNFTByID({ afterSubmit }: Props) {
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const initialValues: FormValues = {
		id: "",
	};

	async function handleOnSubmit(values: FormValues, actions: FormikHelpers<FormValues>) {
		setError("");
		setMessage("");

		if (!values.id) {
			setError("No id submitted");
			actions.setSubmitting(false);
			return;
		}

		if (afterSubmit) {
			afterSubmit(values.id);
		}

		actions.setSubmitting(false);
		actions.resetForm();
	}

	return (
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
	);
}

export default FormGetNFTByID;
