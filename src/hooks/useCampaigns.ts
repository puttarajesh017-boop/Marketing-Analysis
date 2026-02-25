import { useQuery } from '@tanstack/react-query';
import { getCampaigns, type Campaign } from '../api/campaignApi';

export function useCampaigns() {
  return useQuery<Campaign[], Error>({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
}
