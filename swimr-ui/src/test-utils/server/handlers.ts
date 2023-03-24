import { rest } from "msw";
import { ICampaign } from "../../interfaces/campaign";
import { IInfluencers } from "../../interfaces/influencer";
import { IClient } from "../../interfaces/client";
import { IUser } from "../../interfaces/user";
import { IAppointment } from "../../interfaces/appointment";

const baseUrl = "http://localhost:4000";

const campaignData: ICampaign[] = [
  {
    campaignId: 1,
    campaignName: "Spring Promotion",
    startDate: "2022-03-01T00:00:00.000Z",
    endDate: "2022-03-31T00:00:00.000Z",
    companyName: "Novexa Corp",
    client: {
      id: 1,
      client_name: "Alice Smith",
      email: "alice.smith@example.com",
      company_name: "Novexa Corp",
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
      {
        id: 2,
        campaign_id: 1,
        influencer_id: 8,
        influencer: {
          id: 8,
          influencer_name: "Kate Johnson",
          email: "kate.johnson@example.com",
          platform_id: 8,
          price_per_post: "£800",
          is_active: true,
        },
      },
      {
        id: 6,
        campaign_id: 1,
        influencer_id: 5,
        influencer: {
          id: 5,
          influencer_name: "Michael Jones",
          email: "michael.jones@example.com",
          platform_id: 5,
          price_per_post: "£500",
          is_active: true,
        },
      },
      {
        id: 7,
        campaign_id: 1,
        influencer_id: 2,
        influencer: {
          id: 2,
          influencer_name: "Jane Smith",
          email: "jane.smith@example.com",
          platform_id: 2,
          price_per_post: "£200",
          is_active: true,
        },
      },
    ],
  },
];

const influencerData: IInfluencers[] = [
  {
    influencerId: 1,
    influencerName: "John Jones",
    email: "john.jones@example.com",
    pricePerPost: "£100",
    isActive: true,
    platform: {
      id: 1,
      platform_name: "Instagram",
    },
  },
];

const clientData: IClient[] = [
  {
    clientId: 1,
    clientName: "Alice Smith",
    emailAddress: "alice.smith@example.com",
    companyName: "Novexa Corp",
  },
];

const userData: IUser[] = [
  {
    userId: 1,
    userName: "John Smith",
    emailAddress: "john.smith@gmail.com",
    userLevelId: 1,
  },
];

const appointmentData: IAppointment[] = [
  {
    id: 1,
    appointment: {
      id: 1,
      description: "Figures Meeting",
      scheduled_date_time: new Date("2023-12-12T10:00:00.000Z"),
      end_date_time: new Date("2023-12-12T11:00:00.000Z"),
      location: "zoom.link",
    },
    client: {
      id: 1,
      client_name: "Alice Smith",
      email: "alice.smith@example.com",
      company_name: "Novexa Corp",
    },
    users: {
      id: 1,
      user_name: "John Smith",
      email: "john.smith@gmail.com",
      user_level_id: 1,
    },
  },
];

const testPostAppointment = {
  description: "Test appointment",
  scheduled_date_time: new Date(),
  end_date_time: new Date(),
  location: "Test location",
  user_id: 1,
  client_id: 2,
};

const testPutAppointment = {
  id: 1,
  description: "Test appointment",
  scheduled_date_time: new Date(),
  end_date_time: new Date(),
  location: "Test location",
  user_id: 1,
  client_id: 2,
  appointment_id: 1,
  client: {
    id: 2,
    client_name: "test client",
    email: "testemail@mail.com",
    company_name: "test company",
  },
  users: {
    id: 1,
    user_name: "test user",
    email: "testuser@mail.com",
    user_level_id: 1,
  },
};

const testPostCampaign = {
  campaignId: 1,
  campaignName: "Test Campaign",
  startDate: new Date("2021-01-01"),
  endDate: new Date("2021-02-02"),
  influencers: [],
  clientId: 1,
};

const testPutCampaign = {
  campaignId: 1,
  campaignName: "Test Campaign",
  startDate: new Date("2021-01-01"),
  endDate: new Date("2021-02-02"),
  companyName: "Test Company",
  influencers: [],
  clientId: 1,
};
export const handlers = [
  rest.get(baseUrl + "/api/authenticate/refresh", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      })
    )
  ),
  rest.get(baseUrl + "api/applications/", (req, res, ctx) =>
    res(ctx.status(200), ctx.json("Empty"))
  ),
  rest.get(baseUrl + "/api/influencers", (req, res, ctx) => {
    return res(ctx.json(influencerData));
  }),
  rest.get(baseUrl + "/api/campaigns", (req, res, ctx) => {
    return res(ctx.json(campaignData));
  }),
  rest.get(baseUrl + "/api/clients", (req, res, ctx) => {
    return res(ctx.json(clientData));
  }),
  rest.get(baseUrl + "/api/users", (req, res, ctx) => {
    return res(ctx.json(userData));
  }),
  rest.get(baseUrl + "/api/appointments", (req, res, ctx) => {
    return res(ctx.json(appointmentData));
  }),
  rest.post(baseUrl + "/api/appointments", (req, res, ctx) => {
    return res(ctx.json(testPostAppointment));
  }),

  rest.put(baseUrl + "/api/appointments", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testPutAppointment));
  }),
  rest.post(baseUrl + "/api/campaigns", (req, res, ctx) => {
    return res(ctx.json(testPostCampaign));
  }),
  rest.put(baseUrl + "/api/campaigns", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testPutCampaign));
  }),

  // rest.delete(baseUrl + "/api/campaigns", (req, res, ctx) => {
  //   return res(ctx.status(200));
  // }),

  rest.delete(baseUrl + "/api/campaigns", async (req, res, ctx) => {
    const requestData = await req.json();
    if (requestData.campaignId === 22) {
      console.log("handler error");
      return res(ctx.status(500));
    } else {
      return res(ctx.status(200));
    }
  }),

  rest.delete(baseUrl + "/api/appointments", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.post(baseUrl + "/api/authenticate", async (req, res, ctx) => {
    const requestData = await req.json();
    if (
      requestData.email === "testemail@mail.com" &&
      requestData.password === "testpassword123!"
    ) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(500));
    }
  }),
];

export { rest };
