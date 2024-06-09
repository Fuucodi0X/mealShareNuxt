<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = process.client ? useAuth0() : undefined
const {id:recipeId} = useRoute().params


// Default data values for the reative variables
const thumbnail = ref("https://th.bing.com/th/id/R.d0836dd0b11b9a482ef6d20bb884e9fa?rik=DEUftt8n%2fR%2b%2bWw&pid=ImgRaw&r=0")
const title = ref("Title")
const description = ref("Description")

// Graphql query for recipeDetails
const recipeDetails = gql`
  query recipes($recipeId: Int) {
    recipe_images(where: {recipe_id: {_eq: $recipeId}}) {
      thumbnail
    }
    recipes(where: {id: {_eq: $recipeId}}) {
      title
      description
    }
  }
`;

// Fetch and save data from hausra
const {data} = await useAsyncQuery(recipeDetails, {recipeId})
const thumbnailUrl = data.value.recipe_images[0].thumbnail
const recipeTitle = data.value.recipes[0].title
const recipeDescription = data.value.recipes[0].description
thumbnail.value = thumbnailUrl
title.value = recipeTitle
description.value = recipeDescription

// Add new review (with authentication check)
function createReview(){
  if (process.client) {
    auth0.checkSession()
    if (!auth0.isAuthenticated.value) {
      auth0.loginWithRedirect({
        appState: {
          target: useRoute().path,
        },
      })
    }
    else{
      console.log("hello bro");
    }
  }
}
</script>

<template>
<div class="flex h-screen">

  <NuxtLink class="fixed top-3 left-3 "to="/">
    <Button size="icon" variant="ghost" class="m-5 cursor-pointer bg-[#fff5ce2d]">
      <Icon name="lucide:arrow-left"/>
    </Button>
  </NuxtLink>

  <div class="w-9/12 flex flex-col overflow-auto border gap-4 pb-4">
    <img
    class="sticky -z-20 top-0 w-full object-cover h-2/5"
    :src="thumbnail" alt="tumbnail">
    <div class="px-20 bg-white rounded-2xl">
      <div class="flex flex-col my-14 gap-4">
        <h1 class="text-xl">
          RecipeName: <span class="text-2xl font-bold">{{ title }}</span>
        </h1>
        <p class="font-light">
          Description: {{ description }}
        </p>
      </div>
      <Avator/>
      <Ingredient :recipeId="recipeId"/>
      <Step :recipeId="recipeId" />
    </div>
  </div>

  <div class="relative w-3/12 overflow-auto border flex flex-col">
    <div class="fixed top-0">
      <div class="px-10 mt-2">Reviews</div>
    </div>
    <Button @click="createReview" size="icon" variant="dark" class="fixed bottom-3 right-3 m-5 cursor-pointer">
          <Icon name="lucide:plus"/>
    </Button>
  </div>

</div>
</template>