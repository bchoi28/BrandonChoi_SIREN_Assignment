const findMostPopularMovieBFS = require('./findMostPopularMovie'); // Update the path as needed

describe('findMostPopularMovieBFS', () => {
    it('should return the most popular movie for a given network', () => {
        // Create your network structure for testing
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

        // Call the function you want to test
        const result = findMostPopularMovieBFS(root);

        // Assert the result based on your expectations
        expect(result).toEqual('Movie1');
    });
});
