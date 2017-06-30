<template>
  <div class="place-detail">
    <div class="loading" v-if="loading">
      <md-progress class="md-accent" md-indeterminate></md-progress>
      <br> <md-icon>swap_horiz</md-icon> loading...
    </div>
    <md-card class="details" v-if="!loading">
      <md-card-header>
        <h2 class="md-title">{{place.name}}</h2>

          <md-icon>web</md-icon>
          <a  target="_blank" :href="place.website">{{place.website}}</a><br><br>
          <md-icon>map</md-icon> <a target="_blank" :href="place.url">Open in Google Maps</a></span>

      </md-card-header>

    <md-card-content>
      <md-icon>directions</md-icon>
      {{place.formatted_address}}<br><br>
      <h3 class="md-subheading"><md-icon>access_time</md-icon> Availability</h3>
      <div class="card-reservation">
        <span v-if="place.opening_hours">
          <span v-for="week_day in place.opening_hours.weekday_text" >{{week_day}}<br></span>
        </span>
      </div>
      <span v-if="place.reviews">
        <md-button id="reviews" @click="openDialog('dialog1')" class="md-raised md-primary">{{place.reviews.length}} reviews</md-button>
        </span>
        <md-button class="md-raised md-accent">Rate <md-icon>star</md-icon></md-button>
    </md-card-content>
  </md-card>
  <md-dialog md-open-from="#reviews" md-close-to="#reviews" ref="dialog1">
    <md-dialog-title>Reviews</md-dialog-title>
    <md-dialog-content class="reviews">
      <md-card class="card" v-for="item in place.reviews" :key="item.id">
        <md-card-header>
          <div class="md-title">{{item.author_name}}</div>
          <div class="md-subhead">Posted {{item.relative_time_description}}</div>
        </md-card-header>

        <md-card-content>
          <md-rating-bar v-model="item.rating" class="md-warn" disabled></md-rating-bar>
          <md-icon>comment</md-icon> {{item.text}}
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button">
          <md-icon v-bind:style="{ color: sentiment(item.rating).color, fontSize: '32px'}">{{sentiment(item.rating).sentiment}}</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-raised md-primary" @click="closeDialog('dialog1')">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
  </div>
</template>

<script>
import { getPlace } from '../utils/reasonable-foodie.js'

export default {
  name: 'placesDetail',
  data () {
    return {
      place: {},
      loading: false,
      sentiments: [
        {value: 0, sentiment: 'sentiment_very_dissatisfied', color: '#f44336'},
        {value: 1, sentiment: 'sentiment_very_dissatisfied', color: '#f44336'},
        {value: 2, sentiment: 'sentiment_dissatisfied', color: '#FF9800'},
        {value: 3, sentiment: 'sentiment_neutral', color: '#FF6F00'},
        {value: 4, sentiment: 'sentiment_satisfied', color: '#8BC34A'},
        {value: 5, sentiment: 'sentiment_very_satisfied', color: '#64DD17'}
      ]
    }
  },
  mounted () {
    const self = this
    console.log(self.$route.params.place_id)
    self.loading = true
    getPlace(self.$route.params.place_id).then((place) => {
      console.log(place)
      self.place = place
      self.loading = false
    })
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    sentiment (rating) {
      const sentiment = this.sentiments.find((sentiment) => {
        return sentiment.value === rating
      })
      return sentiment
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details {
  margin: 10px 10px;
}
.reviews {
  overflow: auto;
  padding: 10px 10px;
  background: #f5f5f5;
}
md-rating-bar {
  display: inline-block;
}
.card {
  margin-bottom: 10px;
}
a, a:visited {
  color: #3F51B5 !important;
  font-weight: bold;
}
</style>
