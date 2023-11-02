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
                mostPopularMovie = movie;
            };
        };

        queue.push(...person.friends);
    }

    return mostPopularMovie;
};

module.exports = findMostPopularMovieBFS;