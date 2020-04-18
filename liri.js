require("dotenv").config()

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
// var spotify = new Spotify({
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
// });
var spotify = new Spotify(keys.spotify);

var axios = require('axios');
var moment = require('moment');

var command = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");

switch (command) {
    case "concert-this":
        getConcert(searchTerm);
        break;
    case "spotify-this-song":
        getSpotify(searchTerm);
        break;
    case "movie-this":
        getMovie(searchTerm);
        break;
    case "do-what-it-says":
        doCommand(searchTerm);
        break;
    default:
        console.log("Invalid choice - please enter valid search operation: concert-this, spotify-this-song, movie-this.");
}

function getSpotify(searchTerm) {
    var queryString = searchTerm || 'This City'
    spotify.search({ type: 'track', query: queryString }, function (err, data) {
        if (err) {
            return console.log('Something went wrong: ' + err);
        }

        // console.log(data.tracks.items);
        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log(' ------ ' + i + ' ------ ');
            console.log('Song name: ', data.tracks.items[i].name);
            console.log('Album: ', data.tracks.items[i].album.name);
            console.log('Preview link: ', data.tracks.items[i].external_urls.spotify);
            console.log('Artist(s): ', data.tracks.items[i].artists);
            //BONUS: if I end up having time for this - pull out Artist(s).name value and push into an array and display as string. 
            //Directions don't explicitly say to do this, so I'm not going to waste time with it now
        }
    });
}

function getConcert(searchTerm) {
    var artist = searchTerm || "The Weeknd";
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function (response) {
        // console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
            console.log(' ------ ' + i + ' ------ ');
            console.log('Name of venue: ', response.data[i].venue.name);
            console.log('Venue location: ', response.data[i].venue.city + ', ' + response.data[i].venue.country);
            console.log('Date of Event: ', moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
        }

    }).catch(function (err) {
        console.log("Something went wrong: ", err);
    });
}

function getMovie(searchTerm) {
    var movieName = searchTerm || "Moulin Rouge";
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&s=" + movieName;
    console.log(queryURL);
    axios.get(queryURL).then(function (response) {
        // console.log(response.data);
        // console.log(response.data.Search[0].Title);
        var movieTopRes = response.data.Search;

        for (let i = 0; i < response.data.Search.length; i++) {
            var movieImdb = movieTopRes[i].imdbID
            // console.log('Imdb id: ', movieImdb);
            function newQueryImdb(movieImdb, i) {
                var i = i;
                var newQueryURL = "http://www.omdbapi.com/?apikey=trilogy&i=" + movieImdb;
                queryImdb(newQueryURL, i);
            };
            newQueryImdb(movieImdb, i);
        }
    }).catch(function (err) {
        console.log("Something went wrong: ", err);
    });


}

function queryImdb(newQueryURL, i) {
    axios.get(newQueryURL, i).then(function (response) {
        // console.log(response);
        console.log(' ------ Request Iteration: ', i, ' ------ ');
        console.log('Title: ', response.data.Title);
        console.log('Release year: ', response.data.Year);
        console.log('Country: ', response.data.Country);
        console.log('Plot: ', response.data.Plot);
        console.log('Rating Score: ', response.data.imdbRating);
        console.log('Language: ', response.data.Language);
    }).catch(function (err) {
        console.log("Something went wrong in the IMDB query: ", err);
    })
}

function doCommand(searchTerm) { }



