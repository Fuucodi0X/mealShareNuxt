<script setup>
    const {data: items} = useSidebarItems();
</script>

<template>
    <NuxtLink v-for="item of items" :to="item.url">
        <Button variant="ghost" Class="py-4 px-1 flex flex-col items-center rounded-lg gap-1">
            <Icon :name="item.icon" class="h-6 w-6"/>
            <p class="text-xs">{{ item.title }}</p>
        </Button>
    </NuxtLink>
</template>