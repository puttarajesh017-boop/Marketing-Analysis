import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { auditLogger } from '../utils/auditLogger';

type EngagementLevel = 'low' | 'medium' | 'high';

type Segment = {
  country: string;
  engagement: EngagementLevel;
};

export default function SegmentBuilder() {
  const role = useSelector((s: RootState) => s.user.role);

  const countries = useMemo(() => ['United States', 'India', 'United Kingdom', 'Germany', 'Australia'], []);
  const engagementLevels = useMemo<EngagementLevel[]>(() => ['low', 'medium', 'high'], []);

  const [segment, setSegment] = useState<Segment>({
    country: countries[0],
    engagement: 'medium',
  });

  const canEdit = role === 'admin';

  const onSave = useCallback(() => {
    auditLogger('created segment');
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-medium tracking-wide text-slate-300/70">Targeting</div>
        <h1 className="mt-1 text-2xl font-semibold text-white">Audience Segments</h1>
        <p className="mt-2 text-sm text-slate-300/70">
          Build simple segments for targeting. Admins can save segments; viewers are read-only.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] backdrop-blur">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-medium tracking-wide text-slate-300/70">COUNTRY</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              value={segment.country}
              onChange={(e) => setSegment((s) => ({ ...s, country: e.target.value }))}
              disabled={!canEdit}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium tracking-wide text-slate-300/70">ENGAGEMENT</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
              value={segment.engagement}
              onChange={(e) => setSegment((s) => ({ ...s, engagement: e.target.value as EngagementLevel }))}
              disabled={!canEdit}
            >
              {engagementLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-300/20 transition hover:from-indigo-400 hover:to-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onSave}
              disabled={!canEdit}
            >
              Save Segment
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-[11px] font-medium tracking-wide text-slate-300/70">PREVIEW</div>
          <div className="mt-3 text-sm text-slate-200">
            Country: <span className="font-medium text-white">{segment.country}</span>
          </div>
          <div className="mt-1 text-sm text-slate-200">
            Engagement: <span className="font-medium text-white">{segment.engagement}</span>
          </div>
        </div>

        {!canEdit && (
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
            Your role is Viewer. Segment creation is disabled.
          </div>
        )}
      </div>
    </div>
  );
 }
