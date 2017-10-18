<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item v-for="item in filteredMovies" v-bind:movie="item.movie">
        <div class="movie-sessions">
          <div 
            v-for="session in filteredSessions(item.sessions)" 
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{ seats: session.seats }"
          >
            <div class="session-time">{{ formatSessionTime(session.time) }}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{ noResults }}
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';
  
  export default {
    // data() {
    //   return { 
    //     movies: [
    //       { title: 'Kill Bill', genre: genres.CRIME },
    //       { title: 'Home Alone', genre: genres.COMEDY },
    //       { title: 'Austin Power 2', genre: genres.FANTASY },
    //       { title: 'Lorem ipsum dolor. 04', genre: genres.DRAMA },
    //       { title: 'Lorem ipsum dolor. 05', genre: genres.DRAMA },
    //     ],
    //   }
    // },
    props: ['genre', 'time', 'movies', 'day'],
    methods: {
      formatSessionTime(raw) {
        return this.$moment(raw).format('h:mm A');
      },
      filteredSessions(sessions) {
        // return sessions.filter(session => {
        //   return this.$moment(session.time).isSame(this.day, 'day');
        // });
        return sessions.filter(this.sessionPassesTimeFilter);
      },
      moviePassesGenreFilter(item) {
        // return true;
        if (this.genre.length) {
          // return this.genre.find(genre => movie.genre === genre);
          let movieGenres = item.movie.Genre.split(', ');
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        } else {
          return true;
        }
      },
      sessionPassesTimeFilter(session) {
        const oTime = this.$moment(session.time);
        const nHour = oTime.hour();
        const aTime = this.time;

        if (!this.day.isSame(oTime, 'day')) {
          return false;
        } else if (aTime.length === 0 || aTime.length === 2) {
          return true;
        } else if (aTime[0] === times.AFTER_6PM) {
          return nHour >= 18;
        } else {
          return nHour < 18;
        }
        
      },
    },
    computed: {
      filteredMovies() {
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
      },
      noResults() {
        let sTimes = this.time.join(', ');
        let sGenres = this.genre.join(', ');
        return `No results for ${sTimes}${sTimes.length && sGenres ? ', ' : ''}${sGenres}.`;
      }
    },
    components: {
      MovieItem
    },
    // created() {
    //   console.log(this.$moment);
    // }
  }
</script>
<style>
  
</style>