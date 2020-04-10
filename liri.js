require("dotenv").config()

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

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
        console.log("Invalid choice - please enter valid search term.");
}

function getSpotify(searchTerm) {
    var queryString = searchTerm || 'All The Small Things'
    spotify.search({ type: 'track', query: queryString }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data.tracks.items);
        for (let i = 0; i < data.tracks.items.length; i++){
            console.log(' ------ ');
            console.log('Artist(s): ', data.tracks.items[i].artists);
            console.log('Album: ', data.tracks.items[i].album.name);
            console.log('Preview link: ', data.tracks.items[i].external_urls.spotify);
            console.log('Song name: ', data.tracks.items[i].name);
        }
    });
}

function getConcert(searchTerm){
    var artist = searchTerm || "Beyonce";
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(function(response){
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++){
            console.log(' ------ ');
            console.log('Name of venue: ', response.data[i].venue.name);
            console.log('Venue location: ', response.data[i].venue.city + ', ' + response.data[i].venue.country);
            console.log('Date of Event: ', moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
        }

    });
}

function getMovie(searchTerm){
    var movieName = searchTerm || "Mr. Nobody";
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&s" + movieName;
    //write a for loop to console log details about movie

}

function doCommand(searchTerm){}

