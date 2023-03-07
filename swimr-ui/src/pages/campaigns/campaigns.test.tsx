import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Campaigns from ".";
import useGetCampaigns from "../../hooks/useGetCampaigns";
import ModalComponent from "../../components/modal";
import EditCampaignModal from "./components/campaign-modal";
import TestUtils from "../../test-utils";
import { ICampaign } from "../../interfaces/campaign";

jest.mock("../../hooks/useGetCampaigns");
jest.mock(
  "../../components/modal",
  () =>
    ({ children }: { children: any }) =>
      children
);

describe("Campaigns component", () => {
  const mockCampaignData: { data: ICampaign[] } = {
    data: [
      {
        campaignId: 1,
        campaignName: "Campaign 1",
        endDate: "2023-03-31",
        startDate: "2023-03-01",
        companyName: "Company 1",
        client: {
          id: 1,
          client_name: "Client 1",
          company_name: "Company 1",
          email: "client1@test.com",
        },
        influencers: [
          {
            id: 1,
            influencer_id: 1,
            campaign_id: 1,
            influencer: {
              id: 1,
              influencer_name: "Influencer 1",
              email: "influencer1@test.com",
              platform_id: 1,
              price_per_post: "$50",
              is_active: true,
            },
          },
        ],
      },
      {
        campaignId: 2,
        campaignName: "Campaign 2",
        endDate: "2023-04-30",
        startDate: "2023-04-01",
        companyName: "Company 2",
        client: {
          id: 2,
          client_name: "Client 2",
          company_name: "Company 2",
          email: "client2@test.com",
        },
        influencers: [
          {
            id: 2,
            influencer_id: 2,
            campaign_id: 2,
            influencer: {
              id: 2,
              influencer_name: "Influencer 2",
              email: "influencer2@test.com",
              platform_id: 2,
              price_per_post: "$75",
              is_active: false,
            },
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    (useGetCampaigns as jest.Mock).mockReturnValue({ data: mockCampaignData });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render campaign title and create button", () => {
    TestUtils.render(<Campaigns />);
    expect(screen.getByTestId("campaign-title")).toBeInTheDocument();
    expect(screen.getByTestId("create-campaign-btn")).toBeInTheDocument();
  });

  it("should render the upcoming campaigns", () => {
    TestUtils.render(<Campaigns />);
    expect(screen.getByTestId("upcoming-campaign-list")).toBeInTheDocument();
  });

  it("should render the ongoing campaigns", () => {
    TestUtils.render(<Campaigns />);
    expect(screen.getByTestId("ongoing-campaign-list")).toBeInTheDocument();
  });

  it("should render the completed campaigns", () => {
    TestUtils.render(<Campaigns />);
    expect(screen.getByTestId("completed-campaign-list")).toBeInTheDocument();
  });
});
