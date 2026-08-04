import { useEffect, useRef } from "react";
import styled from "styled-components";

const TickerWrap = styled.div`
  width: 100%;
  height: 48px;
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  transition: background 0.3s;
`;

const ScrollTrack = styled.div`
  display: flex;
  width: max-content;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
`;

const ScrollContent = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;

  p {
    font-family: ${({ theme }) => theme.fontDisplay};
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textMuted};
    margin-right: 36px;
  }
`;

// Fills the track with clones of the original content until it's at least twice the viewport width, then continuously scrolls it leftward, looping seamlessly.
// Port of js/entities/Scroller.js as a self-contained React component.
export default function MarqueeTicker() {
  const trackRef = useRef(null);
  const originalRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
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
      clones.forEach((clone) => clone.remove());
      track.style.transform = "";
    };
  }, []);

  return (
    <TickerWrap>
      <ScrollTrack ref={trackRef}>
        <ScrollContent ref={originalRef}>
          <p>Mail A Bomb</p>
          <p>|</p>
          <p>Its awesome</p>
          <p>|</p>
          <p>We hate people</p>
          <p>|</p>
          <p>We love bombs</p>
          <p>|</p>
        </ScrollContent>
      </ScrollTrack>
    </TickerWrap>
  );
}
