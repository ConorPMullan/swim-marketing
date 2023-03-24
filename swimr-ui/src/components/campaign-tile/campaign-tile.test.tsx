import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CampaignTile from ".";
import { ICampaignTile } from "../../interfaces/campaign";
import useDeleteCampaign from "../../hooks/useDeleteCampaign";
import useGetCampaigns from "../../hooks/useGetCampaigns";
import TestUtils from "../../test-utils";
import userEvent from "@testing-library/user-event";

// jest.mock("../../hooks/useDeleteCampaign");
// jest.mock("../../hooks/useGetCampaigns");
jest.mock("../../hooks/useGetCampaigns.tsx");
const mockedUsedNavigate = jest.fn();
// const mockToast = jest.fn();
const mockRefetch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

// jest.mock("react-hot-toast", () => ({
//   toast: {
//     success: mockToast,
//     error: mockToast,
//   },
// }));

const mockCampaign: ICampaignTile = {
  campaign: {
    campaignId: 1,
    campaignName: "Test Campaign",
    startDate: "2022-03-01",
    endDate: "2022-03-15",
    companyName: "Test Company",
    client: {
      id: 1,
      client_name: "test client",
      company_name: "Test Company",
      email: "testclient@testcompany.com",
    },
    influencers: [
      {
        id: 1,
        influencer_id: 1,
        campaign_id: 1,
        influencer: {
          id: 1,
          influencer_name: "Influencer 1",
          platform_id: 1,
          email: "test@influencer.com",
          price_per_post: "100",
          is_active: true,
        },
      },
    ],
  },
  index: 0,
  listLength: 1,
  tileType: "campaign",
};

const mockCampaignError: ICampaignTile = {
  campaign: {
    campaignId: 22,
    campaignName: "Test Campaign",
    startDate: "2022-03-01",
    endDate: "2022-03-15",
    companyName: "Test Company",
    client: {
      id: 1,
      client_name: "test client",
      company_name: "Test Company",
      email: "testclient@testcompany.com",
    },
    influencers: [
      {
        id: 1,
        influencer_id: 1,
        campaign_id: 1,
        influencer: {
          id: 1,
          influencer_name: "Influencer 1",
          platform_id: 1,
          email: "test@influencer.com",
          price_per_post: "100",
          is_active: true,
        },
      },
    ],
  },
  index: 0,
  listLength: 1,
  tileType: "campaign",
};

describe("CampaignTile", () => {
  beforeEach(() => {
    (useGetCampaigns as jest.Mock).mockReturnValue({
      refetch: mockRefetch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders campaign tile correctly", () => {
    // (useDeleteCampaign as jest.Mock).mockReturnValue({
    //   mutate: jest.fn(),
    // });
    TestUtils.render(
      <CampaignTile
        campaign={mockCampaign.campaign}
        index={0}
        listLength={1}
        tileType="campaign"
      />
    );
    expect(screen.getByText("Test Campaign")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("Start Date: Tue Mar 01 2022")).toBeInTheDocument();
    expect(screen.getByText("End Date: Tue Mar 15 2022")).toBeInTheDocument();
  });

  it("displays campaign edit modal when clicking edit button", async () => {
    // (useDeleteCampaign as jest.Mock).mockReturnValue({
    //   mutate: jest.fn(),
    // });
    TestUtils.render(
      <CampaignTile
        campaign={mockCampaign.campaign}
        index={0}
        listLength={1}
        tileType="campaign"
      />
    );

    userEvent.click(screen.getByTestId("edit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("campaign-modal")).toBeInTheDocument();
    });
  });

  it("should render the campaign tile correctly", () => {
    TestUtils.render(<CampaignTile {...mockCampaign} />);

    expect(
      screen.getByText(mockCampaign.campaign.campaignName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCampaign.campaign.companyName!)
    ).toBeInTheDocument();
    expect(screen.getByText("Influencers")).toBeInTheDocument();
  });

  it("should render the campaign tile without influencers correctly", () => {
    const campaignWithoutInfluencers = {
      ...mockCampaign.campaign,
      influencers: [],
    };
    const propsWithoutInfluencers = {
      ...mockCampaign,
      campaign: campaignWithoutInfluencers,
    };
    TestUtils.render(<CampaignTile {...propsWithoutInfluencers} />);

    expect(
      screen.getByText(mockCampaign.campaign.campaignName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCampaign.campaign.companyName!)
    ).toBeInTheDocument();
    expect(screen.queryByText("Influencers")).not.toBeInTheDocument();
  });

  it("should not render the edit and delete buttons for an influencer tile", async () => {
    TestUtils.render(<CampaignTile {...mockCampaign} tileType="home" />);

    expect(screen.getByTestId("see-more-btn")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("see-more-btn"));
    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith("/campaigns");
    });
  });

  it("should not render the edit and delete buttons for a finished campaign tile", () => {
    const campaignFinished = {
      ...mockCampaign.campaign,
      status: "finished",
    };
    const propsFinishedCampaign: ICampaignTile = {
      ...mockCampaign,
      tileType: "home",
      campaign: campaignFinished,
    };
    TestUtils.render(<CampaignTile {...propsFinishedCampaign} />);

    expect(
      screen.queryByRole("button", { name: "Edit" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).not.toBeInTheDocument();
  });

  it("delete button click", async () => {
    TestUtils.render(<CampaignTile {...mockCampaign} />);

    const deleteBtn = screen.getByTestId("delete-btn");
    userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    const yesBtn = screen.getByTestId("yes-btn-confirm");
    userEvent.click(yesBtn);

    await waitFor(async () => {
      expect(useGetCampaigns).toHaveBeenCalled();
      expect(
        screen.queryByText("Are you sure you want to delete this campaign?")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("campaign-modal")).not.toBeInTheDocument();
    });
  });

  it("delete button click expect error", async () => {
    TestUtils.render(<CampaignTile {...mockCampaignError} />);

    const deleteBtn = screen.getByTestId("delete-btn");
    userEvent.click(deleteBtn);
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    const yesBtn = screen.getByTestId("yes-btn-confirm");
    userEvent.click(yesBtn);

    await waitFor(async () => {
      expect(useGetCampaigns).toHaveBeenCalled();
      expect(
        screen.queryByText("Are you sure you want to delete this campaign?")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("campaign-modal")).not.toBeInTheDocument();
    });
  });
});
