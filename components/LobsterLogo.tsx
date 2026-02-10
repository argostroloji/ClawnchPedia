
export const LobsterLogo = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Abstract C shape formed by lobster claws */}
        {/* Upper Claw segment */}
        <path d="M 80 30 C 70 10, 40 10, 30 30 C 20 50, 20 70, 30 80" />
        {/* Lower Claw segment - creates the C shape */}
        <path d="M 30 80 C 40 100, 70 100, 80 80" />

        {/* Inner pincers to make it look like a claw */}
        <path d="M 80 30 C 70 40, 60 40, 50 35" />
        <path d="M 80 80 C 70 70, 60 70, 50 75" />
    </svg>
);
