import VideoPlayer from "./VideoPlayer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
      <div className=" mx-auto px-4">
        <h1 className="text-3xl font-bold text-center">
          Custom HLS Video Player
        </h1>
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Home;
