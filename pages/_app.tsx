import "../styles/globals.scss";
import 'tailwindcss/tailwind.css'

import Web3Provider from "../components/context/Web3Provider/Web3Provider";
import useEagerConnect from "../utils/useEagerConnect";

import App from "../components/wrappers/App/App";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	const hasTried = useEagerConnect();

	return (
		<Web3Provider>
			{hasTried && (
				<App>
					<Component {...pageProps} />
				</App>
			)}
		</Web3Provider>
	);
}

export default MyApp;
