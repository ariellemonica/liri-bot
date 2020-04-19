# Liri-Bot

Like Siri. Liri. Liri is only capable of four things: getting a song's details, getting concert details, getting a movie's details, and doing one random thing.

## Getting Started

Clone this repository locally. 

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Installing

Clone this repository locally.

Create a .env file to store the Spotify API ID and secret keys:


```
SPOTIFY_ID=STUFFITYSTUFFSTUFFSTUFF
SPOTIFY_SECRET=SECRETYSTUFFSTUFFSTUFF
```

Install packages

```
$ npm install
```

Examples: in bash/terminal, run the following

```
$ node liri.js spotify-this-song The Electric Lady
```

```
$ node liri.js movie-this The Godfather
```

```
$ node liri.js concert-this The Weeknd
```

