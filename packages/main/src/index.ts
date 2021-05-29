import Persons from '@tmq/data/build/assets/tmdb-persons';
import Discovery from './discovery';

import { dep } from '@tmq/bp';

const main = async () => {
  console.log('hello from main');
  dep();
};

const test = async () => {
  const persons = new Persons();
  await persons.bootstrap();

  const discovery = new Discovery();
  const movies = discovery.movie();

  console.log('hello here');
  console.log(persons.searchByNameRU('Джейсон Стейтем'));
  console.log(movies);
};

main();
