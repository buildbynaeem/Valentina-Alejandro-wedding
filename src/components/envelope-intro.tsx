import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage = "idle" | "playing" | "done";

export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState<Stage>("idle");

  // Seek to first frame so the video acts as a poster while idle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleMeta = () => {
      video.currentTime = 0.001;
    };
    video.addEventListener("loadedmetadata", handleMeta);
    return () => video.removeEventListener("loadedmetadata", handleMeta);
  }, []);

  // Listen for video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnd = () => {
      setTimeout(() => {
        setStage("done");
        setTimeout(onDone, 800);
      }, 150);
    };
    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [onDone]);

  const handleTap = () => {
    if (stage !== "idle") return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setStage("playing");
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="envelope-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] cursor-pointer select-none"
          onClick={handleTap}
        >
          {/* Video — shows first frame in idle, plays in playing */}
          <video
            ref={videoRef}
            src="/envelope.mp4"
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* "Tap to open" overlay — only in idle */}
          <AnimatePresence>
            {stage === "idle" && (
              <motion.div
                key="tap-hint"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 pointer-events-none"
              >
                {/* Text */}
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="font-serif italic text-white/80 text-sm tracking-widest"
                >
                  tap to open
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
