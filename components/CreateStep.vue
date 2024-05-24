<template>
  <div class="flex items-center justify-center">
    <div
      class="m-2 flex flex-col overflow-hidden rounded-md border pb-4 shadow-md sm:w-[400px]"
    >
      <div class="flex justify-center py-2">
        <h1 class="text-[40px]">Steps</h1>
      </div>
      <form class="flex flex-col">
        <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
          <label>Instruction: </label>
          <textarea
            class="w-full rounded-lg border-gray-300 shadow-sm"
            required
          ></textarea>
        </div>
        <div class="flex w-full flex-col justify-start gap-1 p-2 px-4">
          <label>Time: </label>
          <div class="flex w-full gap-1">
            <input
              class="w-10/12 rounded-lg border-gray-300"
              type="range"
              min="0"
              max="100"
              required
            />
            <input
              type="text"
              class="w-2/12 rounded-lg border-gray-300 shadow-sm"
              placeholder="min"
            />
          </div>
        </div>
        <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
          <label>Image (optional): </label>
          <input class="" type="file" />
        </div>
        <div class="my-2 flex justify-end">
          <div class="flex flex-col">
            <button
              class="mx-4 my-2 justify-center rounded-full bg-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ffffe6]"
            >
              Add Step
            </button>
            <button
              class="mx-4 my-2 justify-center rounded-full bg-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ffffe6]"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
