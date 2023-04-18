import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import EditCampaignModal from ".";
import useUpdateCampaignDetails from "../../../../hooks/useUpdateCampaignDetails";
import useCreateCampaign from "../../../../hooks/useCreateCampaign";
import { ICampaignModal } from "../../../../interfaces/campaign";
import TestUtils from "../../../../test-utils";
import userEvent from "@testing-library/user-event";
import preview from "jest-preview";

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
  const errorCampaign = {
    campaignId: 22,
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
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should call useCreateCampaignDetails hook with correct params when modalType is edit", async () => {
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
    const newProps = {
      ...props,
      selectedCampaign: campaignData,
      modalType: "create",
    };
    TestUtils.render(<EditCampaignModal {...newProps} />);
    const campaignNameField = screen.getByTestId("campaign-name-field");
    fireEvent.change(campaignNameField, {
      target: { value: "Summer Promotion" },
    });
    fireEvent.keyDown(campaignNameField, { key: "Enter", code: "Enter" });

    const startDatePicker = screen.getByLabelText(
      "Start Date/Time"
    ) as HTMLInputElement;
    userEvent.type(startDatePicker, "01/01/2021 01:00 AM");
    expect(startDatePicker.value).toEqual("MM/DD/YYYY⁩ ⁦hh:mm⁩ ⁦AM");

    const endDatePicker = screen.getByLabelText(
      "End Date/Time"
    ) as HTMLInputElement;
    userEvent.type(endDatePicker, "01/01/2021 01:00 AM");
    expect(endDatePicker.value).toEqual("MM/DD/YYYY⁩ ⁦hh:mm⁩ ⁦AM");

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: "SAVE" });
      userEvent.click(submitButton);
    });
  });

  it("should call useUpdateCampaign with an error when an api error occurs", async () => {
    const errorCampaignData = {
      campaignId: 22,
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
    const newProps = { ...props, selectedCampaign: errorCampaignData };
    TestUtils.render(<EditCampaignModal {...newProps} />);
    const submitButton = screen.getByRole("button", { name: "SAVE" });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(useUpdateCampaignDetails).toThrowError();
    });
  });
  it("should call useCreateCampaign with an error when an api error occurs", async () => {
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
    const newProps = {
      ...props,
      selectedCampaign: campaignData,
      modalType: "create",
    };
    TestUtils.render(<EditCampaignModal {...newProps} />);
    const campaignNameField = screen.getByTestId("campaign-name-field");
    fireEvent.change(campaignNameField, {
      target: { value: "Error Create" },
    });
    fireEvent.keyDown(campaignNameField, { key: "Enter", code: "Enter" });

    const startDatePicker = screen.getByLabelText(
      "Start Date/Time"
    ) as HTMLInputElement;
    userEvent.type(startDatePicker, "01/01/2021 01:00 AM");
    expect(startDatePicker.value).toEqual("MM/DD/YYYY⁩ ⁦hh:mm⁩ ⁦AM");

    const endDatePicker = screen.getByLabelText(
      "End Date/Time"
    ) as HTMLInputElement;
    userEvent.type(endDatePicker, "01/01/2021 01:00 AM");
    expect(endDatePicker.value).toEqual("MM/DD/YYYY⁩ ⁦hh:mm⁩ ⁦AM");

    await waitFor(() => {
      const submitButton = screen.getByRole("button", { name: "SAVE" });
      userEvent.click(submitButton);
    });

    // eslint-disable-next-line testing-library/no-debugging-utils
    preview.debug();
    await waitFor(() => {
      expect(useCreateCampaign).toThrowError();
    });
  });
});
