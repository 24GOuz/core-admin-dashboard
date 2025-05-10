export interface Organization {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  name: string;
  handle: string;
  phone: string;
  partner: {
    name: string;
    surname: string;
  };
  region: {
    name: Record<string, string>;
  };
  businessTypes: {
    name: Record<string, string>;
  }[];
}

export interface OrganizationFormBody {
  name: string;
  handle: string;
  logoId: number;
  partnerId: number;
  regionId: number;
  phone: string;
  password: string;
  businessTypeIds: number[];
}

export interface UploadOrganizationLogoBody {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  filename: string;
  path: string;
  originalName: string;
  mimetype: string;
  size: string;
  extension: string | null;
  key: string;
  hashId: string;
}