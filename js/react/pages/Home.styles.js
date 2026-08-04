import styled from "styled-components";
import { Link } from "react-router-dom";

export const VideoBanner = styled.div`
  position: relative;
  height: clamp(320px, 55vh, 560px);
  overflow: hidden;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.55) saturate(0.8);
  }
`;

export const VideoOverlay = styled.div`
  position: absolute;
  isolation: isolate;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(10, 10, 11, 0.55) 60%,
    ${({ theme }) => theme.bg} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  p {
    position: relative;
    z-index: 1;
    font-family: ${({ theme }) => theme.fontDisplay};
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #fff;
    text-shadow: 0 4px 32px rgba(0, 0, 0, 0.6);
  }
`;

export const OverlayIcon = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  object-fit: contain;
  opacity: 0.3;
  pointer-events: none;
  filter: blur(1px);
  z-index: 0;
`;

export const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 40px 24px 20px;
`;

export const ShowMore = styled(Link)`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  p {
    font-family: ${({ theme }) => theme.fontBody};
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textMuted};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 99px;
    padding: 10px 28px;
    transition: color 0.18s, border-color 0.18s, background 0.18s;
  }

  &:hover p {
    color: ${({ theme }) => theme.brand};
    border-color: ${({ theme }) => theme.brand};
    background: ${({ theme }) => theme.brandDim};
  }
`;
