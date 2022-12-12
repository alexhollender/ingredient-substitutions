export function substituesByCategory(substitutes) {
  // create the substitutes by category array
  let substitutesByCategoryArray = [
    {
      "category": "general",
      "items": []
    }
  ]
  // filter the for items that have a category
  const itemsWithCategories = substitutes.filter(sub => 'category' in sub)
  // create an array with the category names
  const categories = itemsWithCategories.map(sub => sub.category)
  // remove duplicates
  const uniqueCategories = [...new Set(categories)];
  // add additional categories from uniqueCategories
  uniqueCategories.forEach((item) => {
    substitutesByCategoryArray.push({
      "category": item,
      "items": []
    })
  })
  substitutes.forEach((item, index) => {
    // add index to item
    item.index = index
    // if item has a category
    if (item.category) {
      const currentItemCategory = item.category;
      // find matching object within substitutesByCategoryArray
      let relevantIndex = substitutesByCategoryArray.findIndex(item => item.category === currentItemCategory);
      // push item to that object's items array
      substitutesByCategoryArray[relevantIndex].items.push(item);
    } else {
      // push item to general's items array
      substitutesByCategoryArray[0].items.push(item);
    }
  });
  // if general is empty, remove it
  if (substitutesByCategoryArray[0].items.length < 1) {
    substitutesByCategoryArray.splice(0,1)
  }
  return substitutesByCategoryArray
}
