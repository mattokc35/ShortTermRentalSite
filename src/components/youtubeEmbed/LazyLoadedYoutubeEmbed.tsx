import React, { FC, Suspense } from "react";

// Lazy load the YouTubeEmbed component
const LazyYouTubeEmbed = React.lazy(() => require("./YouTubeEmbed"));

const LazyLoadedYouTubeEmbed: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyYouTubeEmbed />
    </Suspense>
  );
};

export default LazyLoadedYouTubeEmbed;
