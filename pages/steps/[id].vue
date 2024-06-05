<script setup>
definePageMeta({
  middleware: 'auth'
})
const { id:recipeId } = useRoute().params
</script>

<template>
    <div class="flex h-screen items-center justify-center">
        <Button size="icon" variant="ghost" class="fixed top-3 left-3 m-5 cursor-pointer">
            <NuxtLink to="/">
                <Icon name="lucide:arrow-left"/>
            </NuxtLink>
        </Button>
        <CreateStep :recipeId="recipeId"/>
    </div>
</template>