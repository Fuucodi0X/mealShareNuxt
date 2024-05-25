<template>
  <div class="max-h-screeen flex flex-col">
    <Header/>
    <div class="flex-grow-1 grid grid-cols-[auto,1fr] overflow-auto">
      <div class="border">side bar</div>
      <div class="overflow-x-hidden px-8 pb-4">
        <div class="border">Catagories</div>
        <div
          class="border grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"
        >
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </div>
    </div>
  </div>
</template>
