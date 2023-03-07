import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditCampaignModal from ".";

import { toast } from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import TestUtils from "../../../../test-utils";
import useUpdateCampaignDetails from "../../../../hooks/useUpdateCampaignDetails";
import useCreateCampaign from "../../../../hooks/useCreateCampaign";
import { ICampaign, ICampaignModal } from "../../../../interfaces/campaign";

const mockedMutate = jest.fn();
const mockedCreate = jest.fn();

// jest.mock('path/to/hook', () => ({
//   useMutationHook: () => ({ mutate: mockedMutate }),
// }));
// mock the useUpdateCampaignDetails and useCreateCampaign hooks
jest.mock("../../../../hooks/useUpdateCampaignDetails", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../../../hooks/useCreateCampaign", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("EditCampaignModal", () => {
  const campaign: ICampaign = {
    campaignId: 1,
    campaignName: "Test Campaign",
    endDate: "2023-12-31",
    startDate: "2023-01-01",
    client: {
      id: 1,
      client_name: "Test Client",
      company_name: "Test Company",
      email: "test@example.com",
    },
    influencers: [
      {
        id: 1,
        campaign_id: 1,
        influencer_id: 9,
        influencer: {
          id: 9,
          influencer_name: "Samuel Jones",
          email: "samuel.jones@example.com",
          platform_id: 7,
          price_per_post: "£900",
          is_active: true,
        },
      },
    ],
  };
  let createMock: jest.Mock;
  let updateMock: jest.Mock;
  const handleClose = jest.fn();
  const modalType = "edit";
  const props: ICampaignModal = {
    handleClose,
    selectedCampaign: campaign,
    modalType,
  };
  const mutate = jest.fn();
  const create = jest.fn();

  beforeEach(() => {
    createMock = jest.fn();
    updateMock = jest.fn();
    //@ts-ignore
    useCreateCampaign.mockReturnValue({
      mutate: createMock,
    });
    //@ts-ignore
    useUpdateCampaignDetails.mockReturnValue({
      mutate: updateMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when editing an existing campaign", () => {
    it("should render without errors", () => {
      TestUtils.render(<EditCampaignModal {...props} />);
      expect(screen.getByTestId("campaign-modal")).toBeInTheDocument();
    });

    it("should call handleClose when the form is submitted", async () => {
      TestUtils.render(<EditCampaignModal {...props} />);
      const submitBtn = screen.getByTestId("campaign-form-submit");
      fireEvent.click(submitBtn);
      await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1));
    });

    it("should call mutate when modalType is 'edit'", async () => {
      TestUtils.render(<EditCampaignModal {...props} />);
      const submitBtn = screen.getByTestId("campaign-form-submit");
      fireEvent.click(submitBtn);
      await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    });

    it("should call create when modalType is 'create'", async () => {
      const createProps = {
        ...props,
        modalType: "create",
      };
      TestUtils.render(<EditCampaignModal {...createProps} />);
      const submitBtn = screen.getByTestId("campaign-form-submit");
      fireEvent.click(submitBtn);
      await waitFor(() => expect(create).toHaveBeenCalledTimes(1));
    });
  });
});
