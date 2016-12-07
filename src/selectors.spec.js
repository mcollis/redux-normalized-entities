import expect from 'expect'; // eslint-disable-line

import { getEntity, getEntities } from './selectors';

const state = {
  entities: {
    articles: {
      0: { id: 0, title: 'Article 1' },
      1: { id: 1, title: 'Article 2' }
    }
  }
};

describe('Entity Selectors', () => {
  describe('getEntity', () => {
    it('should return a single entity', () => {
      const result = getEntity('articles', 0)(state);
      expect(result).toEqual({ id: 0, title: 'Article 1' });
    });
    it('should return undefined if entity not found', () => {
      const result1 = getEntity('articles', 2)(state);
      const result2 = getEntity('article', 0)(state);
      expect(result1).toEqual(undefined);
      expect(result2).toEqual(undefined);
    });
  });
  describe('getEntities', () => {
    it('should return an array of entities', () => {
      const result = getEntities('articles', [0, 1])(state);
      expect(result).toEqual([
                { id: 0, title: 'Article 1' },
                { id: 1, title: 'Article 2' }
      ]);
    });
    it('should only return found entities', () => {
      const result = getEntities('articles', [0, 3])(state);
      expect(result).toEqual([
                { id: 0, title: 'Article 1' }
      ]);
    });
    it('should fail gracefully', () => {
      const result = getEntities('articles')(state);
      expect(result).toEqual([]);
    });
  });
});
