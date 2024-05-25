<template>
  <div class="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6 border">
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
        <input type="search" placeholder="Search" class="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none">
        <Button class="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
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
      <Button size="icon" variant="ghost">
        <Icon name="lucide:upload"/>
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="lucide:bell"/>
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="lucide:user"/>
      </Button>
    </div>
  </div>
</template>
