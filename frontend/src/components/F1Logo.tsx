const F1Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-16 h-16 rounded-lg bg-f1-red flex items-center justify-center glow-red">
          <span className="font-racing text-3xl font-black text-primary-foreground tracking-tighter">
            F1
          </span>
        </div>
        <div className="absolute -inset-1 bg-f1-red/20 rounded-lg blur-md -z-10" />
      </div>
      <div className="flex flex-col">
        <span className="font-racing text-xl tracking-wider text-foreground">PODIUM</span>
        <span className="font-racing text-sm tracking-widest text-f1-red">PREDICTOR</span>
      </div>
    </div>
  );
};

export default F1Logo;
