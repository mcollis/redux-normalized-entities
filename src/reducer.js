const reducer = (state = {}, { entities } = {}) => {
  if (entities) {
    // for each key in entities
    const merged = Object.keys(entities).reduce((acc1, key) => {
      const accum1 = { ...acc1 };
      // merge existing key
      accum1[key] = {
        ...state[key],
        ...Object.keys(entities[key]).reduce((acc2, id) => {
          // merge existing key id with new entity key id
          const accum2 = { ...acc2 };
          const { [key]: { [id]: existing = {} } = {} } = state;
          accum2[id] = { ...existing, ...entities[key][id] };
          return accum2;
        }, {})
      };
      return accum1;
    }, {});
    // return the entire state merged with entities state
    return { ...state, ...merged };
  }
  return state;
};

export default reducer;
