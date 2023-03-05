export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const pVariants = (direction) => ({
  hidden: {
    // x: direction === "left" ? "-100%" : "100%",
    x: 0,
    y: 100,
    opacity: 0,
  },

  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.8,
    },
  },
  hover: {
    background: "#eb2d42",
    transition: {
      //   yoyo: Infinity,
      duration: 0.5,
    },
  },
});

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const imgVariants = (direction) => ({
  hover: {
    scale: 1.1,
    transition: {
      //   yoyo: Infinity,
      duration: 1,
    },
  },
});
