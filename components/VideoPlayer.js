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
  const [playbackRate, setPlaybackRate] = useState(1); // Anfangsgeschwindigkeit ist 1x
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
            <span className='controlsTime'>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</span>
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
            <span className='controlsTime'>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</span>
          </div>

          <div className='controls'>

            <a onClick={goBack}>Zurück</a>

            <button onClick={togglePlay}>{isPlaying ? (
              <svg className="pause-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            ) : (
              <svg className="play-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            )}</button>

            <button className='controlsIcon' onClick={() => handleSkip(-10)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 5V1L3 10L12 19V15H21V9H12V5M12 10.47L6.26 10L9.16 6.59L7.59 5L2.59 10L7.59 15L9.16 13.41L6.26 10H12V10.47Z" />
                <text x="14" y="18" fill="currentColor" fontSize={10}>10</text>
              </svg>
            </button>

            <button className='controlsIcon' onClick={() => handleSkip(10)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 5V1L21 10L12 19V15H3V9H12V5M12 10.53L17.74 10L14.84 6.59L16.41 5L21.41 10L16.41 15L14.84 13.41L17.74 10H12V10.53Z" />
                <text x="4" y="18" fill="currentColor" fontSize={10}>10</text>
              </svg>
            </button>

            <div className='volume_container'>
              <button onClick={toggleMute}>{isMuted ? (
                <svg className="volume-muted-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                </svg>
              ) : (
                <svg className="volume-high-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
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
