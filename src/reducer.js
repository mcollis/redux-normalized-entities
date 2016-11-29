const reducer = (state = {}, { entities } = {}) => {
    if( entities ) {
        // for each key in entities
        const merged = Object.keys(entities).reduce((acc, key) => {
            // merge existing key
            acc[key] = {
                ...state[key], 
                ...Object.keys(entities[key]).reduce((acc, id) => {
                    // merge existing key id with new entity key id
                    const {[key]: {[id]: existing = {}} = {}} = state;
                    acc[id] = {...existing, ...entities[key][id]};
                    return acc;
                }, {})
            };
            return acc;
        }, {});
        // return the entire state merged with entities state
        return {...state, ...merged};
    }
    return state;
};

export default reducer;