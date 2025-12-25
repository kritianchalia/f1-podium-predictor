import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface PodiumCardProps {
  driverName: string;
}

const PodiumCard = ({ driverName }: PodiumCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-full max-w-[200px] rounded-lg border-2 bg-gradient-to-b from-f1-gold/10 to-secondary/50 p-5 transition-all duration-300",
          "border-f1-gold/30 hover:border-f1-gold/60 hover:shadow-[0_0_20px_rgba(255,199,44,0.2)]"
        )}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-f1-gold/20 flex items-center justify-center border border-f1-gold/30">
            <User className="w-6 h-6 text-f1-gold" />
          </div>
        </div>
        <p className="w-full text-center font-body text-lg tracking-wide text-foreground">
          {driverName}
        </p>
      </div>
      <div className="mt-3 px-4 py-2 bg-secondary/60 rounded-full">
        <span className="text-muted-foreground text-sm font-body uppercase tracking-wider">
          Podium Finisher
        </span>
      </div>
    </div>
  );
};

export default PodiumCard;
