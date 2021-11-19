import React, { FunctionComponent, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import classNames from "classnames";

import { useRouter } from "next/router";
import Link from "next/link";

import User from "../../elements/User/User";
import SaleActiveIndicator from "../../elements/SaleActiveIndicator/SaleActiveIndicator";

interface navigationItem {
	name: string;
	href: string;
}

const navigation: navigationItem[] = [
	{ name: "Mint", href: "/mint" },
	{ name: "View", href: "/view" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "Admin", href: "/admin" },
];

interface AppProps {}

const App: FunctionComponent<AppProps> = ({ children }) => {
	const router = useRouter();

	const currentNav = navigation.reduce<null | navigationItem>((carry, item) => {
		if (item.href === router.pathname) {
			carry = item;
		}

		return carry;
	}, null);

	return (
		<>
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between h-16">
								<div className="flex items-center">
									<div className="flex items-baseline space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												aria-current={
													item.href === location.pathname
														? "page"
														: undefined
												}
											>
												<a
													className={classNames(
														item.href === location.pathname
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"px-3 py-2 rounded-md text-sm font-medium"
													)}
												>
													{item.name}
												</a>
											</Link>
										))}
									</div>
								</div>
								<div className="flex items-center gap-4">
									<SaleActiveIndicator />
									<User />
								</div>
							</div>
						</div>
					</>
				)}
			</Disclosure>

			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">
						{currentNav && currentNav.name}
					</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
			</main>
		</>
	);
};

export default App;
