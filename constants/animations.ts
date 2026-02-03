// Animation Configuration
export const ANIMATION_DURATIONS = {
    fast: 150,
    normal: 300,
    slow: 500,
};

export const SPRING_CONFIGS = {
    gentle: {
        damping: 20,
        stiffness: 300,
    },
    bouncy: {
        damping: 10,
        stiffness: 400,
    },
    stiff: {
        damping: 30,
        stiffness: 500,
    },
};

export const EASING = {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};
