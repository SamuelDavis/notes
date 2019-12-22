<template>
  <div class="inverted-text">
    <div>
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
    name: 'home',
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

<style lang="scss" scoped>
  @import "./../assets/_variables.scss";

  div:first-child {
    background-color: $cover-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    * {
      display: block;
    }

    > div {
      border: 1px solid white;
      padding: 5%;
      margin: 5% 5% 10%;

      line-height: 1rem;

      h4, p {
        font-size: 0.75rem;
        line-height: 0.75rem;
      }

      h4 {
        margin-bottom: 0;
      }

      p {
        margin: 0;
      }
    }
  }
</style>
