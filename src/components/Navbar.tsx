import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { setRole, type UserRole } from '../store/userSlice';
import { useCallback } from 'react';

function linkClassName({ isActive }: { isActive: boolean }) {
  return [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-white/15 text-white ring-1 ring-white/20'
      : 'text-slate-200/80 hover:bg-white/10 hover:text-white',
  ].join(' ');
}

export default function Navbar() {
  const role = useSelector((s: RootState) => s.user.role);
  const dispatch = useDispatch<AppDispatch>();

  const onChangeRole = useCallback(
    (nextRole: UserRole) => {
      dispatch(setRole(nextRole));
    },
    [dispatch]
  );

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/20">
            <div className="h-4 w-4 rounded-sm bg-white/90" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-5 text-white">Marketing Analytics</div>
            <div className="text-xs text-slate-300/80">Campaign Dashboard</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink to="/" className={linkClassName} end>
            Dashboard
          </NavLink>
          <NavLink to="/segments" className={linkClassName}>
            Segments
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full bg-white/5 px-3 py-2 text-xs text-slate-200/80 ring-1 ring-white/10 sm:block">
            Role
          </div>
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]">
            <button
              type="button"
              onClick={() => onChangeRole('admin')}
              className={
                role === 'admin'
                  ? 'rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-400/30'
                  : 'rounded-full px-3 py-1.5 text-sm font-medium text-slate-200/80 hover:bg-white/10 hover:text-white'
              }
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => onChangeRole('viewer')}
              className={
                role === 'viewer'
                  ? 'rounded-full bg-sky-500/20 px-3 py-1.5 text-sm font-semibold text-sky-100 ring-1 ring-sky-400/30'
                  : 'rounded-full px-3 py-1.5 text-sm font-medium text-slate-200/80 hover:bg-white/10 hover:text-white'
              }
            >
              Viewer
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-4 sm:hidden sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClassName} end>
            Dashboard
          </NavLink>
          <NavLink to="/segments" className={linkClassName}>
            Segments
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
