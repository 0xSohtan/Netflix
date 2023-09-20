import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';


function VideoPlayer({ src, title, id, name }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const videoContainerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  let hideControlsTimeout;

  useEffect(() => {

    const showControls = () => {
      setControlsVisible(true);
      clearTimeout(hideControlsTimeout);
      hideControlsTimeout = setTimeout(() => {
        setControlsVisible(false);
      }, 5000); // Steuerelemente nach 5 Sekunden ausblenden
    };

    const videoContainer = videoContainerRef.current;

    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "k":
          togglePlay();
          break;
        case "f":
          handleFullScreen();
          break;
        // case "t":
        //   toggleTheaterMode();
        //   break;
        // case "i":
        //   toggleMiniPlayerMode();
        //   break;
        case "m":
          toggleMute();
          break;
        case "arrowleft":
        case "j":
          handleSkip(-5);
          break;
        case "arrowright":
        case "l":
          handleSkip(5);
          break;
        case "b":
          goBack();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    videoContainer.addEventListener('mousemove', showControls);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      videoContainer.removeEventListener('mousemove', showControls);
      clearTimeout(hideControlsTimeout);
    };
  }, []);

  const goBack = () => {
    router.back();
  };

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = () => {
    const volume = volumeSliderRef.current.value;
    videoRef.current.volume = volume;
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSkip = (amount) => {
    videoRef.current.currentTime += amount;
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement == null) {
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen);
  };

  function truncateTitle(title, maxLength = 30) {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
  }

  const changePlaybackSpeed = () => {
    let newPlaybackRate = playbackRate + 0.25;
    if (newPlaybackRate > 2) {
      newPlaybackRate = 1; // Startet den Rückwärtsmodus
    } else if (newPlaybackRate < 1) {
      newPlaybackRate = 1.25; // Startet den Vorwärtsmodus
    }
    setPlaybackRate(newPlaybackRate);
    videoRef.current.playbackRate = newPlaybackRate;
  };

  return (
    <div className='video_container' ref={videoContainerRef}>
      <video
        ref={videoRef}
        controls={false}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className='video'
      >
        <source src={src} type="video/mp4" />
      </video>
      {controlsVisible && (
        <div className='video_controls_container'>

          <div className='timeline_container'>
            <span className='controlsTime_left'>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              className='timeline-slider'
              onChange={(e) => {
                videoRef.current.currentTime = e.target.value;
              }}
            />
            <span className='controlsTime_right'>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</span>
          </div>

          <div className='controls'>

            <a onClick={goBack}>Zurück</a>

            <button onClick={togglePlay}>{isPlaying ? (
              <span className="material-symbols-outlined">
                pause
              </span>
            ) : (
              <span className="material-symbols-outlined">
                play_arrow
              </span>
            )}</button>

            <button className='controlsIcon' onClick={() => handleSkip(-10)}>
              <span className="material-symbols-outlined">
                replay_10
              </span>
            </button>

            <button className='controlsIcon' onClick={() => handleSkip(10)}>
              <span className="material-symbols-outlined">
                forward_10
              </span>
            </button>

            <div className='volume_container'>
              <button onClick={toggleMute}>{isMuted ? (
                <span className="material-symbols-outlined">
                  volume_mute
                </span>
              ) : (
                <span className="material-symbols-outlined">
                  volume_up
                </span>
              )}</button>
              <input ref={volumeSliderRef} className='volume_slider' type='range' min={0} max={1} step={0.01} onChange={handleVolumeChange} />
            </div>

            <div className='video_info'>
              <p style={{ color: 'white' }} title={name}>{truncateTitle(name)}</p>
              <p>Episode: {id}</p>
              <p title={title}>{truncateTitle(title)}</p>
            </div>

            <button className='speed_btn wide_btn' onClick={changePlaybackSpeed}>
              {playbackRate}x
            </button>

            <button onClick={handleFullScreen}>{isFullscreen ? (
              <svg className="close" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg className="open" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
