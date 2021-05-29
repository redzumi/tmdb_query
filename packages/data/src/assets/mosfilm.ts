import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';

const MOVIES_DATA_FILENAME = '../../assets/data/mosfilm/moscow_cinema_movies.json';

type Movie = {
  CommonName_en: string;
  SeriesAmount_en: number;
  FilmType_en: string; // TODO: enum?
  FrameFormat_en: string; // TODO: enum?
  Filmino_en: unknown;
  Duration_en: string; // TODO: incurrect cuz 'Duration: 17'
  Year_en: number;
  ProducingCountry_en: string; // TODO: incorrect cuz 'Country of production: СССР'
  FilmStudio_en: string; // TODO: incorrect cuz 'Studio: Союзмультфильм'
  IsColor_en: 'black_and_white' | 'color';
  AgeRestrictions_en: string; // ex. '12+'
  CopyQuality_en: string; // TODO: as number
  DigitalVersion_en: 'нет' | 'да';
  global_id: number;
};

export default class Movies {
  // examples
  // "book flight",
  // "book flight to [quebec](destination)",
  // "let's go to [new york](destination) tomorrow"

  private movie_strings: string[] = [
    'хочу посмотреть [%movie_name%](movie_name)',
    '[%movie_name%](movie_name)',
    'покажи мне [%movie_name%](movie_name)',
    'покажи [%movie_name%]',
    'давай посмотрим [%movie_name%](movie_name)',
    'смотреть [%movie_name%](movie_name)',
  ];

  private movies: Movie[];

  bootstrap = async () => {
    const raw_data = await fs.readFile(
      resolvePath(__dirname, MOVIES_DATA_FILENAME),
      'utf8'
    );
    const json_data = JSON.parse(raw_data);

    this.movies = json_data;
  };

  getNames = (): string[] => {
    return this.movies.map((movie) => movie.CommonName_en);
  };

  getRandomIntent(movieName: string): string {
    const rnd = Math.floor(Math.random() * this.movie_strings.length);
    return this.movie_strings[rnd].replace('%movie_name%', movieName);
  }
}
