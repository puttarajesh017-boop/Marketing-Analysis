import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { axiosClient } from './axiosClient';

export type Campaign = {
  id: string;
  name: string;
  audienceSize: number;
  openRate: number;
  clickRate: number;
  revenue: number;
  status: 'active' | 'scheduled' | 'paused';
};

const mockCampaigns: Campaign[] = [
  {
    id: 'cmp_1001',
    name: 'Spring Sale - Apparel',
    audienceSize: 120_000,
    openRate: 42.1,
    clickRate: 6.4,
    revenue: 58240,
    status: 'active',
  },
  {
    id: 'cmp_1002',
    name: 'New Product Launch',
    audienceSize: 85_500,
    openRate: 38.7,
    clickRate: 5.1,
    revenue: 73110,
    status: 'scheduled',
  },
  {
    id: 'cmp_1003',
    name: 'Winback - Dormant Users',
    audienceSize: 64_200,
    openRate: 29.3,
    clickRate: 3.7,
    revenue: 21400,
    status: 'paused',
  },
  {
    id: 'cmp_1004',
    name: 'VIP Early Access',
    audienceSize: 12_400,
    openRate: 61.8,
    clickRate: 12.9,
    revenue: 128900,
    status: 'active',
  },
];

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function createMockAdapter<T>(
  handler: (config: InternalAxiosRequestConfig) => T,
  delayMs: number = 450
): AxiosAdapter {
  return async (config: InternalAxiosRequestConfig) => {
    await delay(delayMs);

    const response: AxiosResponse<T> = {
      data: handler(config),
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };

    return response;
  };
}

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await axiosClient.request<Campaign[]>({
    url: '/campaigns',
    method: 'GET',
    adapter: createMockAdapter(() => mockCampaigns, 1500),
  });
  return res.data;
}

export async function getCampaignById(id: string): Promise<Campaign> {
  const res = await axiosClient.request<Campaign>({
    url: `/campaigns/${id}`,
    method: 'GET',
    adapter: createMockAdapter(() => {
      const found = mockCampaigns.find((c) => c.id === id);
      if (!found) {
        throw new Error('Campaign not found');
      }
      return found;
    }),
  });
  return res.data;
}
