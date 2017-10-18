<template>
  <div id="movie-filter">
    <h2>Filter results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter 
        v-for="(time, index) in times" :key="index" 
        category="time"
        v-bind:title="time"
      ></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <check-filter 
        v-for="(genre, index) in genres" :key="index" 
        category="genre"
        v-bind:title="genre"
      ></check-filter>
    </div>
  </div>
</template>
<script>
  import genres from '../util/genres';
  import times from '../util/times';
  import CheckFilter from './CheckFilter.vue';
  
  export default {
    data() {
      return { genres, times }
    },
    methods: {
      // checkFilter(category, title, checked) {
      //   // console.log('$emit: check-filter');
      //   this.$emit('check-filter', category, title, checked);
      // }
    },
    components: {
      CheckFilter,
    }
  }

</script>
<style>
  
</style>