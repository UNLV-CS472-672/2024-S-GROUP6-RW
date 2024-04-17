export const names = [
	"Julia",
	"Chris",
	"Alex",
	"Taylor",
	"Jordan",
	"Casey",
	"Jamie",
	"Morgan",
	"Cameron",
	"Riley",
];

export const categories = [
	"Rent",
	"Groceries",
	"Utilities",
	"Entertainment",
	"Others",
	"Unknown",
].sort();

// Function to generate a random date between two dates
// ai-gen start (ChatGPT-4.0, 0)
export function randomDate(start, end) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	);
}
// ai-gen end

//Func to gen to avoid id conflict
export function generateNewId() {
	return Math.floor(Math.random() * 1000);
}

// Function to generate initial data
export function generateData(sudoUser) {
	let activitiesData = {};

	// For each category, generate a random number of activities
	// ai-gen start (ChatGPT-4.0, 1)
	categories.forEach((category) => {
		activitiesData[category] = Array.from(
			{ length: Math.floor(Math.random() * 10) },
			(_, id) => {
				let description = `${category} ${id}`;
				let payer, payee;
				const type = ["owe", "paid", "get back"][
					Math.floor(Math.random() * 3)
				];
				// ai gen end

				// Depending on the type, assign payer and payee
				if (type === "paid") {
					payer = sudoUser;
					do {
						payee = names[Math.floor(Math.random() * names.length)];
					} while (payer === payee);
				} else {
					payee = sudoUser;
					do {
						payer = names[Math.floor(Math.random() * names.length)];
					} while (payer === payee);
				}

				const amount = (Math.random() * 100).toFixed(2);
				const date = randomDate(new Date(2023, 10, 1), new Date());
				const name = description;

				// Return the new activity
				return {
					id,
					date: date.toDateString(),
					payer,
					payee,
					amount,
					type,
					name,
					description,
				};
			}
		);
	});

	return activitiesData;
}
