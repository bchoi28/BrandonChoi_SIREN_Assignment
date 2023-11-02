const findMostPopularMovieBFS = require('./findMostPopularMovie');

describe('findMostPopularMovieBFS', () => {
    it('should return the most popular movie for a given network', () => {
        const root = {
            name: 'Brandon',
            movies: ['Movie1', 'Movie2', 'Movie3'],
            friends: [
                {
                    name: 'Mark',
                    movies: ['Movie1'],
                    friends: [
                        {
                            name: 'Emily',
                            movies: ['Movie1', 'Movie2'],
                            friends: [],
                        },
                        {
                            name: 'Sarah',
                            movies: ['Movie3', 'Movie4'],
                            friends: [],
                        },
                    ],
                },
                {
                    name: 'Joe',
                    movies: ['Movie1', 'Movie2', 'Movie4'],
                    friends: [
                        {
                            name: 'Andrew',
                            movies: ['Movie2', 'Movie3'],
                            friends: [],
                        },
                        {
                            name: 'Taylor',
                            movies: ['Movie1', 'Movie4', 'Movie5'],
                            friends: [],
                        },
                    ],
                },
            ],
        };
        const result = findMostPopularMovieBFS(root);
        expect(result).toEqual('Movie1');
    });

    it('should handle a network with two or more equally popular movies', () => {
        const root = {
            name: 'Brandon',
            movies: ['Movie1', 'Movie2'],
            friends: [
                {
                    name: 'Mark',
                    movies: ['Movie1', 'Movie3'],
                    friends: [],
                },
                {
                    name: 'Joe',
                    movies: ['Movie2', 'Movie3'],
                    friends: [],
                },
            ],
        };
        const result = findMostPopularMovieBFS(root);
        expect(['Movie1', 'Movie2', 'Movie3']).toEqual(result);
    });


});