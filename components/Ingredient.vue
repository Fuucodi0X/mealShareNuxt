<script setup>
const ingredients = ref()
const props = defineProps({
    recipeId:{
        type: Number,
        required: true,
        default: 0
    }
});
const recipeDetails = gql`
  query recipes($recipeId: Int) {
    ingredients(where: {recipe_id: {_eq: 40}}) {
        ingredient
    }
  }
`;

const recipeId = props.recipeId;
const {data} = await useAsyncQuery(recipeDetails, {recipeId})
const recipeIngredients = data.value.ingredients
ingredients.value = recipeIngredients
</script>

<template>
    <div class="flex flex-col">
    <div class="text-center font-bold text-[40px] my-4">Ingredients</div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        <div v-for="ingredient in ingredients" :key="ingredient" class="flex gap-2 text-center px-6 items-center text-wrap"> <span>&#x1F374;</span> {{ ingredient.ingredient }}</div>
    </div>
    </div>
</template>