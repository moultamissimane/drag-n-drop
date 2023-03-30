import { ImageList } from "@mui/material";
import React, { useState } from "react";
import { useCallback } from "react";
import DropZone from "../components/DropZone";
import cuid from "cuid";
import "../App.css";


const LandingPage = () => {
	const [images, setImages] = useState([]);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.map((file, index) => {
			const reader = new FileReader();

			reader.onload = function (e) {
				setImages((prevState) => [
					...prevState,
					{ id: index, src: e.target.result },
				]);
			};

			reader.readAsDataURL(file);
			return file;
		});
	}, []);

	return (
		<div className="App">
			<DropZone onDrop={onDrop} />
			<ImageList images={images} />
		</div>
	);
};

export default LandingPage;
