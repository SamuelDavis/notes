<template>
  <a :href="href" target="_blank">
    <cite>
      <slot/>
    </cite>
  </a>
</template>

<script>
  export default {
    name: 'notes-citation',
    props: {
      href: String
    }
  }
</script>
