import React from "react";
import { createPerson, addMovie, addFriend, findMostPopularMovieBFS, findMostPopularMovieDFS } from "../../utils";
import PersonList from "../PersonList";
import MovieList from "../MovieList";
import './FindMostPopularMovie.css';

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
