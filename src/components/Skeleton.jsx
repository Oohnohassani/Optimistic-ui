// Skeleton loader 💀 (matched to neutral-900 / neutral-800 UI)
function Skeleton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-900">
      <div className="flex w-105 flex-col items-center justify-center gap-2 rounded-lg border border-[#262626] bg-neutral-800 p-3">
        {/* Profile skeleton */}
        <div className="flex h-full w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-700" />

            <div className="flex flex-col gap-2">
              {/* Username */}
              <div className="h-3 w-24 animate-pulse rounded-full bg-neutral-700" />
              {/* Date */}
              <div className="h-2 w-16 animate-pulse rounded-full bg-neutral-700" />
            </div>
          </div>
        </div>

        {/* Text skeleton */}
        <div className="my-2 flex w-full flex-col gap-2">
          <div className="h-2 w-full animate-pulse rounded-full bg-neutral-700" />
          <div className="h-2 w-3/4 animate-pulse rounded-full bg-neutral-700" />
        </div>

        {/* Image skeleton */}
        <div className="h-52 w-full animate-pulse rounded-lg bg-neutral-700" />

        {/* Stats skeleton */}
        <div className="mt-2 flex w-full items-center justify-between gap-3 px-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-8 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-4 w-8 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-4 w-8 animate-pulse rounded-full bg-neutral-700" />
          </div>

          <div className="h-4 w-8 animate-pulse rounded-full bg-neutral-700" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
