import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App.js";

describe("observatory dashboard", () => {
  it("filters the accessible read model by route", () => { render(<App />); fireEvent.change(screen.getByLabelText("Route"), { target: { value: "/checkout" } }); expect(screen.getByRole("status")).toHaveTextContent("2 observations"); expect(screen.getByRole("heading", { name: "LCP" })).toBeInTheDocument(); });
});
