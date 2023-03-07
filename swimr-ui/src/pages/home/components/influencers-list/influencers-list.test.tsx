import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InfluencersList from ".";
import { IInfluencers } from "../../../../interfaces/influencer";
import TestUtils from "../../../../test-utils";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockInfluencersData: IInfluencers[] = [
  {
    email: "johndoe@gmail.com",
    influencerId: 1,
    influencerName: "John Doe",
    isActive: true,
    pricePerPost: "$100",
    platform: { id: 1, platform_name: "Instagram" },
  },
  {
    email: "janedoe@gmail.com",
    influencerId: 2,
    influencerName: "Jane Doe",
    isActive: false,
    pricePerPost: "$200",
    platform: { id: 2, platform_name: "Snapchat" },
  },
];

describe("InfluencersList", () => {
  it("should render the influencer list items with correct data", () => {
    TestUtils.render(<InfluencersList influencerData={mockInfluencersData} />);
    const influencerItems = screen.getAllByRole("listitem");

    expect(influencerItems).toHaveLength(2);
    expect(influencerItems[0]).toHaveTextContent("John Doe");
    expect(influencerItems[0]).toHaveTextContent("$100");
    expect(influencerItems[1]).toHaveTextContent("Jane Doe");
    expect(influencerItems[1]).toHaveTextContent("$200");
  });

  it("should navigate to the influencers page when an influencer is clicked", () => {
    TestUtils.render(<InfluencersList influencerData={mockInfluencersData} />);
    const influencerItem = screen.getByTestId("influencers-list-item-1");
    userEvent.click(influencerItem);
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/influencers");
  });
});
