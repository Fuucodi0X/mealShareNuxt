<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const { data: catagories } = useAvalibleCatagories();
const props = defineProps({
  banner: {
    type: String,
    default:
      "https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg",
  },
});

// Custom validation for file input using zod
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const fileSchema = z.instanceof(File)
  .refine(file => file.size <= FILE_SIZE, {
    message: 'File is too large, should be less than 5MB',
  })
  .refine(file => SUPPORTED_FORMATS.includes(file.type), {
    message: 'Choose Image, Unsupported file format',
  });

// Creating vaidation schema
const recipeValidation = toTypedSchema(
  z.object({
    title: z.string().min(3, "Too short, Must be > 3"),
    thumbnail: fileSchema,
    ingerdients: z.string(),
    catagory: z.string(),
    description: z.string().min(10, "Too short, add little description"),
  }),
);

// Creating form and fields
const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: recipeValidation,
});

const [title, titleProps] = defineField("title",{validateOnModelUpdate: false,});
const [thumbnail, thumbnailProps] = defineField("thumbnail",{validateOnModelUpdate: false,});
const [ingerdients, ingerdientsProps] = defineField("ingerdients",{validateOnModelUpdate: false,});
const [catagory, catagoryProps] = defineField("catagory",{validateOnModelUpdate: false,});
const [description, descriptionProps] = defineField("description",{validateOnModelUpdate: false,});

// Multiple ingredients -> [ingredients] (Stiring -> Array)
const ingerdientsArray = ref([]);
const ingerdientsToArray = z.string().transform(val => val.split(",").map( items => items.trim()))
function toIngerdient(){
  ingerdientsArray.value = ingerdientsToArray.parse(values.ingerdients)
}


// Image Upload logic
const selectedFile = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    thumbnail.value = file;
  }
};

const uploadFile = async () => {
  if (!selectedFile.value) return;
  
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


// Form Submission Logic
const onSubmit =  handleSubmit( async (values) => { 
  // create recipe
  const recipeData = {
    title: title.value,
    description: values.description,
    userId: 1,
    catagory: values.catagory
  };
  const { data:recipe } = await createRecipe(recipeData);


  if(recipe) {
    const thumbnailImg = await uploadFile();
    const recipeId = recipe.insert_recipes_one.id;
  
    ingerdientsArray.value.map( async (ingredient) => {
      await addIngredient({recipeId,ingredient})
    })
  
    const data = await addThumbnail({recipeId,thumbnailImg})
    console.log("hi")
    if(data) navigateTo('/recipe/steps')
  }
  else{
    console.log("Error creating recipe!")
  } 
  
});

</script>

<template>
  <div
    class="m-2 flex flex-col overflow-hidden rounded-md border pb-4 shadow-md sm:w-[400px]"
  >
  <img class="h-[100px] object-cover" :src="banner" alt="recipes" />
    <form class="flex flex-col">
      <div class="flex w-full flex-col justify-start gap-1 p-2 px-4">
        <label>Title: </label>
        <input
          class="w-full rounded-lg border-gray-300 shadow-sm"
          type="text"
          v-model="title"
          :="titleProps"
        />
        <pre class="text-xs text-[#ff0000]">{{ errors.title }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <label for="thumbImg">Thumbnail: </label>
        <input :="thumbnailProps" name="thumbImg" class="" required type="file" @change="handleFileChange" />
        <pre class="text-xs text-[#ff0000]">{{ errors.thumbnail }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <label>Catagories: </label>
        <select v-model="catagory" :="catagoryProps" class="w-full rounded-lg border-gray-300 shadow-sm">
          <option value="" disabled>Please Select</option>
          <option v-for="catagory of catagories" :value="catagory">
            {{ catagory }}
          </option>
        </select>
        <pre class="text-xs text-[#ff0000]">{{ errors.catagory }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <div class="flex flex-col">
          <label for="thumbImg">Ingerdients: </label>
          <span class="text-sm font-extralight"> separate them by ","</span>
        </div>
        <input
          name="thumbImg"
          class="w-full rounded-lg border-gray-300 shadow-sm"
          type="text"
          v-model="ingerdients"
          :="ingerdientsProps"
          @blur="toIngerdient"
          />
          <pre class="text-xs text-[#ff0000]">{{ errors.ingerdients }}</pre>
      </div>
      <div class="flex w-full flex-col justify-start gap-2 p-2 px-4">
        <label>Description: </label>
        <textarea
          class="w-full rounded-lg border-gray-300 shadow-sm"
          v-model="description"
          v-bind="descriptionProps"
        ></textarea>
        <pre class="text-xs text-[#ff0000]">{{ errors.description }}</pre>
      </div>
      <div
        class="mx-4 my-2 w-[150px] cursor-pointer rounded-full bg-blue-400 px-3 py-2 text-center text-xs font-bold uppercase tracking-wider text-[#ffffe6]"
        @click="onSubmit"
      >
        Create Recipes
      </div>
    </form>
  </div>
</template>
