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

module.exports = findMostPopularMovieBFS;