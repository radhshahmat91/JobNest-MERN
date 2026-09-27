import { useRef } from 'react';

export default function VideoBackdrop(){
  const firstVideoRef = useRef(null);

  const handleFirstEnded = () => {
    const secondVideo = document.getElementById('jobnest-second-video');
    if (secondVideo) {
      if (firstVideoRef.current) firstVideoRef.current.style.display = 'none';
      secondVideo.style.display = 'block';
      secondVideo.currentTime = 0;
      secondVideo.play().catch(() => {});
    }
  };

  return <div className="video-backdrop" aria-hidden="true">
    <video
      ref={firstVideoRef}
      className="video-backdrop-player"
      src="/videos/uhd_30fps.mp4"
      autoPlay
      muted
      playsInline
      onEnded={handleFirstEnded}
      preload="auto"
    />
    <video
      id="jobnest-second-video"
      className="video-backdrop-player video-backdrop-second"
      src="/videos/6774781-uhd_3840_2160_30fps.mp4"
      muted
      playsInline
      preload="auto"
    />
    <div className="video-wash"/>
  </div>
}
