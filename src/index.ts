import Persons from './persons';
import Discovery from './discovery';

const main = async () => {
  const persons = new Persons();
  await persons.bootstrap();

  const discovery = new Discovery();
  const movies = discovery.movie();

  console.log('hello here');
  console.log(persons.searchByNameRU('Джейсон Стейтем'));
  console.log(movies);
};

main();
