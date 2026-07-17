import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { App } from "../../src/App";

const routes = [
  ["/quality", "Quality, made observable."],
  ["/architecture", "AI outside. Safety inside."],
  ["/security", "The model proposes. It never commands."],
  ["/testing", "Test the decision, not the screenshot."],
  ["/accessibility", "Accessibility is a UI standard—and an operational veto."],
  ["/challenge-alignment", "Nothing in the brief is implicit."],
] as const;

describe("visible evidence routes", () => {
  it.each(routes)(
    "renders %s with a single explicit page identity",
    async (path, heading) => {
      window.history.replaceState(null, "", path);
      render(<App />);

      expect(
        await screen.findByRole("heading", { level: 1, name: heading }),
      ).toBeVisible();
    },
  );

  it("navigates without a reload and updates current-page state", async () => {
    window.history.replaceState(null, "", "/");
    render(<App />);

    await userEvent.click(await screen.findByRole("link", { name: "Quality" }));

    expect(
      await screen.findByRole("heading", { name: "Quality, made observable." }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Quality" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("main")).toHaveFocus();
    expect(document.title).toBe("Quality dashboard — StadiumPulse-90");
  });

  it("provides a safe recovery route for an unknown path", async () => {
    window.history.replaceState(null, "", "/missing-evidence");
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "The requested evidence page is unavailable.",
      }),
    ).toBeVisible();
    expect(document.title).toBe("Not found — StadiumPulse-90");
  });
});
