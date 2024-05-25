<script setup>
const {data: catagories, addCatagory} = useAvalibleCatagories();
// addCatagory("coffee")
const selectedCatagory = useSelectedCatagory();
function setCatagory(catagory) {
    selectedCatagory.value = catagory
}
function isSelected(selectedCatagory,catagory){
    return selectedCatagory == catagory ? "dark" : "default"
}
</script>

<template>
    <div class="overflow-x-hidden relative">
        <div class="flex whitespace-nowarp gap-3 transition-transform w-[max-content]">
            <Button v-for="catagory of catagories" :variant="isSelected(selectedCatagory,catagory)" @click="setCatagory(catagory)" :key="catagory"class = "py-1 px-3 rounded-lg whitespace-nowarp">
                {{ catagory }}
            </Button>
        </div>
    </div>
</template>