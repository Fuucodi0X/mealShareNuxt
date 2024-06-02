// Creating recipe in database
const addRecipe = gql`
mutation createRecipe($title: String, $description: String, $userId: Int, $catagory: String) {
    insert_recipes_one(object: {title: $title, description: $description, user_id: 1, category: $catagory}) {
      id
    }
  }
`;
export const { mutate:createRecipe } = useMutation(addRecipe);

// Adding ingeredient in the recipe
const ingredient = gql`
mutation addIngredient($recipeId: Int, $ingredient: String) {
  insert_ingredients_one(object: {recipe_id: $recipeId, ingredient: $ingredient}) {
    id
  }
}
`;
export const { mutate:addIngredient } = useMutation(ingredient)

// Adding thumbnail image on the recipe
const addRecipeImg = gql`
mutation addThumbnail($recipeId: Int, $thumbnailImg: String) {
  insert_recipe_images_one(object: {thumbnail: $thumbnailImg, recipe_id: $recipeId}) {
    id
  }
}
`;
export const {mutate:addThumbnail} = useMutation(addRecipeImg);
