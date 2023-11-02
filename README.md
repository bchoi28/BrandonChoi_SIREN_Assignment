# SIREN Coding Assignment - Find the Most Popular Movie

## Table of Contents
* [Problem](#problem)
* [Solutions](#solutions)
  * [Breadth-First-Search](#breadth-first-search-solution)
  * [Depth-First-Search](#depth-first-search-solution)
* [Tests](#tests)
* [Frontend Visualization](#frontend)

## Problem

On your Facebook account, you have friends who all have a list of movies that they like. Write a function that returns the most popular movie of a person in his/her network of friends. Network means that you have to consider friends of friends as well.


## Solutions

#### Breadth-First-Search Solution
    
    function findMostPopularMovieBFS(root) {
    
        const movieCount = new Map();
        const queue = [root];
        let maxCount = 0;
        let mostPopularMovies = [];
    
        while (queue.length > 0) {
            const person = queue.shift();
    
            for (const movie of person.movies) {
                if (!movieCount.has(movie)) {
                    movieCount.set(movie, 0);
                };
    
                const count = movieCount.get(movie) + 1;
                movieCount.set(movie, count);
    
                if (count > maxCount) {
                    maxCount = count;
                    mostPopularMovies = [movie];
                } else if (count === maxCount && !mostPopularMovies.includes(movie)) {
                    mostPopularMovies.push(movie);
                } else if (count < maxCount && mostPopularMovies.includes(movie)) {
                    mostPopularMovies = mostPopularMovies.filter((m) => m !== movie);
                }
            };
    
            queue.push(...person.friends);
        }
        if (mostPopularMovies.length > 1) return mostPopularMovies;
        else return mostPopularMovies[0];
    };

#### Depth-First-Search Solution

    function findMostPopularMovieDFS(root) {
    
        const movieCount = new Map();
        let maxCount = 0;
        let mostPopularMovie;
    
        const dfs = (person) => {
            for (const movie of person.movies) {
                if (!movieCount.has(movie)) {
                    movieCount.set(movie, 0);
                }
    
                const count = movieCount.get(movie) + 1;
                movieCount.set(movie, count);
    
                if (count > maxCount) {
                    maxCount = count;
                    mostPopularMovie = movie;
                }
            }
    
            for (const friend of person.friends) {
                dfs(friend);
            }
        };
    
        dfs(root);
    
        return { maxCount, mostPopularMovie };
    };

## Tests

#### should return the most popular movie for a given network

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

#### should handle a network with two or more equally popular movies

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

## Frontend Visualization


