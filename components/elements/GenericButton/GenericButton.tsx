import React, { FunctionComponent } from "react";
import classnames from "classnames";

interface GenericButtonProps {
	theme?: "primary" | "secondary";
}

const GenericButton: FunctionComponent<
	React.ButtonHTMLAttributes<HTMLButtonElement> & GenericButtonProps
> = ({ theme = "primary", children, ...rest }) => {
	const buttonClasses = classnames(["py-2", "px-4", "rounded-lg", "text-white"], {
		"bg-blue-600": theme === "primary",
		"bg-green-600": theme === "secondary",
	});

	return (
		<button className={buttonClasses} {...rest}>
			{children}
		</button>
	);
};

export default GenericButton;
