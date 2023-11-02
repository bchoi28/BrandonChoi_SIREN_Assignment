import React, { useState } from "react";

const FindMostPopularMovie = () => {

    // function to create a person
    const createPerson = (name) => {
        return {
            name: name,
            movies: [],
            friends: [],
        };
    };

    // function to add liked movie to a person
    const addMovie = (person, movie) => {
        person.movies.push(movie);
    };

    // function to add friend to a person
    const addFriend = (person, friend) => {
        person.friends.push(friend);
    };

    // create people, Brandon being the root
    const brandon = createPerson("Brandon");
    const friend1 = createPerson("Friend1");
    const friend2 = createPerson("Friend2");
    const f1_friend1 = createPerson("F1-Friend1");
    const f1_friend2 = createPerson("F1-Friend2");
    const f2_friend1 = createPerson("F2-Friend1");
    const f2_friend2 = createPerson("F2-Friend2");

    // establish the network

    return (
        <div>Hi</div>
    )
};

export default FindMostPopularMovie;
