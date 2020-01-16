<template>
  <div class="inverted-text" id="cover">
    <div class="content">
      <h1>Notes</h1>
      <hr>
      <h4>If lost, please return to:</h4>
      <p>
        <label>Samuel Davis</label>
        <a :href="`https://www.google.com/maps/place/${address.join(' ')}`" target="_blank">
          <span :key="line" v-for="line in address" v-text="line"/>
        </a>
        <a :href="`tel:${phone}`" id="phone" v-text="phone"/>
        <a :href="`mailto:${email}`" v-text="email"/>
        <a :href="website" target="_blank" v-text="website"/>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phone: '802-745-0057',
        email: 'samueljakdavis@gmail.com',
        website: 'https://sdavis.online',
        address: [
          'Cornelius, NC',
        ]
      }
    }
  }
</script>

<style lang="scss">
  #cover {
    background-color: #50514F !important;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    padding-top: 4rem;
    padding-bottom: 4rem;

    > .content {
      display: inline-block;
      text-align: left;
      border: 1px solid white;
      padding: 1rem;
      margin: 1rem;

      * {
        display: block;
      }

      h4 {
        margin-bottom: 0;
      }

      p {
        margin-top: 0;
      }
    }
  }
</style>
