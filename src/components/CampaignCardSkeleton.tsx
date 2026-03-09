import { memo } from 'react';

function CampaignCardSkeletonBase() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-2/3 rounded bg-white/10" />
            <div className="h-6 w-20 rounded-full bg-white/10" />
          </div>
          <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
        </div>
        <div className="h-7 w-28 rounded-full bg-white/10" />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="h-3 w-16 rounded bg-white/10" />
          <div className="mt-2 h-5 w-20 rounded bg-white/10" />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="h-3 w-16 rounded bg-white/10" />
          <div className="mt-2 h-5 w-20 rounded bg-white/10" />
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="h-3 w-16 rounded bg-white/10" />
          <div className="mt-2 h-5 w-20 rounded bg-white/10" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-6 w-24 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

const CampaignCardSkeleton = memo(CampaignCardSkeletonBase);
export default CampaignCardSkeleton;
