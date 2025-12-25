export type PodiumDriver = {
  driver: string;
  qualifying_position: number;
  podium_probability: number;
};

export type PodiumApiResponse = {
  race: string;
  season: number;
  predicted_top3: PodiumDriver[];
  full_probabilities: PodiumDriver[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function predictRace(season: number, raceName: string): Promise<PodiumApiResponse> {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      season,
      race_name: raceName,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error (${res.status}): ${text}`);
  }

  return res.json();
}