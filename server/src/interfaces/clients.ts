interface Client {
  id: number;
  client_name: string;
  email: string;
  company_name: string;
}

interface IClient {
  clientId: number;
  clientName: string;
  emailAddress: string;
  companyName: string;
}

interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
  company_name: string;
}

export { Client, IClient, ICreateClient };
