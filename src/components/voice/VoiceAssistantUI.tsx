"use client";

import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { computeFaceMetrics } from "@/lib/scoring-engine";
import { useBeautyStore } from "@/lib/store";

export function WebcamTracker({
  onFaceData,
}: {
  onFaceData?: (landmarks: number[][]) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState("Loading camera...");
  const setGuidanceScore = useBeautyStore((state) => state.setGuidanceScore);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationId = 0;
    let landmarker: FaceLandmarker | null = null;
    let cancelled = false;

    const init = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus("This browser does not support webcam access.");
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 640, height: 480 },
          audio: false,
        });

        const video = videoRef.current;
        if (!video) return;

        video.srcObject = stream;
        await video.play();
        setStatus("Tracking your face...");

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm",
        );

        landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });

        const tick = () => {
          if (cancelled || !video || !landmarker) return;

          const result = landmarker.detectForVideo(video, performance.now());
          const landmarks = result.landmarks?.[0];

          if (landmarks && onFaceData) {
            onFaceData(landmarks);
            const metrics = computeFaceMetrics(landmarks);
            setGuidanceScore(metrics);
          }

          animationId = requestAnimationFrame(tick);
        };

        tick();
      } catch (error) {
        console.error(error);
        setStatus("Camera access denied or failed. Please allow webcam permissions.");
      }
    };

    init();

    return () => {
      cancelled = true;
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onFaceData, setGuidanceScore]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0a1018]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="h-[500px] w-full object-cover scale-x-[-1]"
      />
      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
        {status}
      </div>
    </div>
  );
}
