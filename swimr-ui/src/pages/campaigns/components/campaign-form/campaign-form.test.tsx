/* eslint-disable @typescript-eslint/no-empty-function */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import CampaignForm from ".";
import { ICampaign } from ".";
import TestUtils from "../../../../test-utils";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";

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
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: any) => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
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

  it("should handle form submission on clicking the submit button", async () => {
    TestUtils.render(
      <CampaignForm
        selectedCampaign={mockSelectedCampaign}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        modalType={mockModalType}
      />
    );

    const submitButton = screen.getByTestId("campaign-form-submit");
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it("should handle form submission on pressing Enter key", async () => {
    TestUtils.render(
      <CampaignForm
        selectedCampaign={mockSelectedCampaign}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        modalType={mockModalType}
      />
    );

    const campaignNameField = screen.getByTestId("campaign-name-field");
    fireEvent.change(campaignNameField, {
      target: { value: "Summer Promotion" },
    });
    fireEvent.keyDown(campaignNameField, { key: "Enter", code: "Enter" });
    const submitFormBtn = screen.getByTestId("campaign-form-submit");
    userEvent.click(submitFormBtn);
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
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

  it("should display error messages for invalid form fields", async () => {
    TestUtils.render(
      <CampaignForm
        selectedCampaign={mockSelectedCampaign}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        modalType={mockModalType}
      />
    );

    // Set end date
    // const endDatePicker = screen.getByLabelText("End Date/Time");
    // userEvent.type(endDatePicker, "01/01/2021", { delay: 1 });
    // fireEvent.change(endDatePicker, { target: { value: "01/01/2021" } });
    // // fireEvent.change(endDatePicker, {
    // //   target: { value: mockSelectedCampaign?.endDate },
    // // });
    // expect(endDatePicker).toHaveValue("01/01/2021");

    // Set start date
    const startDatePicker = screen.getByLabelText(
      "Start Date/Time"
    ) as HTMLInputElement;
    userEvent.type(startDatePicker, "01/01/2021 01:00");
    expect(startDatePicker.value).toEqual(
      "⁦⁨01⁩ / ⁨01⁩ / ⁨2021⁩⁩ ⁦⁨01⁩:⁨00⁩⁩ ⁦⁨aa⁩⁩"
    );

    const endDatePicker = screen.getByLabelText(
      "End Date/Time"
    ) as HTMLInputElement;
    userEvent.type(endDatePicker, "01/01/2021 01:00");
    expect(endDatePicker.value).toEqual(
      "⁦⁨01⁩ / ⁨01⁩ / ⁨2021⁩⁩ ⁦⁨01⁩:⁨00⁩⁩ ⁦⁨aa⁩⁩"
    );
    // Select client
    const clientSelect = screen.getByTestId("client-select");
    fireEvent.mouseDown(clientSelect);

    // Submit form
    const submitButton = screen.getByTestId("campaign-form-submit");
    userEvent.click(submitButton);

    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug(undefined, 3000000);
    // Ensure handleSubmit was called with expected values
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        campaignId: mockSelectedCampaign?.campaignId,
        campaignName: mockSelectedCampaign?.campaignName,
        endDate: mockSelectedCampaign?.endDate,
        startDate: mockSelectedCampaign?.startDate,
        companyName: mockSelectedCampaign?.companyName,
        client: {
          id: mockSelectedCampaign?.client.id,
          client_name: mockSelectedCampaign?.client.client_name,
          company_name: mockSelectedCampaign?.client.company_name,
          email: mockSelectedCampaign?.client.email,
        },
      });
    });
  });
});
