import React, { useRef } from 'react';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="360" controls>
        <source src={src} type="video/mp4" />
        Ihr Browser unterstützt das Video-Tag nicht.
      </video>
      <div>
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
        {/* Du kannst hier weitere Steuerelemente hinzufügen */}
      </div>
    </div>
  );
}

export default VideoPlayer;
