import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import CampaignCardSkeleton from '../components/CampaignCardSkeleton';
import { useCampaigns } from '../hooks/useCampaigns';
import { auditLogger } from '../utils/auditLogger';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCampaigns();
  const [search, setSearch] = useState('');

  useEffect(() => {
    auditLogger('viewed dashboard');
  }, []);

  const onOpenCampaign = useCallback(
    (id: string) => {
      navigate(`/campaign/${id}`);
    },
    [navigate]
  );

  const filteredCampaigns = useMemo(() => {
    const campaigns = data ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter((c) => c.name.toLowerCase().includes(q));
  }, [data, search]);

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur">
        <div className="text-sm font-semibold text-red-200">Failed to load campaigns</div>
        <div className="mt-2 text-sm text-slate-200/70">{error?.message ?? 'Unknown error'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-medium tracking-wide text-slate-300/70">Overview</div>
          <h1 className="mt-1 text-2xl font-semibold text-white">Campaigns</h1>
          <p className="mt-2 text-sm text-slate-300/70">Monitor engagement and revenue across active sends.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          {filteredCampaigns.length} campaigns
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <input
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none ring-1 ring-transparent transition placeholder:text-slate-300/50 focus:ring-pink-500/40"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <CampaignCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-200 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          No campaigns found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredCampaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} onOpen={onOpenCampaign} />
          ))}
        </div>
      )}
    </div>
  );
}
