<template>
  <div id="cover">
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

<style lang="scss" scoped>
  #cover {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    .content {
      font-family: "Times New Roman", monospace;
      color: white;
      text-shadow: 0 0 3px black;
      padding: 1rem;
      border: 1px inset white;
      font-size: 2rem;
      line-height: 2rem;

      * {
        display: block;
      }
    }
  }
</style>
