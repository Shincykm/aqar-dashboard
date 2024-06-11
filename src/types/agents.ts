enum UserTypes {
    ADMIN,
    USER,
    AGENT
}

export type IAgentItem = {
    id: string;
    user:{
      first_name: string;
      last_name: string; 
      phone_number: string;
      whatsapp_number: string;
      email: string;
    },
    user_type: UserTypes.AGENT;
    state: string;
    status: string;
    address: string;
    country: string;
    zipCode: string;
    company: string;
    profile_picture: {
      virtual_path:string,
    };
    license_picture: string;
    licence_expiry_date:string,
    isVerified: boolean;
    company_name:string,
    website:string,
  };

  export type IAgentTableFilters = {
    name: string;
  };

  export type IAgentTableFilterValue = string | string[];