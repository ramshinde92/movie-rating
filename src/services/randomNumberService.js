export function getRandomInclusive(min, max) {
  if (!min || !max) return 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomExclusive(max) {
  if (!max) return 1;
  return Math.floor(Math.random() * Math.floor(max));
}
