<template>
    <div class="flex justify-center items-center">
      <div class="flex flex-col sm:w-[400px] border m-2 pb-4 shadow-md rounded-md overflow-hidden">
        <img
          class="h-[100px] object-cover"
          src="https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
          alt="recipes"
        />
        <form class="flex flex-col">
          <div class="w-full flex flex-col justify-start px-4 p-2 gap-1">
            <lable>Title: </lable>
            <input
              class="w-full border-gray-300 rounded-lg shadow-sm"
              type="text"
              required
            />
          </div>
          <div class="w-full flex flex-col justify-start px-4 p-2 gap-2">
            <lable>Thumbnail: </lable>
            <input
              class=""
              type="file"
              required
            />
          </div>
          <div class="w-full flex flex-col justify-start px-4 p-2 gap-2">
            <lable>Catagories: </lable>
            <select class="w-full border-gray-300 rounded-lg shadow-sm">
              <option value="">Please Select</option>
            </select>
          </div>
          <div class="w-full flex flex-col justify-start px-4 p-2 gap-2">
            <lable>Description: </lable>
            <textarea
              class="w-full border-gray-300 rounded-lg shadow-sm"
              required
            ></textarea>
          </div>
          <div class = "mx-4 my-2 px-3 py-2 w-[150px] text-center text-xs text-[#ffffe6] rounded-full cursor-pointer uppercase font-bold tracking-wider bg-blue-400">
            Create Recipes
          </div>
        </form>
      </div>
    </div>
  </template>  