<template>
  <h1>Welcome, {{ id }}</h1>
</template>

<script setup>
const { id } = useRoute().params;
</script>
