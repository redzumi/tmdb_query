import BotpressModel from './model';
import Movies from './generators/mosfilm_movies';

export const main = async () => {
  const bp = new BotpressModel();
  const password = '123123';

  const movies = new Movies();
  await movies.bootstrap();

  const names = await movies.getNames();
  const toTrimLower = (values: string[]) =>
    values.map((value) => value.toLowerCase().trim());

  const movie_intent = {
    name: 'get_movie',
    contexts: ['global'],
    utterances: toTrimLower(names)
      .map((name) => movies.getRandomIntent(name))
      .slice(0, 300),
    slots: [{ name: 'movie_name', entities: ['movie'] }],
  };

  const movie_entity = {
    name: 'movie',
    type: 'list',
    fuzzy: 0.4,
    values: toTrimLower(names)
      .map((name) => ({
        name,
        synonyms: [],
      }))
      .slice(0, 300),
  };

  const train_data = {
    language: 'ru',
    intents: [movie_intent],
    contexts: ['global'],
    entities: [movie_entity],
  };

  console.log(movie_intent);

  bp.info();

  const modelId = await bp.train(train_data, password);

  const predict_data = { utterances: ['хочу посмотреть стражи галактики'] };
  const predictResult = await bp.predict(predict_data, password, modelId);

  console.log(predictResult);
};

export const dep = () => {};
main();
