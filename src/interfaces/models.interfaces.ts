export interface Character {
  id: number;
  name: string;
  role: string;
  description?: string;
  typeChart: CharacterType;
  cost: number;
  sceneId: number;
  scene?: Scene; // Relación con la escena
}

export enum CharacterType {
  TOY = "TOY",
  HUMAN = "HUMAN",
}
export interface Scene {
  id: number;
  title: string;
  description: string;
  budget: number;
  minutes: number;
  filmId: number;
  film?: Film; // Relación con la película
}

export interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  releaseDate: string; // Asegúrate de manejar fechas adecuadamente en TypeScript
  languages: string;
  genre: string;
  imageUrl?: string;
}
