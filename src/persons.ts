import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';
import Fuse from 'fuse.js';
import { transliterate } from 'inflected';

// TODO: move into .env vars
const PERSONS_DATA_FILE = '../assets/person_ids_05_05_2021.json';

export default class Persons {
  static PERSON_KEYS = ['name', 'popularity'];

  private bootstraped: boolean = false;
  private persons: Fuse<Person>;

  bootstrap = async () => {
    const persons = await this.parse();
    const personsFuze = new Fuse(persons, { keys: Persons.PERSON_KEYS });

    this.persons = personsFuze;
    this.bootstraped = true;
  };

  search(query: string) {
    if (!this.bootstraped) throw new Error('Persons wasnt bootstraped...');
    return this.persons.search(query);
  }

  searchWithSort(query: string) {
    const result = this.persons.search(query);
    return result.sort((a, b) => b.item.popularity - a.item.popularity);
  }

  searchByNameRU(query: string) {
    const queryRU = transliterate(query);
    return this.searchWithSort(queryRU);
  }

  parse(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      const persons: Person[] = [];
      const personsDataFilePath = resolvePath(__dirname, PERSONS_DATA_FILE);

      const rl = createInterface({
        input: createReadStream(personsDataFilePath),
        output: process.stdout,
        terminal: false,
      });

      rl.on('line', (line) => {
        try {
          const person: Person = JSON.parse(line);
          persons.push(person);
        } catch (err) {
          reject(err);
        }
      });

      rl.on('error', (err) => reject(err));

      rl.on('close', () => {
        resolve(persons);
      });
    });
  }
}
