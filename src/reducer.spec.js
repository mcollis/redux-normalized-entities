import expect from 'expect';
import deepFreeze from 'deep-freeze';

import reducer from './reducer';

const articles = {
    '0': { id: 0, title: 'Article 1', comments: [ 0 ] },
    '1': { id: 1, title: 'Article 2', comments: [ 0, 1 ] }
};

const comments = {
    '0': { id: 0, comment: 'Comment 1' },
    '1': { id: 1, comment: 'Comment 2' }
}

describe('Entities Reducer', () => {
    it('should return existing state if no entities', () => {
        const result = reducer();
        expect(result).toEqual({});
    })
    it('should grab "entities" from the action', () => {
        const result = reducer({}, {
            type: 'TEST_ENTITY',
            entities: { articles, comments }
        });
        expect(result).toEqual({ articles, comments });
    });
    it('should add to existing "entities"', () => {
        const previous = { articles: {
            '0': articles['0']
        } };
        deepFreeze(previous);
        const result = reducer(previous, {
            type: 'TEST_ENTITY',
            entities: { articles: {
                '1': articles['1']
            }}
        });
        expect(result).toEqual({ articles });
    });
    it('should merge existing "entities"', () => {
        const previous = { articles, comments };
        deepFreeze(previous);
        const result = reducer(previous, {
            type: 'TEST_ENTITY',
            entities: {
                articles: { 
                    '0': { title: 'New Title' }
                }
            }
        });
        expect(result).toEqual({
            articles: {
                '0': {...articles['0'], title: 'New Title'},
                '1': articles['1']
            },
            comments
        });
    });
});