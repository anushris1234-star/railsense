import { motion } from "motion/react";

function TrainIcon() {
  return (
    <motion.svg
      viewBox="0 0 180 70"
      className="train-svg"
      aria-label="Train"
      initial={{ y: 0 }}
      animate={{ y: [0, -1.5, 0] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Main locomotive */}
      <rect
        x="10"
        y="17"
        width="92"
        height="34"
        rx="5"
        fill="#18324A"
      />

      {/* Locomotive front */}
      <path
        d="M102 25 L116 25 L130 38 L130 51 L102 51 Z"
        fill="#18324A"
      />

      {/* Coach */}
      <rect
        x="132"
        y="22"
        width="38"
        height="29"
        rx="3"
        fill="#526675"
      />

      {/* Windows */}
      <rect x="18" y="23" width="18" height="13" rx="2" fill="#DCE5E8" />
      <rect x="41" y="23" width="18" height="13" rx="2" fill="#DCE5E8" />
      <rect x="64" y="23" width="18" height="13" rx="2" fill="#DCE5E8" />

      <rect x="140" y="27" width="12" height="10" rx="1.5" fill="#DCE5E8" />
      <rect x="156" y="27" width="9" height="10" rx="1.5" fill="#DCE5E8" />

      {/* Front windshield */}
      <path
        d="M105 28 L114 28 L123 37 L105 37 Z"
        fill="#DCE5E8"
      />

      {/* Headlight */}
      <circle cx="124" cy="44" r="3" fill="#D7B85A" />

      {/* Coupling */}
      <rect x="127" y="45" width="7" height="3" rx="1" fill="#26343D" />

      {/* Wheels */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "28px 55px",
        }}
      >
        <circle cx="28" cy="55" r="8" fill="#26343D" />
        <circle cx="28" cy="55" r="3" fill="#AAB5BA" />
      </motion.g>

      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "84px 55px",
        }}
      >
        <circle cx="84" cy="55" r="8" fill="#26343D" />
        <circle cx="84" cy="55" r="3" fill="#AAB5BA" />
      </motion.g>

      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformOrigin: "151px 55px",
        }}
      >
        <circle cx="151" cy="55" r="7" fill="#26343D" />
        <circle cx="151" cy="55" r="2.5" fill="#AAB5BA" />
      </motion.g>

      {/* Roof */}
      <rect
        x="16"
        y="13"
        width="76"
        height="5"
        rx="2"
        fill="#263F53"
      />

      {/* Pantograph */}
      <path
        d="M52 13 L59 6 L66 13"
        fill="none"
        stroke="#526675"
        strokeWidth="2"
      />
    </motion.svg>
  );
}

export default TrainIcon;