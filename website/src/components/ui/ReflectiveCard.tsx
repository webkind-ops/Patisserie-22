import React, { useEffect, useRef, useId, useState } from 'react';
import './ReflectiveCard.css';

export interface ReflectiveCardProps {
  blurStrength?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  overlayColor?: string;
  displacementStrength?: number;
  noiseScale?: number;
  specularConstant?: number;
  grayscale?: number;
  glassDistortion?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Global stream cache to share a single lightweight camera stream across cards
let sharedStream: MediaStream | null = null;
let streamListeners = 0;

export const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  blurStrength = 10,
  color = '#1a102b',
  metalness = 0.8,
  roughness = 0.3,
  overlayColor = 'rgba(255, 255, 255, 0.45)',
  displacementStrength = 20,
  noiseScale = 1.2,
  specularConstant = 1.4,
  grayscale = 0.4,
  glassDistortion = 10,
  className = '',
  style = {},
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const rawId = useId();
  const filterId = `metallic-displacement-${rawId.replace(/:/g, '')}`;

  useEffect(() => {
    let isMounted = true;

    const initCamera = async () => {
      try {
        if (!sharedStream && typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
          sharedStream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 480 },
              height: { ideal: 360 },
              facingMode: 'user',
            },
          });
        }

        if (sharedStream && isMounted && videoRef.current) {
          videoRef.current.srcObject = sharedStream;
          videoRef.current.play().catch(() => {});
          setHasCamera(true);
          streamListeners++;
        }
      } catch (err) {
        // Camera access denied or not available - uses ambient reflective glass fallback
        setHasCamera(false);
      }
    };

    initCamera();

    return () => {
      isMounted = false;
      streamListeners = Math.max(0, streamListeners - 1);
      if (streamListeners === 0 && sharedStream) {
        sharedStream.getTracks().forEach((t) => t.stop());
        sharedStream = null;
      }
    };
  }, []);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation,
  } as React.CSSProperties;

  return (
    <div
      className={`reflective-card-container ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency={baseFrequency}
              numOctaves={2}
              result="noise"
            />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
            <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      {/* Video Reflection layer with custom filter */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="reflective-video"
        style={{ filter: `saturate(var(--saturation, 0.7)) contrast(115%) brightness(110%) blur(var(--blur-strength, 10px)) url(#${filterId})` }}
      />

      {/* Ambient gradient layer when camera is off/denied */}
      {!hasCamera && <div className="reflective-fallback-bg" />}

      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />

      <div className="reflective-content">
        {children}
      </div>
    </div>
  );
};

export default ReflectiveCard;
