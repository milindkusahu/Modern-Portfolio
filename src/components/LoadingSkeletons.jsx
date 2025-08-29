export const LiveCodeEditorSkeleton = () => (
  <div className="bg-zinc-800/50 p-4 rounded-xl animate-pulse">
    <div className="h-6 bg-zinc-700/50 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-zinc-700/50 rounded mb-4"></div>
    <div className="h-32 bg-zinc-700/50 rounded mb-4"></div>
    <div className="h-10 bg-zinc-700/50 rounded w-24 mb-4"></div>
    <div className="h-24 bg-zinc-700/50 rounded"></div>
  </div>
);

export const GithubCalenderSkeleton = () => (
  <div className="h-[250px] w-full bg-zinc-800/50 rounded-xl animate-pulse"></div>
);

export const MediumBlogSkeleton = () => (
  <div className="space-y-8">
    <div className="h-10 bg-zinc-800/50 rounded w-1/3 animate-pulse"></div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-zinc-800/50 rounded-xl h-96 animate-pulse">
          <div className="h-48 bg-zinc-700/50"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-zinc-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700/50 rounded"></div>
            <div className="h-4 bg-zinc-700/50 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
