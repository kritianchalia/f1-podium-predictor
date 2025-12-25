import { predictRace, PodiumDriver } from "@/lib/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PodiumCard from "@/components/PodiumCard";
import SpeedLines from "@/components/SpeedLines";
import F1Logo from "@/components/F1Logo";
import { Flag, Calendar, Trophy, Loader2 } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [raceName, setRaceName] = useState("");
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [podiumResult, setPodiumResult] = useState<PodiumDriver[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!raceName || !season) {
      toast({
        title: "Missing Information",
        description: "Please enter both race name and season.",
        variant: "destructive",
      });
      return;
    }

    const seasonNumber = Number(season);
    if (Number.isNaN(seasonNumber)) {
      toast({
        title: "Invalid Season",
        description: "Season must be a valid year (e.g. 2024).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPodiumResult(null);

    try {
      const data = await predictRace(seasonNumber, raceName);

      // data.predicted_top3 is an array of { driver, qualifying_position, podium_probability }
      setPodiumResult(data.predicted_top3);

      toast({
        title: "Prediction Ready! 🏁",
        description: `Podium prediction for ${data.race} ${data.season}`,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Prediction Failed",
        description: err?.message ?? "Something went wrong talking to the backend.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SpeedLines />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-carbon-pattern opacity-30" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_70%)]" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="flex flex-col items-center mb-12 animate-slide-up">
          <F1Logo />
          <p className="mt-4 text-muted-foreground font-body text-lg tracking-wide text-center max-w-md">
            Get AI-powered podium predictions for any Formula 1 Grand Prix
          </p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Race Info Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-body uppercase tracking-wider text-muted-foreground">
                <Flag className="w-4 h-4 text-f1-red" />
                Race Name
              </label>
              <Input
                variant="f1"
                placeholder="e.g., Monaco Grand Prix"
                value={raceName}
                onChange={(e) => setRaceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-body uppercase tracking-wider text-muted-foreground">
                <Calendar className="w-4 h-4 text-f1-red" />
                Season
              </label>
              <Input
                variant="f1"
                placeholder="e.g., 2024"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button type="submit" variant="f1" size="xl" className="min-w-[200px]" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Predicting...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  Get Prediction
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Podium Results Section */}
        {podiumResult && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Trophy className="w-6 h-6 text-f1-gold" />
              <h2 className="font-racing text-2xl tracking-wider text-center">
                PREDICTED PODIUM
              </h2>
              <Trophy className="w-6 h-6 text-f1-gold" />
            </div>

            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
              {podiumResult.map((driver, index) => (
                <PodiumCard key={index} driverName={driver.driver} />
      ))}
    </div>
  </div>
)}

        {/* Footer accent */}
        <div className="mt-16 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-f1-red to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Index;
