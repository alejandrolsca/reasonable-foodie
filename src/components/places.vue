<template>
  <div class="places">
    <div class="locating" v-if="locating">
      <md-progress class="md-accent" md-indeterminate></md-progress>
      <br> <md-icon>my_location</md-icon> locating...
    </div>
    <div class="loading" v-if="loading">
      <md-progress class="md-accent" md-indeterminate></md-progress>
      <br> <md-icon>swap_horiz</md-icon> loading...
    </div>
    <md-list class="md-triple-line md-dense">
      <md-list-item v-for="item in places" :key="item.id" v-on:click="getPlaceDetails(item.place_id)">
        <div class="md-list-text-container">
          <span>{{item.name}}</span>
          <span>
            <md-rating-bar v-model="item.rating" class="md-warn" disabled></md-rating-bar>
            <span class="rating"> {{item.rating}}</span>
          </span>
          <span v-if="!!item.opening_hours">
            <span v-if="item.opening_hours.open_now">Open Now</span>
            <span v-if="!item.opening_hours.open_now">Closed</span>
          </span>
        </div>
        <md-divider></md-divider>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { getLocation } from '../utils/geolocation'
import { getNearPlacesByType } from '../utils/reasonable-foodie.js'

export default {
  name: 'places',
  data () {
    return {
      places: [],
      locating: false,
      loading: false
    }
  },
  mounted () {
    this.getPlaces(1000)
  },
  methods: {
    getPlaceDetails: function (placeId) {
      console.log(placeId)
      this.$router.push(`/places/${placeId}`)
    },
    getPlaces: function (distance) {
      const self = this
      self.locating = true
      getLocation(function (location) {
        self.locating = false
        self.loading = true
        getNearPlacesByType(location, distance, 'restaurant').then((response) => {
          self.loading = false
          self.places = response
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-rating-bar {
  padding-left: 0;
  float: left
}

.rating {
  display: table-cell;
  height: 30px;
  vertical-align: middle;
}
</style>
