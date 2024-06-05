<script setup>
const props = defineProps({
  recipeId:{
    type: Number,
    required: true,
  }
})
// Defaults
const thumbnailURL = ref("https://th.bing.com/th/id/R.d0836dd0b11b9a482ef6d20bb884e9fa?rik=DEUftt8n%2fR%2b%2bWw&pid=ImgRaw&r=0");
const Title = ref("Title");
const Avator = ref("https://th.bing.com/th/id/OIP.VkAMJ7tPlTf22T4vZ2ozjgHaHa?rs=1&pid=ImgDetMain");
const CookTime = ref()
const Likes = ref()
const Rating = ref()

const recipeDetails = gql`
  query recipes($recipeId: Int) {
    recipe_images(where: {recipe_id: {_eq: $recipeId}}) {
      thumbnail
    }
    recipes(where: {id: {_eq: $recipeId}}) {
      title
    }
  }
`;

const recipeId = props.recipeId;
const {data} = await useAsyncQuery(recipeDetails, {recipeId})
const thumbnail = data.value.recipe_images[0].thumbnail
thumbnailURL.value = thumbnail
const title = data.value.recipes[0].title;
Title.value = title;
</script>
<template>
  <NuxtLink :to="`/recipe/${recipeId}`">
    <div
      class="relative m-1 flex min-w-[200px] flex-col overflow-hidden rounded p-1 shadow-md"
    >
      <img
        class="max-h-[200px] w-full rounded object-cover"
        :src="thumbnailURL"
        alt="reicpe"
      />
  
      <div class="m-1 flex items-start gap-1">
        <img
          class="m-1 aspect-square max-w-[50px] overflow-hidden rounded-full object-cover"
          :src="Avator"
          alt="avator"
        />
  
        <div class="m-1 flex flex-col">
          <h3 class="font-bold">{{ Title }}</h3>
          <div class="flex gap-1 font-light">
            <span class="basis-full">Like: <span class="text-sm">{{ Likes }}</span></span>
            <span class="basis-full">Rate: <span class="text-sm">{{ Rating }}</span></span>
          </div>
        </div>
      </div>
  
      <div
        class="absolute ml-1 mt-1 rounded-full bg-[#ff9900] p-2 text-xs uppercase text-[#fff5cc]"
      >
        <span>{{ CookTime }} min</span>
      </div>
    </div>
  </NuxtLink>
</template>

