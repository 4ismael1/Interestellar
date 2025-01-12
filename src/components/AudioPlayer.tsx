import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface AudioPlayerProps {
  autoplay?: boolean;
}

const AudioPlayer = ({ autoplay = false }: AudioPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const audioRef = useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Playback prevented:", error);
        setIsPlaying(false);
      });
    }
  }, [autoplay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.volume = 0.3;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Playback prevented:", error);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(error => {
      console.log("Playback prevented:", error);
      setIsPlaying(false);
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
      <audio
        ref={audioRef}
        src="/music/theme.mp3"
        onEnded={handleEnded}
      />
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
          aria-label="Play"
        >
          <Play className="w-6 h-6 text-white" />
        </button>
      )}
      <button
        onClick={toggleMute}
        className="p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;