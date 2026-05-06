#! /usr/bin/env node

console.log(
    'This script populates some test songs, authors, genres and songinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Song = require("./models/song");

const songs = [];


const mongoose = require("mongoose");

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createSongs();
    console.log("Debug: Closing mongoose");
    await mongoose.connection.close();
}


async function songCreate(index, titulo, author, ano) {
    const songdetail = {
        titulo,
        author,
        ano,
    };


    const song = new Song(songdetail);
    await song.save();
    songs[index] = song;
    console.log(`Added song: ${titulo}`);
}

async function createSongs() {
    console.log("Adding Songs");
    await Promise.all([
        songCreate(
            0,  
            "Bohemian Rhapsody",
            "Freddie Mercury",  
            "1967-09-05"
        ),
        songCreate(
            1,
            "Imagine",
            "John Lennon",
            "1971-03-09"
        ),
        songCreate(
            2,
            "Stairway to Heaven",
            "Led Zeppelin",
            "2010-11-08"
        ),
    ]);
}

