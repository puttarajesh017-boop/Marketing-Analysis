import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { auditLogger } from '../utils/auditLogger';

type EngagementLevel = 'low' | 'medium' | 'high';

type Segment = {
  country: string;
  engagement: EngagementLevel;
};

type DropdownOption<T extends string> = {
  label: string;
  value: T;
};

function DropdownSelect<T extends string>({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  disabled: boolean;
  onChange: (next: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const selected = useMemo(() => options.find((o) => o.value === value) ?? options[0], [options, value]);

  return (
    <div ref={rootRef} className="relative">
      <label className="text-xs font-medium tracking-wide text-slate-300/70">{label}</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition hover:bg-white/10 focus:ring-pink-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="truncate">{selected?.label}</span>
        <span className="text-slate-300/70">▾</span>
      </button>

      {open && !disabled && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="max-h-56 overflow-auto p-1">
            {options.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={
                    active
                      ? 'flex w-full items-center justify-between rounded-lg bg-pink-500/15 px-3 py-2 text-left text-sm font-semibold text-pink-100 ring-1 ring-pink-400/20'
                      : 'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-100 hover:bg-white/10'
                  }
                >
                  <span className="truncate">{opt.label}</span>
                  {active ? <span className="text-pink-200">✓</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
          <DropdownSelect
            label="COUNTRY"
            value={segment.country}
            options={countries.map((c) => ({ label: c, value: c }))}
            disabled={!canEdit}
            onChange={(next) => setSegment((s) => ({ ...s, country: next }))}
          />

          <DropdownSelect
            label="ENGAGEMENT"
            value={segment.engagement}
            options={engagementLevels.map((lvl) => ({ label: lvl, value: lvl }))}
            disabled={!canEdit}
            onChange={(next) => setSegment((s) => ({ ...s, engagement: next }))}
          />

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
