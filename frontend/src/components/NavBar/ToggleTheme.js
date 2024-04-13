//ref: https://mui.com/material-ui/customization/dark-mode/

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

// Create a context to hold the color mode
export const ColorModeContext = React.createContext({
	toggleColorMode: () => {}, // default value
});

// Create a component that will wrap the app and provide the color mode context
// we use children to wrap the app with the color mode context provider
export default function ToggleColorMode({ children }) {
	// create a state to hold the color mode and a function to update it
	// 1st line is to create a state to hold the color mode to light
	const [mode, setMode] = React.useState("light");
	// 2nd line is to create a function to update the color mode
	// .memo = to memorize the value of the function
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
