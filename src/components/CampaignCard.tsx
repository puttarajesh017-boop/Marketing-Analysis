import { memo } from 'react';
import type { Campaign } from '../api/campaignApi';

type Props = {
  campaign: Campaign;
  onOpen: (id: string) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function CampaignCardBase({ campaign, onOpen }: Props) {
  const statusLabel = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);

  const statusClassName =
    campaign.status === 'active'
      ? 'bg-emerald-500/20 text-emerald-100 ring-1 ring-emerald-400/30'
      : campaign.status === 'scheduled'
        ? 'bg-sky-500/20 text-sky-100 ring-1 ring-sky-400/30'
        : 'bg-slate-500/20 text-slate-100 ring-1 ring-slate-400/30';

  return (
    <button
      type="button"
      onClick={() => onOpen(campaign.id)}
      className="group w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur transition hover:border-white/15 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-semibold text-white">{campaign.name}</div>
            <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${statusClassName}`}>
              {statusLabel}
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-300/70">Campaign ID: {campaign.id}</div>
        </div>
        <div className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
          Audience {campaign.audienceSize.toLocaleString()}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">OPEN RATE</div>
          <div className="mt-1 text-lg font-semibold text-white">{campaign.openRate.toFixed(1)}%</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">CLICK RATE</div>
          <div className="mt-1 text-lg font-semibold text-white">{campaign.clickRate.toFixed(1)}%</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">REVENUE</div>
          <div className="mt-1 text-lg font-semibold text-white">{formatCurrency(campaign.revenue)}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-300/70">
        <span className="opacity-0 transition group-hover:opacity-100">Open details</span>
        <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-indigo-200 ring-1 ring-indigo-400/20">
          Performance
        </span>
      </div>
    </button>
  );
}

const CampaignCard = memo(CampaignCardBase);
export default CampaignCard;
