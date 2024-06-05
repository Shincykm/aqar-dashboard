enum UserTypes {
    ADMIN,
    USER,
    AGENT
}

export type IAgentItem = {
    id: string;
    first_name: string;
    last_name: string;
    user_type: UserTypes.AGENT;
    email: string;
    state: string;
    status: string;
    address: string;
    country: string;
    zipCode: string;
    company: string;
    avatarUrl: string;
    phoneNumber: string;
    isVerified: boolean;
  };

  export type IAgentTableFilters = {
    name: string;
    role: string[];
    status: string;
  };

  export type IAgentTableFilterValue = string | string[];