'use client';

import React, { useEffect, useState } from 'react';
import { Game } from '@/types';
import { CheckCircle, X, Loader2, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface StepAccountInfoProps {
  game: Game;
  userId: string;
  setUserId: (val: string) => void;
  zoneId: string;
  setZoneId: (val: string) => void;
  onVerificationChange: (verifiedName: string | null) => void;
}

export const StepAccountInfo: React.FC<StepAccountInfoProps> = ({
  game,
  userId,
  setUserId,
  zoneId,
  setZoneId,
  onVerificationChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);

  // Input change handlers that reset validation state
  const handleUserIdChange = (val: string) => {
    setUserId(val);
    setVerifiedName(null);
    setErrorMsg(null);
    onVerificationChange(null);
  };

  const handleZoneIdChange = (val: string) => {
    setZoneId(val);
    setVerifiedName(null);
    setErrorMsg(null);
    onVerificationChange(null);
  };

  const handleReset = () => {
    setUserId('');
    setZoneId('');
    setVerifiedName(null);
    setErrorMsg(null);
    onVerificationChange(null);
  };

  // Trigger check when input meets the minimum requirements
  useEffect(() => {
    const hasUserId = userId.length >= 5;
    const hasZoneId = !game.needs_zone || zoneId.length >= 3;

    if (!hasUserId || !hasZoneId) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setErrorMsg(null);
      setVerifiedName(null);
      onVerificationChange(null);

      try {
        const url = `/games/${game.slug}/check-id?user_id=${userId}${game.needs_zone ? `&zone_id=${zoneId}` : ''}`;
        const response = await api.get(url);
        const nickname = response.data.data.nickname;
        setVerifiedName(nickname);
        onVerificationChange(nickname);
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message || 'ID Game atau Server tidak ditemukan';
        setErrorMsg(msg);
        onVerificationChange(null);
      } finally {
        setLoading(false);
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(delayDebounce);
  }, [userId, zoneId, game.slug, game.needs_zone, onVerificationChange]);

  return (
    <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-6 space-y-4 shadow-none">
      {/* Header */}
      <div className="flex items-center">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-medium mr-2 shrink-0">
          1
        </span>
        <h3 className="text-base font-medium text-ink-primary">
          Informasi Akun Game
        </h3>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* User ID */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">
            {game.id_field_label || 'User ID'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userId}
            onChange={(e) => handleUserIdChange(e.target.value.replace(/\D/g, ''))}
            placeholder={`Masukkan ${game.id_field_label || 'User ID'}`}
            className="w-full bg-surface-input border-[0.5px] border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 shadow-none disabled:opacity-75 disabled:bg-slate-50"
            disabled={loading}
          />
        </div>

        {/* Zone ID */}
        {game.needs_zone && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">
              {game.zone_field_label || 'Zone ID'}
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={zoneId}
              onChange={(e) => handleZoneIdChange(e.target.value.replace(/\D/g, ''))}
              placeholder="Contoh: (1234)"
              className="w-full bg-surface-input border-[0.5px] border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 shadow-none disabled:opacity-75 disabled:bg-slate-50"
              disabled={loading}
            />
          </div>
        )}
      </div>

      {/* Account Verification States */}
      {loading && (
        <div className="flex items-center gap-2 bg-slate-50 border-[0.5px] border-slate-200 rounded-lg px-4 py-3 mt-3 animate-pulse">
          <Loader2 size={16} className="text-brand-navy animate-spin shrink-0" />
          <span className="text-sm text-slate-600 font-medium">
            Memverifikasi ID Game Anda...
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 bg-red-50 border-[0.5px] border-red-200 rounded-lg px-4 py-3 mt-3 animate-fade-in">
          <AlertCircle size={16} className="text-red-600 shrink-0" />
          <span className="text-sm text-red-600 font-medium">
            {errorMsg}
          </span>
        </div>
      )}

      {verifiedName && (
        <div className="flex items-center gap-2 bg-status-success-bg border-[0.5px] border-status-success-border rounded-lg px-4 py-3 mt-3 animate-fade-in">
          <CheckCircle size={16} className="text-status-success shrink-0" />
          <span className="text-sm text-status-success font-medium">
            Akun terverifikasi: <strong>{verifiedName}</strong>
          </span>
          <button 
            onClick={handleReset}
            className="ml-auto text-status-success/60 hover:text-status-success transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Helper Links */}
      <div className="flex flex-col gap-1 pt-1">
        {verifiedName && (
          <button 
            type="button" 
            onClick={handleReset}
            className="text-xs text-brand-navy text-left font-medium hover:underline"
          >
            Bukan akunmu? Ubah User ID &rarr;
          </button>
        )}
        <p className="text-xs text-ink-hint leading-relaxed">
          ⓘ Untuk menemukan {game.id_field_label || 'User ID'} Anda, klik avatar profil Anda di dalam game.
        </p>
      </div>
    </div>
  );
};

export default StepAccountInfo;
