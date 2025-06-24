import VideoPlayer from "./VideoPlayer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Custom HLS Video Player
        </h1>
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Home;
