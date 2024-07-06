export type ContractABI = {
    inputs?: {
      indexed?: boolean,
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability?: string;
    type?: string;
    name?: string;
    outputs?: {
      internalType: string;
      name: string;
      type: string;
    }[];
    anonymous?: boolean;
    indexed?: boolean;
    payable?: boolean;
    constant?: boolean
  }