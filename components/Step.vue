<script setup>
const props = defineProps({
    recipeId:{
        type: String,
        required: true,
        default: "0"
    }
})
// 
const steps = ref()

const recipeDetails = gql`
query recipes($recipeId: Int) {
    steps(where: {recipe_id: {_eq: $recipeId}}) {
        instruction
        id
    }
}
`;

const stepImage = gql`
query stepImages($stepId: Int) {
    step_images(where: {step_id: {_eq: $stepId}}) {
        step_img
    }
}
`;
const images = ref([]); 

const recipeId = Number(props.recipeId);
const {data} = await useAsyncQuery(recipeDetails, {recipeId})
const recipeSteps = data.value.steps
steps.value = recipeSteps
// console.log(steps.value,recipeId)
function getInstruction(num) {
    return steps.value[num].instruction
}
async function hasImage(num){
    const stepId = steps.value[num].id
    const {data} = await useAsyncQuery(stepImage, {stepId})
    const image = data.value.step_images
    // console.log(image.length != 0)
    return image.length != 0
}
async function getImage(num){
    const stepId = steps.value[num].id
    const {data} = await useAsyncQuery(stepImage, {stepId})
    let stepImg = null
    // if(hasImage(num)){
    //     stepImg = data.value.step_images[0]
    //     // console.log(stepImg.step_img)
    //     // return stepImg.step_img
    // }
    // console.log(stepImg)
    return stepImg
}
for(let i = 0; i < steps.value.length; i++){
    images.value.push(getImage(i))
}
console.log(images.value)

function isEvenNum(num){
    return num % 2 == 0
}

</script>

<template>
    <div class="flex flex-col">
        <div class="text-center font-bold text-[40px] mt-20">Steps</div>
        <div v-if="steps.length == 0" class="px-24 py-24 my-10 text-[20px]">
            No steps added
        </div>
        <div v-for="(_,num) in steps" class="relative px-24 py-24 my-10 flex gap-6">
            <div class="absolute aspect-square rounded-l-[20px] rounded-r-[20px] border p-1 top-8 left-16 flex items-center justify-center">Step {{ num + 1 }}</div>
            <div class="absolute aspect-square rounded-full border p-2 top-0 right-8 flex items-center justify-center">30 min</div>
            <div v-if="isEvenNum(num)" class="flex gap-6 w-full">
                <div class="w-full"> {{ getInstruction(num) }} </div>
                <div class="w-full">
                    <img
                        class="object-contain max-h-[300px] rounded-xl"
                        src="https://th.bing.com/th/id/R.d0836dd0b11b9a482ef6d20bb884e9fa?rik=DEUftt8n%2fR%2b%2bWw&pid=ImgRaw&r=0"
                    />
                </div>
            </div>
            <div v-else class="flex gap-6 w-full">
                <div class="w-full">
                    <img v-if="!isEvenNum(num)"
                        class="object-contain max-h-[300px] rounded-xl"
                        src="https://th.bing.com/th/id/R.d0836dd0b11b9a482ef6d20bb884e9fa?rik=DEUftt8n%2fR%2b%2bWw&pid=ImgRaw&r=0"
                    />
                </div>
                <div class="w-full"> {{ getInstruction(num) }} </div>    
            </div>
        </div>
    </div>
</template>