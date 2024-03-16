import React from "react";
import { TextField, Grid } from "@mui/material";

const SearchBar = ({ search, setSearch }) => {
	const handleClick = (event) => {
		event.stopPropagation();
	};

	return (
		<Grid container justifyContent="flex-end">
			<TextField
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				variant="outlined"
				size="medium"
				label="Search trips..."
				onClick={handleClick}
			/>
		</Grid>
	);
};

export default SearchBar;
