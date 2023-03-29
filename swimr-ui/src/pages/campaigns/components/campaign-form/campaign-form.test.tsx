/* eslint-disable @typescript-eslint/no-empty-function */
import { screen } from "@testing-library/react";
import CampaignForm from ".";
import { ICampaign } from ".";
import TestUtils from "../../../../test-utils";
import userEvent from "@testing-library/user-event";

describe("CampaignForm", () => {
  let mockSelectedCampaign: ICampaign | undefined;
  const mockHandleClose = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockModalType = "create";

  beforeEach(() => {
    mockSelectedCampaign = {
      campaignId: 1,
      campaignName: "Spring Promotion",
      endDate: "2022-01-01",
      startDate: "2021-01-01",
      companyName: "Novexa Corp",
      influencers: [
        {
          id: 1,
          influencer_id: 1,
          campaign_id: 1,
          influencer: {
            id: 1,
            influencer_name: "Test Influencer",
            email: "test@test.com",
            platform_id: 1,
            price_per_post: "10",
            is_active: true,
          },
        },
      ],
      client: {
        id: 1,
        client_name: "Alice Smith",
        company_name: "Novexa Corp",
        email: "test@test.com",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: any) => ({
        media: query,
        matches: query === "(pointer: fine)",
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterAll(() => {
    // @ts-ignore
    delete window.matchMedia;
  });

  it("renders CampaignForm component with given props", () => {
    TestUtils.render(
      <CampaignForm
        selectedCampaign={mockSelectedCampaign}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        modalType={mockModalType}
      />
    );

    expect(screen.getByTestId("campaign-form")).toBeInTheDocument();
  });

  it("should close the modal on clicking the close button", () => {
    TestUtils.render(
      <CampaignForm
        selectedCampaign={mockSelectedCampaign}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        modalType={mockModalType}
      />
    );

    const closeButton = screen.getByTestId("campaign-form-cancel");
    userEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
