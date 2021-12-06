import React, { useState, useEffect, useRef } from "react";
import sample from "lodash/sample";

import { fabric } from "fabric";
import { FabricJSCanvas, FabricJSEditor, useFabricJSEditor } from "fabricjs-react";

import GenericButton from "../components/elements/GenericButton/GenericButton";
import { bases, eyes, mouths } from "../utils/nft-pieces-data";
import type { NFT, NFTPiece } from "../utils/nft-pieces-data";

import type { NextPage } from "next";

interface CanvasImageDict {
	[k: string]: fabric.Image | null;
}

const Generate: NextPage = () => {
	const { editor, onReady } = useFabricJSEditor();
	const [nft, setNFT] = useState<NFT | null>(null);
	const [image, setImage] = useState<string | null>(null);

	useEffect(() => {
		if (nft && editor) {
			createCanvas(nft, editor).then((canvasImages) => {
				console.log(`Images placed`);

				canvasImages["base"]?.sendToBack();
				canvasImages["mouth"]?.bringToFront();
				canvasImages["eyes"]?.bringToFront();

				editor.canvas.renderAll()

				let results = editor.canvas.toDataURL({
					format: "png",
				});

				setImage(results);
				console.log(`Set Images`);

			});
		}
	}, [nft]);

	function createCanvas(nft: NFT, editor: FabricJSEditor) {
		return new Promise<CanvasImageDict>((resolve, reject) => {
			editor.canvas.clear();

			let pieces = ["base", "mouth", "eyes"];
			let i = 0;

			let canvasImg: CanvasImageDict = {
				base: null,
				mouth: null,
				eyes: null,
			};

			pieces.forEach((key) => {
				console.log(`${key}`);

				fabric.Image.fromURL(
					nft[key].url,
					function (oImg) {
						let pieceKey = key;

						console.log(`Placing: ${pieceKey}`);

						editor.canvas.add(oImg);
						canvasImg[pieceKey] = oImg;

						i++;

						if (i === pieces.length) {
							console.log(`Resolve`);
							resolve(canvasImg);
						}
					},
					{
						width: 500,
						height: 500,
					}
				);
			});
		});
	}

	function generateNFT() {
		let nftBase = sample(bases);
		let nftEyes = sample(eyes);
		let nftMouth = sample(mouths);

		if (nftBase && nftEyes && nftMouth) {
			setNFT({
				base: nftBase,
				eyes: nftEyes,
				mouth: nftMouth,
			});
		}
	}

	return (
		<div className="grid gap-4 grid-cols-12 px-4 py-6 sm:px-0">
			<div
				className="col-span-8 border-4 border-dashed border-gray-200 rounded-lg p-4"
				style={{ minHeight: "600px" }}
			>
				<FabricJSCanvas className="sample-canvas" onReady={onReady} />
			</div>
			<div className="col-span-4 border-4 border-dashed border-gray-200 rounded-lg p-4">
				<div className="flex gap-2 mb-2">
					<GenericButton onClick={generateNFT}>Generate</GenericButton>
					{image && (
						<a
							className="bg-green-600 py-2 px-4 rounded-lg text-white"
							href={image}
							download="nft.png"
						>
							Download
						</a>
					)}
				</div>
				{nft && (
					<ul>
						<li>Base: {nft.base.name}</li>
						<li>Eyes: {nft.eyes.name}</li>
						<li>Mouth: {nft.mouth.name}</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export default Generate;
