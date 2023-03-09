import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import EditCampaignModal from ".";
import useUpdateCampaignDetails from "../../../../hooks/useUpdateCampaignDetails";
import useCreateCampaign from "../../../../hooks/useCreateCampaign";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-hot-toast";
import { ICampaignModal } from "../../../../interfaces/campaign";
import TestUtils from "../../../../test-utils";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../hooks/useUpdateCampaignDetails");
jest.mock("../../../../hooks/useCreateCampaign");
jest.mock("react-hot-toast");

describe("EditCampaignModal", () => {
  const handleClose = jest.fn();
  const campaign = {
    campaignId: 1,
    campaignName: "test campaign",
    clientId: 1,
    startDate: "2022-01-01",
    endDate: "2022-01-31",
    client: {
      id: 1,
      client_name: "test client",
      company_name: "test company",
      email: "testemail@mail.com",
    },
    influencers: [],
  };
  const props: ICampaignModal = {
    handleClose,
    selectedCampaign: campaign,
    modalType: "edit",
  };
  beforeEach(() => {
    (useUpdateCampaignDetails as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
    (useCreateCampaign as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component properly", () => {
    TestUtils.render(<EditCampaignModal {...props} />);
    expect(screen.getByTestId("campaign-modal")).toBeInTheDocument();
    expect(
      screen.getByTestId(`campaign-modal-title-${campaign.campaignId}`)
    ).toBeInTheDocument();
    expect(screen.getByText("Campaign Details")).toBeInTheDocument();
  });

  it("should call useUpdateCampaignDetails hook with correct params when modalType is edit", async () => {
    const mutate = jest.fn();
    const campaignData = {
      campaignId: 1,
      campaignName: "updated test campaign",
      clientId: 1,
      startDate: "2022-02-01",
      endDate: "2022-02-28",
      client: {
        id: 1,
        client_name: "test client",
        company_name: "test company",
        email: "testemail@mail.com",
      },
      influencers: [],
    };
    const newProps = { ...props, selectedCampaign: campaignData };
    TestUtils.render(<EditCampaignModal {...newProps} />);
    const submitButton = screen.getByRole("button", { name: "SAVE" });
    fireEvent.click(submitButton);
    expect(useUpdateCampaignDetails).toHaveBeenCalledTimes(1);
  });

  it("should call useCreateCampaign hook with correct params when modalType is create", async () => {
    const newProps = {
      ...props,
      modalType: "create",
      selectedCampaign: undefined,
    };
    TestUtils.render(<EditCampaignModal {...newProps} />);
    const submitButton = screen.getByRole("button", { name: "SAVE" });
    userEvent.click(submitButton);
    expect(useCreateCampaign).toHaveBeenCalledTimes(1);
  });
});
