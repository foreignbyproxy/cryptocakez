import React, { FunctionComponent } from "react";

interface LabelProps {
	htmlFor: string;
	children: string;
}

const Label: FunctionComponent<LabelProps> = ({ htmlFor, children }) => {
	return (
		<label className="block font-semibold" htmlFor={htmlFor}>
			{children}
		</label>
	);
};

export default Label;
