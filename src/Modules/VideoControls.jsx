import { ButtonUI } from "../UI-Components/ButtonUI";
import { Slider } from "../UI-Components/Slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../UI-Components/Dropdown";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
} from "lucide-react";

export default function VideoControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  playbackRate,
  qualities,
  currentQuality,
  isHLS,
  onTogglePlay,
  onSeek,
  onSeekTo,
  onVolumeChange,
  onPlaybackRateChange,
  onQualityChange,
  formatTime,
  showControls,
}) {
  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleProgressChange = (value) => {
    onSeekTo((value[0] / 100) * duration);
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[duration ? (currentTime / duration) * 100 : 0]}
          onValueChange={handleProgressChange}
          className="w-full progress-slider"
        />
      </div>

      <div className="flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          {/* Play/Pause */}
          <ButtonUI
            variant="ghost"
            size="icon"
            onClick={onTogglePlay}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </ButtonUI>

          {/* Rewind */}
          <ButtonUI
            variant="ghost"
            size="icon"
            onClick={() => onSeek(-10)}
            className="text-white hover:bg-white/20"
          >
            <SkipBack className="h-4 w-4" />
          </ButtonUI>

          {/* Forward */}
          <ButtonUI
            variant="ghost"
            size="icon"
            onClick={() => onSeek(10)}
            className="text-white hover:bg-white/20"
          >
            <SkipForward className="h-4 w-4" />
          </ButtonUI>

          {/* Volume */}
          <div className="flex items-center space-x-2 mr-4">
            <ButtonUI
              variant="ghost"
              size="icon"
              onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
              className="text-white hover:bg-white/20"
            >
              {volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </ButtonUI>
            <div className="w-20">
              <Slider
                value={[volume * 100]}
                onValueChange={(value) => onVolumeChange(value[0] / 100)}
                className="volume-slider"
              />
            </div>
          </div>

          {/* Time Display */}
          <span className="text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Playback Speed */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ButtonUI
                variant="ghost"
                className="text-white hover:bg-white/20 text-sm"
              >
                {playbackRate}x
              </ButtonUI>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {playbackSpeeds.map((speed) => (
                <DropdownMenuItem
                  key={speed}
                  onClick={() => onPlaybackRateChange(speed)}
                  className={playbackRate === speed ? "bg-blue-100" : ""}
                >
                  {speed}x
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quality Selector */}
          {isHLS && qualities.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ButtonUI
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-4 w-4" />
                </ButtonUI>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onQualityChange(-1)}
                  className={currentQuality === -1 ? "bg-blue-100" : ""}
                >
                  Auto
                </DropdownMenuItem>
                {qualities.map((quality) => (
                  <DropdownMenuItem
                    key={quality.level}
                    onClick={() => onQualityChange(quality.level)}
                    className={
                      currentQuality === quality.level ? "bg-blue-100" : ""
                    }
                  >
                    {quality.height}p
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Fullscreen */}
          <ButtonUI
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => {
              const video = document.querySelector("video");
              if (video?.requestFullscreen) {
                video.requestFullscreen();
              }
            }}
          >
            <Maximize className="h-4 w-4" />
          </ButtonUI>
        </div>
      </div>
    </div>
  );
}
