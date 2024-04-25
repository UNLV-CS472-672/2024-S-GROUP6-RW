import reportWebVitals from "../reportWebVitals";

// Mock the web-vitals module
jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

const { getCLS, getFID, getFCP, getLCP, getTTFB } = require("web-vitals");

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

it("calls web vitals functions when a valid callback is provided", async () => {
  const onPerfEntry = jest.fn();
  reportWebVitals(onPerfEntry);

  // Wait for all promises to resolve
  await flushPromises();

  expect(getCLS).toHaveBeenCalledWith(onPerfEntry);
  expect(getFID).toHaveBeenCalledWith(onPerfEntry);
  expect(getFCP).toHaveBeenCalledWith(onPerfEntry);
  expect(getLCP).toHaveBeenCalledWith(onPerfEntry);
  expect(getTTFB).toHaveBeenCalledWith(onPerfEntry);
});

it("does not call web vitals functions when null is provided", async () => {
  reportWebVitals(null);
  await new Promise(process.nextTick); // Simulate next tick

  expect(getCLS).not.toHaveBeenCalled();
  expect(getFID).not.toHaveBeenCalled();
  expect(getFCP).not.toHaveBeenCalled();
  expect(getLCP).not.toHaveBeenCalled();
  expect(getTTFB).not.toHaveBeenCalled();
});

it("does not call web vitals functions when a non-function is provided", async () => {
  reportWebVitals({});
  await new Promise(process.nextTick); // Simulate next tick

  expect(getCLS).not.toHaveBeenCalled();
  expect(getFID).not.toHaveBeenCalled();
  expect(getFCP).not.toHaveBeenCalled();
  expect(getLCP).not.toHaveBeenCalled();
  expect(getTTFB).not.toHaveBeenCalled();
});

it("does nothing when no arguments are passed", async () => {
  reportWebVitals();

  await flushPromises();

  expect(getCLS).not.toHaveBeenCalled();
  expect(getFID).not.toHaveBeenCalled();
  expect(getFCP).not.toHaveBeenCalled();
  expect(getLCP).not.toHaveBeenCalled();
  expect(getTTFB).not.toHaveBeenCalled();
});

it('calls all web vitals functions when onPerfEntry is a function', async () => {
    const onPerfEntry = jest.fn(); // Mock function to pass as argument
    reportWebVitals(onPerfEntry);
  
    await new Promise(resolve => setTimeout(resolve, 0)); // Flush all promises
  
    expect(getCLS).toHaveBeenCalledWith(onPerfEntry);
    expect(getFID).toHaveBeenCalledWith(onPerfEntry);
    expect(getFCP).toHaveBeenCalledWith(onPerfEntry);
    expect(getLCP).toHaveBeenCalledWith(onPerfEntry);
    expect(getTTFB).toHaveBeenCalledWith(onPerfEntry);
  });
  