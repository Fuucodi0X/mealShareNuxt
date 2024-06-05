<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
    <div class="flex h-screen justify-center items-center overflow-auto">
        <Button size="icon" variant="ghost" class="fixed top-3 left-3 m-5 cursor-pointer">
            <NuxtLink to="/">
                <Icon name="lucide:arrow-left"/>
            </NuxtLink>
        </Button>
        <CreateRecipe/>
    </div>
</template>