const { getKnexConfig } = require('./utils/db.utils');

export const mixins = (options) => {
  const { table, schema, idField } = options || {
    schema: 'public',
    idField: 'id',
  };
  if (!table) {
    throw new Error('Table is required but not mentioned in options');
  }
  const configs = getKnexConfig();
  return KnexDbMixin({
    schema,
    table,
    idField,
    knex: {
      configs,
    },
  })
}