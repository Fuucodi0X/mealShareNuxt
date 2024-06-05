<script setup>
const {data: catagories} = useAvalibleCatagories();
const selectedCatagory = useSelectedCatagory();
function setCatagory(catagory = "All") {
    selectedCatagory.value = catagory
}
function isSelected(selectedCatagory,catagory = "All"){
    return selectedCatagory == catagory ? "dark" : "default"
}
</script>

<template>
    <div class="overflow-x-hidden">
        <div class="flex whitespace-nowarp gap-3 transition-transform w-[max-content]">
            <Button :variant="isSelected(selectedCatagory)" @click="setCatagory()" key = "All" class = "py-1 px-3 rounded-lg whitespace-nowarp">
                All
            </Button>
            <Button v-for="catagory of catagories" :variant="isSelected(selectedCatagory,catagory)" @click="setCatagory(catagory)" :key="catagory" class = "py-1 px-3 rounded-lg whitespace-nowarp">
                {{ catagory }}
            </Button>
        </div>
    </div>
</template>