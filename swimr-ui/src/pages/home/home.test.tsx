import { screen, waitFor } from "@testing-library/react";
import Home from "./index";
import TestUtils from "../../test-utils";

describe("Home", () => {
  it("renders appointments list when appointment data is available", async () => {
    TestUtils.render(<Home />);
    const title = await screen.findByText("Upcoming Events");
    expect(title).toBeInTheDocument();
  });

  it("renders influencers list when influencer data is available", async () => {
    TestUtils.render(<Home />);
    const title = await screen.findByText("Available Influencers");
    expect(title).toBeInTheDocument();
    const influencer = await screen.findByText("John Jones");
    expect(influencer).toBeInTheDocument();
  });

  it("renders campaign list when campaign data is available", async () => {
    TestUtils.render(<Home />);
    const title = await screen.findByText("Upcoming Campaigns");
    expect(title).toBeInTheDocument();
    const campaign = await screen.findByText("Spring Promotion");
    expect(campaign).toBeInTheDocument();
  });
});
