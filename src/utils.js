// create a person
export const createPerson = (name) => {
    return {
        name: name,
        movies: [],
        friends: [],
    };
};

// add liked movie to a person
export const addMovie = (person, ...movies) => {
    person.movies.push(...movies);
};

// add friend to a person
export const addFriend = (person, ...friends) => {
    person.friends.push(...friends);
};

// find most popular movie of a person's network (BFS)
export const findMostPopularMovieBFS = (root) => {

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

    return { maxCount, mostPopularMovies };
};

// find most popular movie of a person's network (DFS)
export const findMostPopularMovieDFS = (root) => {

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
