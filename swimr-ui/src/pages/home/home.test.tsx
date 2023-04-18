import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./index";
import TestUtils from "../../test-utils";

describe("Home", () => {
  it("renders a loading message while data is loading", async () => {
    TestUtils.render(<Home />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders appointments list when appointment data is available", async () => {
    TestUtils.render(<Home />);
    const title = await screen.findByText("Upcoming Events");
    expect(title).toBeInTheDocument();
    const appointment = await screen.findByText("zoom.link");
    expect(appointment).toBeInTheDocument();
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
