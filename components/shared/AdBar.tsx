"use client";

/** Bottom ad strip — matches free version of GunjanApps ABC Preschool */
export function AdBar() {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-2">
      <div className="h-6 w-8 rounded bg-gray-200" aria-hidden />
      <span className="truncate text-[9px] font-semibold text-gray-700">Preschool Learning Games</span>
      <span className="rounded bg-red-500 px-2 py-0.5 text-[8px] font-bold text-white">Install</span>
    </div>
  );
}
