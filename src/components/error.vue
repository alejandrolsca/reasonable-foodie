<template>
  <div class="error">
    <md-card class="md-accent">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">Ooops!</div>
        <div class="md-subhead">An error occurred</div>
      </md-card-header-text>
    </md-card-header>

    <md-card-content>
      {{error}}
    </md-card-content>
  </md-card>
  </div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {
      error: null
    }
  },
  mounted () {
    this.error = this.$route.query.error
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
