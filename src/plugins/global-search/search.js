const fuzzyScore = (query, value) => {
  if (!value) return 0;

  query = query.toLowerCase();
  value = String(value).toLowerCase();

  if (value === query) return 10000;
  if (value.startsWith(query)) return 9000;
  if (value.includes(query)) return 8000;

  let queryIndex = 0;
  let score = 0;
  let lastMatchIndex = -2;

  for (let valueIndex = 0; valueIndex < value.length && queryIndex < query.length; valueIndex++) {
    if (value[valueIndex] !== query[queryIndex]) continue;

    score += valueIndex === lastMatchIndex + 1 ? 30 : 10;

    if (!valueIndex || /[\s._:@/-]/.test(value[valueIndex - 1])) {
      score += 20;
    }

    lastMatchIndex = valueIndex;
    queryIndex++;
  }

  return queryIndex === query.length ? score + 100 - lastMatchIndex : 0;
};

export const getSearchScore = (query, item) =>
  Math.max(
    ...[item.site, item.service, item.login, item.account, item.endpoint].map((value) =>
      fuzzyScore(query, value),
    ),
  );
