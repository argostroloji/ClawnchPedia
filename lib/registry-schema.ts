
export type RegistryEntry = {
    name: string;
    type: 'agent' | 'token' | 'project';
    ticker?: string; // For tokens
    contract_address?: string;
    description: string;
    socials: {
        twitter?: string;
        website?: string;
        telegram?: string;
    };
    tags: string[];
    submission_date: string;
};
