<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

// Step tracker
const currentStep = ref(1);
const props = defineProps({
  recipeId: {
    type: String,
    required: true,
    default: "40"
  },
});

const stepValidation = toTypedSchema(
  z.object({
    instruction: z.string().min(20, "Too short, add little description"),
    time: z.number().int().max(60,"Time max limt is 60 min").positive("Time must be positive value"),
    // stepImg: z.nullable(isImage) ,
  }), 
);

const { values, errors, defineField, handleSubmit,resetForm } = useForm({
  validationSchema: stepValidation,
});

const [instruction, instructionProps] = defineField("instruction",{validateOnModelUpdate: false,});
const [time, timeProps] = defineField("time",{validateOnModelUpdate: false,});
const [stepImg, stepImgProps] = defineField("stepImg",{validateOnModelUpdate: false,});

// Image Upload logic
const selectedFile = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    stepImg.value = file;
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) return null;
  
  const formData = new FormData();
  formData.append('img', selectedFile.value);
  
  try {
    const { data, error } = await useFetch('http://localhost:8888/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (error.value) {
      console.error('Error uploading file:', error.value);
    } else {
      console.log('File uploaded successfully:', data.value);
      return data.value.ImgURL
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};

// Creating step in Database
const createStep = gql`
mutation createStep($minutes: interval, $instruction: String, $recipeId: Int) {
  insert_steps_one(object: {duration: $minutes, instruction: $instruction, recipe_id: $recipeId}) {
    id
  }
}
`;
const {mutate:addStep} = useMutation(createStep);

const stepImage = gql`
mutation addStepImg($stepId: Int, $stepImg: String) {
  insert_step_images_one(object: {step_img: $stepImg, step_id: $stepId}) {
    id
  }
}
`;
const { mutate:addStepImg } = useMutation(stepImage);

function add(){
  currentStep.value++
}

// Clearing the form
const image = ref(null)
function clearForm(){
  image.value.value = null
  resetForm()
}

// Submission Logic with destination route
function submitTo (action = "default") {
  // Update token if expired
  if(tokenHasExpired) getHasuraToken();
  
  // Form Submission Logic
  const onSubmit =  handleSubmit( async (values) => { 
    // create recipe
    const stepData = {
      recipeId: Number(props.recipeId),
      instruction: instruction.value,
      minutes: `${values.time} min`
    };
    const {data:step} = await addStep(stepData)
    // console.log(step)
    
    if(step) {
      const stepImg = await uploadFile();
      const stepId = step.insert_steps_one.id;
  
      if(stepImg) {
        const {data} = await addStepImg({stepId,stepImg})
        if(data) {
          if( action == "default") navigateTo("/")
          if( action == "refresh") {
            currentStep.value++;
            clearForm();
          } 
          // console.log(data)
        } 
      }
      else{
        if( action == "default") navigateTo("/")
        if( action == "refresh") {
          currentStep.value++;
          clearForm();
        }        
      }
    }
    else{
      console.log("Error creating recipe!")
    } 
    
  });

  return onSubmit
}

const nextStep = submitTo("refresh")
const submitSteps = submitTo()
</script>

<template>
  <div
    class="m-2 flex flex-col overflow-hidden rounded-md border pb-4 shadow-md sm:w-[400px]"
  >
    <div class="flex justify-center py-2">
      <h1 class="text-[40px]">Step {{ currentStep }}</h1>
    </div>
    <form class="flex flex-col">
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <label>Instruction: </label>
        <textarea
          class="w-full rounded-lg border-gray-300 shadow-sm"
          v-model="instruction"
          :="instructionProps"
        ></textarea>
        <pre class="text-xs text-[#ff0000]">{{ errors.instruction }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-1 p-2 px-4">
        <label>Time: </label>
        <div class="flex w-full gap-1">
          <input
            class="w-9/12 rounded-lg border-gray-300"
            type="range"
            min="0"
            max="100"
          />
          <input
            type="number"
            class="w-3/12 rounded-lg border-gray-300 shadow-sm"
            placeholder="min"
            v-model="time"
            :="timeProps"
          />
        </div>
        <pre class="text-xs text-[#ff0000]">{{ errors.time }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <label>Image (optional): </label>
        <input class="" :="stepImgProps" @change="handleFileChange" type="file" ref="image" />
        <pre class="text-xs text-[#ff0000]">{{ errors.stepImg, values.stepImg }}</pre>
      </div>
      <div class="my-2 flex justify-end">
        <div class="flex flex-col">
          <div
            class="cursor-pointer text-center mx-4 my-2 justify-center rounded-full bg-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ffffe6]"
            @click="nextStep"
          >
            Add Step
          </div>
          <div
            class="cursor-pointer text-center mx-4 my-2 justify-center rounded-full bg-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#ffffe6]"
            @click="submitSteps"
          >
            Done
          </div>
        </div>
      </div>  
    </form>
  </div>
</template>
