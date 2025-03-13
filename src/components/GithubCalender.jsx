import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";

function GithubCalender() {
  const [isLoaded, setIsLoaded] = useState(false);

  const LoadingPlaceholder = () => (
    <div className="h-[250px] w-full bg-zinc-800/50 rounded-xl animate-pulse"></div>
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const theme = {
    dark: [
      "#1e1e1e", // level0 - almost black background
      "#103a1c", // level1 - very dark green
      "#0e6e2c", // level2 - mid dark green
      "#16a34a", // level3 - bright green
      "#22c55e", // level4 - very bright green
    ],
  };

  return (
    <div className="github-calendar-wrapper">
      {!isLoaded ? (
        <LoadingPlaceholder />
      ) : (
        <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
          <GitHubCalendar
            username="milindkusahu"
            blockSize={15}
            blockMargin={4}
            fontSize={16}
            theme={theme}
            colorScheme="dark"
            className="w-full"
            style={{
              color: "rgb(161, 161, 170)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GithubCalender;
