import { useState, useRef, useEffect } from "react";
import Hls from "hls.js";
import VideoControls from "./VideoControls";
import CommentsSection from "./CommentsSection";
import VideoInteractions from "./VideoInteractions";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const hlsUrl =
    "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8";
  const mp4Url =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualities, setQualities] = useState([]);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const [isHLS, setIsHLS] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const initializePlayer = () => {
      if (isHLS && Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const levels = hls.levels.map((level, index) => ({
            level: index,
            height: level.height,
            bitrate: level.bitrate,
          }));
          setQualities(levels);
          setCurrentQuality(hls.currentLevel);
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          setCurrentQuality(data.level);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
      } else {
        video.src = mp4Url;
        setIsHLS(false);
      }
    };

    initializePlayer();

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleVolumeChange = () => setVolume(video.volume);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [hlsUrl, mp4Url, isHLS]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.currentTime + time, duration)
    );
  };

  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (rate) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleQualityChange = (level) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
      setCurrentQuality(level);
    }
  };

  const handleSeekTo = (time) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
  };

  const addBookmark = () => {
    if (!bookmarks.includes(currentTime)) {
      setBookmarks([...bookmarks, currentTime]);
    }
  };

  const toggleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg ">
      <div
        className="relative bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          playbackRate={playbackRate}
          qualities={qualities}
          currentQuality={currentQuality}
          isHLS={isHLS}
          onTogglePlay={togglePlay}
          onSeek={seek}
          onSeekTo={handleSeekTo}
          onVolumeChange={handleVolumeChange}
          onPlaybackRateChange={handlePlaybackRateChange}
          onQualityChange={handleQualityChange}
          formatTime={formatTime}
          showControls={showControls}
        />
      </div>

      <VideoInteractions
        currentTime={currentTime}
        bookmarks={bookmarks}
        likes={likes}
        isLiked={isLiked}
        onAddBookmark={addBookmark}
        onToggleLike={toggleLike}
        onSeekTo={handleSeekTo}
        formatTime={formatTime}
      />

      <CommentsSection />
    </div>
  );
};

export default VideoPlayer;
