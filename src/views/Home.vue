<template>
  <div class="home">
    <h1 class="text-center mt-8">Simple bookstore to test api</h1>
    <h2 class="text-center mt-8">click on BOOKS to interact with api</h2>

   <!-- <v-skeleton-loader
      :loading="loading"
      :transition="transition"
      height="200"
      type="test"
      :types="types"
    >
      <v-card>
        <v-card-title>Title</v-card-title>
        <v-card-text>Card Text</v-card-text>
      </v-card>
    </v-skeleton-loader> -->
   <!-- <v-skeleton-loader
      :loading="loading"
      :transition="transition"
      height="94"
      type="row"
      :types="types"
    >
      <v-card>
        <v-card-title>Title</v-card-title>
        <v-card-text>Card Text</v-card-text>
      </v-card>
    </v-skeleton-loader> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      transition: 'scale-transition',
      types: {
        row: 'avatar, chip, avatar, chip, mytype',
        test: 'sentences, paragraph, mytype'
      }
    }
  }
  // mounted () {
  //   this.loading = true
  //   setTimeout(() => {
  //     this.loading = false
  //   }, 5000)
  // }
}
</script>

<style lang="sass">
.home
  .v-skeleton-loader__row
    display: flex

  .v-skeleton-loader__mytype
    height: 200px
    width: 200px
    background: #567
</style>
