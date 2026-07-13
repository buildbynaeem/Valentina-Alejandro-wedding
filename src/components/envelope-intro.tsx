import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Duration of envelope.webm in ms — failsafe fires at VIDEO_DURATION_MS + 500ms
const VIDEO_DURATION_MS = 8000;

type EnvelopeState = "idle" | "opening" | "opened";

export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>("idle");
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Measure #1: Seek to first frame so it acts as a poster while idle ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleMeta = () => {
      video.currentTime = 0.001;
    };
    video.addEventListener("loadedmetadata", handleMeta);
    return () => video.removeEventListener("loadedmetadata", handleMeta);
  }, []);

  // ── Measure #2: Listen for video end (normal path) ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnd = () => {
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
      setTimeout(() => {
        setEnvelopeState("opened");
        setTimeout(onDone, 800);
      }, 150);
    };
    video.addEventListener("ended", handleEnd);
    return () => video.removeEventListener("ended", handleEnd);
  }, [onDone]);

  const handleTap = () => {
    if (envelopeState !== "idle") return;
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setEnvelopeState("opening");

    // ── Measure #3: Failsafe timeout — fires if onEnded never triggers (iOS stall) ──
    failsafeRef.current = setTimeout(() => {
      setEnvelopeState("opened");
      onDone();
    }, VIDEO_DURATION_MS + 500); // slight buffer over video length

    // ── Measure #2: Catch the Safari Promise rejection ──
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("iOS blocked video play — bypassing to open state.");
        if (failsafeRef.current) clearTimeout(failsafeRef.current);
        setEnvelopeState("opened");
        onDone();
      });
    }
  };

  // ── Measure #4: Completely unmount once opened — never just hide with CSS ──
  if (envelopeState === "opened") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] cursor-pointer select-none"
        onClick={handleTap}
      >
        {/* Video — explicit iOS attributes to block native player takeover */}
        <video
          ref={videoRef}
          playsInline={true}   /* crucial for iOS — prevents fullscreen takeover */
          muted={true}          /* required for autoplay policies              */
          autoPlay={false}      /* we control play() manually on tap           */
          preload="auto"        /* buffer the file before the tap              */
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/envelope.webm" type="video/webm" />
        </video>

        {/* "Tap to open" overlay — only shown in idle state */}
        <AnimatePresence>
          {envelopeState === "idle" && (
            <motion.div
              key="tap-hint"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 pointer-events-none"
            >
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
    </AnimatePresence>
  );
}
