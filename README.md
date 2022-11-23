# Swim Marketing

In today’s industry, **93% of marketers worldwide are using social media business**. In 2022, almost 92% of marketers who work for companies with more than 100 employees in the United States are expected to start using social media for marketing. In recent years, influencer marketing has really been on the rise. What was a $1.7 billion industry in 2016 has since grown to become a **$9.7 billion industry in 2020**. In just 2021, it grew to $13.8 billion and is projected to expand to $15 billion in 2022. As this marketing strategy goes from strength to strength, the model continues to expand into new areas and approaches. Emerging from this is the concept of Social Media Influencer Pooling, which essentially allows companies that would normally spend X amount of a marketing budget on a single large influencer to split this budget amongst a ‘pool’ of smaller more affordable influencers, to increase the diversity of their marketing reach, rather than be specific to one following. A number of individuals spearheading this idea have already noted successful results using this strategy. However, as it is a very new approach, there is no bespoke software to help organise and manage Social Media Influencer Pooling.


## Goals

 - Have a single tool to manage all the stages of SMIP
 - Manage clients, influencers and campaigns
 - A directory of suggested influencers based on campaign type and previous work
 - Client email generator (initial enquiry, campaign proposal, contracts, confirmation )
 - Track the timeline of a campaign
 - Track the status of each influencer within a campaign
 - Pricing Calculator

## Solution

An application that allows marketing managers to control all aspects of their SMIP work, from initial client outreach all the way through to the competition of a campaign.

## Project Outline

**MVP**

-   Create a User Account & Password - Marketing Manager (independent session per user for MVP)
-   Create a client
-   Create an influencer
-   Create a influencer pool/group
-   Calendar to track appointments/planned campaigns (filterable)
-   Ability to update the status of a campaign (on an influencer level but also overall)

**V1/Stretch Goals**

-   Push Notifications
-   Email generator (mail merge situation)
-   Automatically send email updates to clients based on status
-   Flag overdue campaigns/influencer posts
-   Pricing Calculator
-   Create suggested pools for clients based on categories & budget

## Domain Model

``` mermaid
erDiagram
          USER ||--|{ CLIENT : "creates"
          USER ||--|{ CAMPAIGN : "creates"
          USER ||--|| POOL : "creates"
          CAMPAIGN }|--|| POOL : "uses"
          INFLUENCER }|--|{ POOL : "contains"
          CLIENT ||--|{ CAMPAIGN : "runs"
```

## ERD 
``` mermaid
%%{init: {'theme': 'dark' } }%%

erDiagram
    USER {
        int id
        string userName
        string email
        string password
    }
    USER_CLIENT {
        int id
        int userId
        int clientId
    }
    CLIENT {
        int id
        int clientName
        string clientEmail
        string campaign
    }
    CLIENT_CAMPAIGN {
        int id
        int campaignId
        int clientId
    }
    CAMPAIGN {
        int id
        string campaignName
        string campaignPool
        date startDate
        date endDate
    }
    POOL {
        int id
        int influencerId
        int campaignId
    }
    POOL_INFLUENCER {
        int id
        int influencerId
        int poolId
    }
    INFLUENCER {
        int id
        string influencerName
        string email
        int platformId
        string pricePerPost
        boolean isActive
    }
    PLATFORM {
        int id
        string platformName
    }
    APPOINTMENT {
        int appointmentId
        date appointmentDateTime
        int duration
        boolean recurring
    }
    USER ||--|{ USER_CLIENT: "has"
    CLIENT ||--|| USER_CLIENT: "has"
    USER_CLIENT ||--|{ CLIENT_CAMPAIGN : "creates"
    CAMPAIGN ||--|{ CLIENT_CAMPAIGN : "creates"
    USER_CLIENT }|--|| APPOINTMENT : "makes"
    CAMPAIGN }|--|| POOL : "uses"
    POOL_INFLUENCER }|--|{ INFLUENCER : ""
    POOL_INFLUENCER }|--|| POOL : ""
    INFLUENCER ||--|| PLATFORM : "contains"

```
