const requests = {
  popular: `https://api.themoviedb.org/3/movie/popular`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming`,
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing`,
  horror: `https://api.themoviedb.org/3/discover/movie/?with_genres=27`,
  family: `https://api.themoviedb.org/3/discover/movie/?with_genres=10751`,
  comedy: `https://api.themoviedb.org/3/discover/movie/?with_genres=35`,
  romance: `https://api.themoviedb.org/3/discover/movie/?with_genres=10749`,
  mystery: `https://api.themoviedb.org/3/discover/movie/?with_genres=9648`,
  drama: `https://api.themoviedb.org/3/discover/movie/?with_genres=18`,
  action: `https://api.themoviedb.org/3/discover/movie/?with_genres=28`,
};

export default requests;
