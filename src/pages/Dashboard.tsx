import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import { useCampaigns } from '../hooks/useCampaigns';
import { auditLogger } from '../utils/auditLogger';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useCampaigns();

  useEffect(() => {
    auditLogger('viewed dashboard');
  }, []);

  const onOpenCampaign = useCallback(
    (id: string) => {
      navigate(`/campaign/${id}`);
    },
    [navigate]
  );

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-white">Loading campaigns…</div>
            <div className="mt-2 text-sm text-slate-300/70">Fetching latest performance metrics.</div>
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-32 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-32 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-32 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-32 rounded-2xl border border-white/10 bg-white/[0.03]" />
        </div>
      </div>
    );
  }

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
          {data?.length ?? 0} campaigns
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data?.map((c) => (
          <CampaignCard key={c.id} campaign={c} onOpen={onOpenCampaign} />
        ))}
      </div>
    </div>
  );
}
