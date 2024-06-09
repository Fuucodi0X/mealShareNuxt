<script setup>
// Reactive variables
const selectedCatagory = useSelectedCatagory()
const searchParam = ref("")
const recipes = ref()

const recipeQuery = gql`
query recipes {
  recipes(limit: 10, order_by: {id: desc}) {
    id
  }
}
`;
if(selectedCatagory.value = "All"){
  const {data:recipesData} = await useAsyncQuery(recipeQuery)
  recipes.value = recipesData.value.recipes;
}

// Search function with postgres functions
async function getRecipesBySearch(){
  const recipeQuery = gql`
    query recipes($search: String) {
      search_recipes(args: {search: $search}, order_by: {id: desc}) {
        id
      }
    }
    `;
  const {data:recipesData} = await useAsyncQuery(recipeQuery,{search: searchParam.value})
  recipes.value = recipesData.value.search_recipes;
}

// Get recipes by catagories
async function getRecipes(){
  if(selectedCatagory.value == "All"){
    const {data:recipesData} = await useAsyncQuery(recipeQuery)
    const allRecipes = recipesData.value.recipes;
    recipes.value = allRecipes
  }
  else
  {
    const recipesByCatagory = gql `
      query recipes ($catagory: String) {
        recipes(where: {category: {_eq: $catagory}}) {
          id
        }
      }
      `;
    const {data: recipesByCatagoryData} = await useAsyncQuery(recipesByCatagory,{catagory:selectedCatagory.value})
    const recipeWithCatagory = recipesByCatagoryData.value.recipes
    recipes.value = recipeWithCatagory
  }
}

// Listen for any change in search value and catagory values
watch(searchParam,getRecipesBySearch)
watch(selectedCatagory,getRecipes)
</script>

<template>
  <div class="max-h-screeen flex flex-col">
    <Header v-model="searchParam"/>
    <div class="flex-grow-1 grid grid-cols-[auto,1fr] overflow-auto">
      <div class=""><SideBar/></div>
      <div class="overflow-x-hidden px-8 pb-4">
        <div class="sticky top-0 bg-white z-10 pb-4"><Catagories/></div>
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
        >
          <RecipeCard v-for="recipe in recipes" :recipeId="recipe.id" :key="recipe.id"/>
        </div>
      </div>
    </div>
  </div>
</template>
