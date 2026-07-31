import { useEffect, useRef } from "react";

// Fills the track with clones of the original content until it's at least twice
// the viewport width, then continuously scrolls it leftward, looping seamlessly.
// Port of js/entities/Scroller.js as a self-contained React component.
export default function MarqueeTicker() {
  const trackRef    = useRef(null);
  const originalRef = useRef(null);

  useEffect(() => {
    const track    = trackRef.current;
    const original = originalRef.current;
    if (!track || !original) return;

    const clones = [];
    while (track.offsetWidth < window.innerWidth * 2) {
      const clone = original.cloneNode(true);
      track.appendChild(clone);
      clones.push(clone);
    }

    let x = 0;
    const speed = 2;
    const singleWidth = original.offsetWidth;
    let frameId;

    function animate() {
      x -= speed;
      if (Math.abs(x) >= singleWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      clones.forEach(clone => clone.remove());
      track.style.transform = "";
    };
  }, []);

  return (
    <div className="spinthingwhatever">
      <div className="scrollTrack" id="scrollTrack" ref={trackRef}>
        <div className="scrollContent" id="original" ref={originalRef}>
          <p>Mail A Bomb</p>
          <p>|</p>
          <p>Its awesome</p>
          <p>|</p>
          <p>We hate people</p>
          <p>|</p>
          <p>We love bombs</p>
          <p>|</p>
        </div>
      </div>
    </div>
  );
}
