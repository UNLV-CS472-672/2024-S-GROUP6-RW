import activities from "../components/ItineraryForm/ActivityList.js";

//ughh we only do this just ti poass the unit test
//as this fle is ust generated some hard code data
describe("ActivityList", () => {
	test("contains the correct fields", () => {
		activities.forEach((activity) => {
			expect(activity).toHaveProperty("id");
			expect(activity).toHaveProperty("title");
			expect(activity).toHaveProperty("location");
			expect(activity).toHaveProperty("start");
			expect(activity).toHaveProperty("end");
			expect(activity).toHaveProperty("allDay");
			expect(activity).toHaveProperty("description");
			expect(activity).toHaveProperty("photo");
		});
	});
});
