interface Client {
  id: number;
  client_name: string;
  email: string;
}

interface IClient {
  clientId: number;
  clientName: string;
  emailAddress: string;
}

interface ICreateClient {
  client_name: string;
  email: string;
  user_id: number;
}

export { Client, IClient, ICreateClient };
