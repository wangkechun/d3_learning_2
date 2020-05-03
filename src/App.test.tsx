import React from "react";
import { render } from "@testing-library/react";
import App, { HexagonChart } from "./App";

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("hello", () => {
  const c = new HexagonChart();
  c.render(null as any);
});
