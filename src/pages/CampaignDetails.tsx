import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCampaignById } from '../api/campaignApi';
import MetricsChart from '../components/MetricsChart';
import { auditLogger } from '../utils/auditLogger';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CampaignDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => getCampaignById(id ?? ''),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (id) auditLogger('opened campaign');
  }, [id]);

  if (!id) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <div className="text-sm font-semibold text-white">Missing campaign id</div>
        <div className="mt-3 text-sm text-slate-300/70">
          <Link className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10" to="/">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <div className="text-sm font-semibold text-white">Loading campaign…</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.03]" />
          <div className="h-24 rounded-2xl border border-white/10 bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur">
        <div className="text-sm font-semibold text-red-200">Failed to load campaign</div>
        <div className="mt-2 text-sm text-slate-200/70">{error?.message ?? 'Unknown error'}</div>
        <div className="mt-4">
          <Link className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10" to="/">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <div className="text-sm font-semibold text-white">Campaign unavailable</div>
        <div className="mt-2 text-sm text-slate-300/70">Please try again or return to the dashboard.</div>
        <div className="mt-4">
          <Link className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10" to="/">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <div className="text-xs font-medium tracking-wide text-slate-300/70">Campaign</div>
          <h1 className="mt-1 truncate text-2xl font-semibold text-white">{data.name}</h1>
          <div className="mt-2 text-xs text-slate-300/70">ID: {data.id}</div>
        </div>
        <Link className="inline-flex w-fit items-center rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-white/10" to="/">
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">AUDIENCE</div>
          <div className="mt-2 text-2xl font-semibold text-white">{data.audienceSize.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">OPEN RATE</div>
          <div className="mt-2 text-2xl font-semibold text-white">{data.openRate.toFixed(1)}%</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">CLICK RATE</div>
          <div className="mt-2 text-2xl font-semibold text-white">{data.clickRate.toFixed(1)}%</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">REVENUE</div>
          <div className="mt-2 text-2xl font-semibold text-white">{formatCurrency(data.revenue)}</div>
        </div>
      </div>

      <MetricsChart baseOpenRate={data.openRate} />
    </div>
  );
 }
