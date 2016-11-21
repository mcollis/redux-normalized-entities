import { createSelector } from 'reselect';

export const entities = ({ entities }) => entities;

export const getEntity = (name, id) => createSelector(
    entities,
    ({ [name]: { [id]: entity } = {} }) => entity
);

export const getEntities = (name, ids = []) => createSelector(
    state => state,
    state => 
        ids.map(id => getEntity(name, id)(state))
            .filter(entity => !!entity)
);