export default async function getCategoryName(categoryId) {
  try {
    const response = await fetch(`https://familykitchen.janne-ringdal.one/wp-json/wp/v2/categories/${categoryId}`);
    const category = await response.json();

    return category.name;
  } catch (error) {
    blogPosts.innerHTML = "error";
  }

}