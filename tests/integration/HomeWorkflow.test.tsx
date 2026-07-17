import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { App } from "../../src/App";

async function compileResponse(): Promise<void> {
  await userEvent.click(
    screen.getByRole("button", { name: "Compile guarded response" }),
  );
  await screen.findByRole("heading", {
    name: "What the model proposed. What code allowed.",
  });
}

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

describe("visible decision workflow", () => {
  it("explains the product purpose before any interaction", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "Stadium disruption in. Safe plan out.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText("AI stadium incident command by Shivam Maurya"),
    ).toBeVisible();
    expect(screen.getByText("Human approval required")).toBeVisible();
    expect(
      screen.getByRole("link", { name: /checks Testing evidence/ }),
    ).toHaveAttribute("href", "/quality");
    expect(
      screen.getByRole("link", {
        name: /Strict TypeScript Architecture evidence/,
      }),
    ).toHaveAttribute("href", "/architecture");
    expect(
      screen.getByRole("link", { name: /17 \/ 17 mapped Challenge alignment/ }),
    ).toHaveAttribute("href", "/challenge-alignment");
    for (const stage of [
      "Incident",
      "Analysis",
      "Safety validation",
      "Accessibility validation",
      "Risk scoring",
      "Human approval",
      "Command packet",
    ]) {
      expect(screen.getByText(stage)).toBeVisible();
    }
  });

  it("surfaces reasoning, confidence, constraints, validation, and rejected alternatives", async () => {
    render(<App />);
    await compileResponse();

    const explainability = screen
      .getByRole("heading", {
        name: "What the model proposed. What code allowed.",
      })
      .closest("section");
    expect(explainability).not.toBeNull();
    const panel = within(explainability as HTMLElement);

    expect(panel.getByText("Reasoning")).toBeVisible();
    expect(panel.getByText("medium")).toBeVisible();
    expect(
      panel.getByRole("progressbar", { name: "AI recommendation confidence" }),
    ).toHaveAttribute("aria-valuenow", "67");
    expect(panel.getByText("Non-negotiable operating envelope")).toBeVisible();
    expect(panel.getByText("Accessibility validation")).toBeVisible();
    expect(panel.getByText("Safety validation")).toBeVisible();
    expect(panel.getAllByText("Rejected")).toHaveLength(2);
  });

  it("keeps relay locked until both acknowledgements and writes an audit receipt", async () => {
    const user = userEvent.setup();
    render(<App />);
    await compileResponse();

    expect(
      screen.queryByRole("heading", {
        name: "One plan, adapted to every role and fan.",
      }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/Modeled impact reviewed/));
    await user.click(
      screen.getByLabelText(/Accessibility validation reviewed/),
    );
    await user.click(
      screen.getByRole("button", { name: "Approve plan and unlock relay" }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "One plan, adapted to every role and fan.",
      }),
    ).toBeVisible();
    expect(screen.getByText("Audit receipt written")).toBeVisible();
    expect(screen.getByRole("tab", { name: "English" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
