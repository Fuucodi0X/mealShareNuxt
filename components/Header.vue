<template>
  <div class="flex gap-10 lg:gap-20 justify-between p-2 mx-4 mb-6 sticky top-0 z-50 bg-white">
    <div class="flex flex-shrink-0 items-center gap-2">
      <Button size="icon" variant="ghost">
        <Icon name="lucide:menu"/>
      </Button>
      <NuxtLink to="/">
        <img class="h-12" src="/public/img/FoodLogo.png" alt="Food Logo">
      </NuxtLink>
    </div>
    <form class="md:flex hidden flex-grow gap-4 justify-center">
      <div class="flex flex-grow max-w-[600px]">
        <input v-model="searchText" type="text" placeholder="Search" class="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none">
        <Button @click="search" class="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Icon name="lucide:search"/>
        </Button>
      </div>
      <Button type="button" size="icon" class="flex-shrink-0">
          <Icon name="lucide:mic"/>
      </Button>
    </form>
    <div class="flex flex-shrink-0 md:gap-2">
      <Button size="icon" variant="ghost" class="md:hidden">
          <Icon name="lucide:search"/>
      </Button>
      <Button size="icon" variant="ghost" class="md:hidden">
          <Icon name="lucide:mic"/>
      </Button>
      <NuxtLink to="/recipe/new">
        <Button  size="icon" variant="ghost">
          <Icon name="lucide:upload"/>
        </Button>
      </NuxtLink>
      <Button v-if="isAuthenticated" size="icon" variant="ghost">
        <Icon name="lucide:bell"/>
      </Button>
      <Button v-if="isAuthenticated" size="icon" variant="ghost">
        <Icon name="lucide:user"/>
      </Button>
      <Button v-if="isAuthenticated" size="icon" variant="ghost">
        <Icon  @click="logout" name="lucide:log-out"/>
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

// Composition API
const auth0 = process.client ? useAuth0() : undefined
const isAuthenticated = computed(() => {
  return auth0?.isAuthenticated.value
})

const logout = () => {
  if(process.client){
    localStorage.removeItem("hasura-token")
    navigateTo('/')
    auth0?.logout()
  }
}

// Search field data
const props = defineProps({
  modelValue: String
})
const searchText = ref("")

// Updates the v-model data(search params) when search button is clicked
const emit = defineEmits(['update:modelValue']);
const search = () => {
  emit('update:modelValue', searchText.value);
};
</script>