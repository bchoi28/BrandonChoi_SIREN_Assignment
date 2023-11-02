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

![frontend](/public/SIREN_frontend.png)

#### I made a simple react app to visualize the solution on the browser. 


    const FindMostPopularMovie = () => {

        // create people, Brandon being the root
        const Brandon = createPerson("Brandon");
        const Mark = createPerson("Mark");
        const Joe = createPerson("Joe");
        const Emily = createPerson("Emily");
        const Sarah = createPerson("Sarah");
        const Andrew = createPerson("Andrew");
        const Taylor = createPerson("Taylor");

        // create a person object list array
        const personList = [Brandon, Mark, Joe, Emily, Sarah, Andrew, Taylor];

        // establish the network
        addFriend(Brandon, Mark, Joe);
        addFriend(Mark, Emily, Sarah);
        addFriend(Joe, Andrew, Taylor)

        // add liked movies to the network
        addMovie(Brandon, "Movie1", "Movie2", "Movie3");
        addMovie(Mark, "Movie1");
        addMovie(Joe, "Movie1", "Movie2", "Movie4");
        addMovie(Emily, "Movie1", "Movie2");
        addMovie(Sarah, "Movie3", "Movie2");
        addMovie(Andrew, "Movie2", "Movie3");
        addMovie(Taylor, "Movie1", "Movie2", "Movie5");

        // find most popular movie of Brandon's network
        // let { maxCount, mostPopularMovie } = findMostPopularMovieDFS(Brandon);
        let { maxCount, mostPopularMovies } = findMostPopularMovieBFS(Brandon);

        if (mostPopularMovies.length > 1) {
            mostPopularMovies = mostPopularMovies.join(", ");
        }

        return (
            <div className="main-container">
                <header className="main-header">Find The Most Popular Movie</header>
                <div className="network-movies-container">
                    <div className="network-container">
                        <div className="network-header">Network</div>
                        <div className="network-list">
                            <PersonList person={Brandon} />
                        </div>
                    </div>
                    <div className="movies-container">
                        <div className="movies-header">Movies</div>
                        <div className="movies-list">
                            <MovieList person={Brandon} />
                        </div>
                    </div>
                </div>
                <div className="result-container">The Most Popular Movie is:
                    <div className="result">{mostPopularMovies}</div>
                    <div>with a count of {maxCount}</div>
                </div>

            </div>
        )
    };

    export default FindMostPopularMovie;


