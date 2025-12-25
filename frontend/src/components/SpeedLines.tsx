const SpeedLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top speed lines */}
      <div className="absolute top-20 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-f1-red/30 to-transparent animate-speed-lines" style={{ animationDelay: '0s' }} />
      <div className="absolute top-32 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-f1-red/20 to-transparent animate-speed-lines" style={{ animationDelay: '0.3s' }} />
      
      {/* Bottom speed lines */}
      <div className="absolute bottom-40 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-f1-red/30 to-transparent animate-speed-lines" style={{ animationDelay: '0.6s' }} />
      <div className="absolute bottom-28 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-f1-red/20 to-transparent animate-speed-lines" style={{ animationDelay: '0.9s' }} />
      
      {/* Diagonal accent lines */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-f1-red/40 via-transparent to-f1-red/40" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-f1-red/40 via-transparent to-f1-red/40" />
    </div>
  );
};

export default SpeedLines;
