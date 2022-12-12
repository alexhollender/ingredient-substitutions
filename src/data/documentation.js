// format of object in Algolia
{
  "id": "test_ingredient",
  "name": "test ingredient",
  "substitutes": [
    {
      "name": "grana padano cheese",
      "score": 3
    },
    {
      "name": "romano cheese",
      "score": 1,
      "category": "baking"
    },
    {
      "name": "nutritional yeast",
      "note": "This substitution works best if recipe calls for cheese to be sprinkled over a dish. Nutritional yeast is low in fat, high in protein and B vitamins, and it's not made with any animal products.",
      "score": 1
    },
    {
      "name": "sapsago cheese",
      "score": 1,
      "category": "color"
    }
  ],
  "objectID": "1ee2caf1450a1a_dashboard_generated_id"
}

// filter the for items that have a category
const itemsWithCategories = substitutes.filter(sub => 'category' in sub)
// create an array with the category name
const categories = itemsWithCategories.map(sub => sub.category)
// remove duplicates
const uniqueCategories = [...new Set(categories)];

// output:
uniqueCategories = ["baking", "color"];

// create the substitutes by category array
let substitutesByCategoryArray = [
  {
    "category": "general",
    "items": []
  }
]

// add additional categories from uniqueCategories
uniqueCategories.forEach((item) => {
  substitutesByCategoryArray.push({
    "category": item,
    "items": []
  })
})

// output:
substitutesByCategoryArray = [
    {
      "category": "general",
      "items": []
    },
    {
      "category": "baking",
      "items": []
    },
    {
      "category": "color",
      "items": []
    }
];

substitutes.forEach((item, index) => {
  // add index to item
  item.index = index
  // if item has a category
  if (item.category) {
    const currentItemCategory = item.category;
    // find matching object within substitutesByCategoryArray
    let relevantIntext = substitutesByCategoryArray.findIndex(item => item.category === currentItemCategory);
    // push item to that object's items array
    substitutesByCategoryArray[relevantIntext].items.push(item);
  } else {
    // push item to general's items array
    substitutesByCategoryArray[0].items.push(item);
  }
});

// output
[
  {
    "category": "general",
    "items": [
      {
        "name": "grana padano cheese",
        "score": 3,
        "index": 0
      },
      {
        "name": "nutritional yeast",
        "note": "This substitution works best if recipe calls for cheese to be sprinkled over a dish. Nutritional yeast is low in fat, high in protein and B vitamins, and it's not made with any animal products.",
        "score": 1,
        "index": 2
      }
    ]
  },
  {
    "category": "baking",
    "items": [
      {
        "name": "romano cheese",
        "score": 1,
        "category": "baking",
        "index": 1
      }
    ]
  },
  {
    "category": "color",
    "items": [
      {
        "name": "sapsago cheese",
        "score": 1,
        "category": "color",
        "index": 3
      }
    ]
  }
]
