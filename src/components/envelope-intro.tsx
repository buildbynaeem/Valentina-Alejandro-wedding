import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ──────────────────────────────────────────────────────────────
// Set to 500ms longer than the actual video duration to guarantee the natural
// onEnded handler fires first. Update this if the video length changes.
const FAILSAFE_MS = 8500;

// ─── Component ──────────────────────────────────────────────────────────────
export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  // Strict state machine — component is always locked in 'idle' on mount.
  const [envelopeState, setEnvelopeState] = useState<"idle" | "opening" | "opened">("idle");

  const videoRef      = useRef<HTMLVideoElement>(null);
  const failsafeRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Seek to first frame so the video acts as a static poster while idle ──
  // No timers are started here — this is purely a visual initialisation.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => { video.currentTime = 0.001; };
    video.addEventListener("loadedmetadata", onMeta);
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // ── Complete unmount when state reaches 'opened' ─────────────────────────
  // Returning null removes the video and overlay entirely from the DOM so
  // there are no z-index ghosts or click-blocking layers on iPhones.
  if (envelopeState === "opened") {
    return null;
  }

  // ── "Tap to Open" click handler ──────────────────────────────────────────
  // Only reachable when envelopeState === 'idle'. Executes in strict order:
  //   1. Lock state so double-taps are ignored
  //   2. Unmute (required so audio plays after the initial muted load)
  //   3. Play (returns a Promise — .catch handles Safari/WebKit rejection)
  //   4. Start failsafe timer ONLY here, never on mount
  const handleTap = () => {
    if (envelopeState !== "idle") return;
    const video = videoRef.current;
    if (!video) return;

    // Step 1 — lock
    setEnvelopeState("opening");

    // Step 2 — unmute so audio plays
    video.muted = false;

    // Step 3 — play (Promise-safe for Safari)
    video.currentTime = 0;
    video.play().catch((e) => {
      console.log("iOS play() blocked:", e);
      // If Safari refuses to play, skip straight to opened
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
      setEnvelopeState("opened");
      onDone();
    });

    // Step 4 — failsafe timer (started ONLY on tap, never on mount)
    failsafeRef.current = setTimeout(() => {
      setEnvelopeState("opened");
      onDone();
    }, FAILSAFE_MS);
  };

  // ── Natural video completion handler ─────────────────────────────────────
  const handleEnded = () => {
    // Destroy the failsafe so it doesn't fire after the video already finished
    if (failsafeRef.current) {
      clearTimeout(failsafeRef.current);
      failsafeRef.current = null;
    }
    setEnvelopeState("opened");
    // Small pause before revealing the site gives a smoother feel
    setTimeout(onDone, 400);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div
        key="envelope-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] select-none overflow-hidden"
        // Clicking anywhere on the overlay triggers the tap handler
        onClick={handleTap}
        style={{ cursor: envelopeState === "idle" ? "pointer" : "default" }}
      >
        {/* ── Video ──────────────────────────────────────────────────────── */}
        {/* muted={true} is required so mobile browsers allow loading/preload. */}
        {/* We unmute imperatively inside handleTap before calling .play().    */}
        {/* poster="/envelope-poster.jpg" — add a static frame image here      */}
        {/* once you have one; the loadedmetadata seek handles it for now.     */}
        <video
          ref={videoRef}
          playsInline                  /* prevents iOS fullscreen takeover  */
          muted                        /* required for mobile preload        */
          preload="auto"               /* buffer before the tap              */
          poster="/envelope-poster.webp"
          onEnded={handleEnded}        /* natural completion path            */
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/envelope.webm" type="video/webm" />
          <source src="/envelope.mp4"  type="video/mp4"  />
        </video>

        {/* ── "Tap to open" overlay — only shown in idle state ───────────── */}
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
