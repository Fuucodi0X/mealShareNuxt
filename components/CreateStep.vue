<template>
    <div class="flex justify-center items-center">
      <div class="flex flex-col sm:w-[400px] border m-2 pb-4 shadow-md rounded-md overflow-hidden">
        <div class="flex justify-center py-2">
            <h1 class="text-[40px]">Steps</h1>
        </div>
        <form class="flex flex-col">
            <div class="w-full flex flex-col justify-start px-4 p-2 gap-2">
                <label>Instruction: </label>
                <textarea
                class="w-full border-gray-300 rounded-lg shadow-sm"
                required
                ></textarea>
            </div>
            <div class="w-full flex flex-col justify-start px-4 p-2 gap-1">
                <label>Time: </label>
                <div class="flex w-full gap-1">
                    <input
                    class="w-10/12 border-gray-300 rounded-lg"
                    type="range"
                    min = '0'
                    max = '100'
                    required
                    />
                    <input 
                    type="text"
                    class="w-2/12 border-gray-300 rounded-lg shadow-sm"
                    placeholder="min"
                    />
                </div>
            </div>
            <div class="w-full flex flex-col justify-start px-4 p-2 gap-2">
                <label>Image (optional): </label>
                <input
                class=""
                type="file"
                />
            </div>
            <div class="flex justify-end my-2">
                <div class="flex flex-col">
                    <div class = "mx-4 my-2 px-4 py-2 flex justify-center text-xs text-[#ffffe6] rounded-full cursor-pointer uppercase font-bold tracking-wider bg-blue-400">
                        Add Step
                    </div>
                    <div class = "mx-4 my-2 px-4 py-2 flex justify-center text-xs text-[#ffffe6] rounded-full cursor-pointer uppercase font-bold tracking-wider bg-blue-400">
                        Done
                    </div>
                </div>
            </div>
        </form>
      </div>
    </div>
</template>