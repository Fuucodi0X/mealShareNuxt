<script setup>
import { twMerge } from 'tailwind-merge';
const props = defineProps(["variant", "size", "Class"]);
</script>

<template>
    <div
      :class="twMerge( buttonStyles({ variant, size }), `cursor-pointer`, Class)"
    >
      <slot/>
    </div>
</template>