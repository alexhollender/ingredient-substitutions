let arr = [
  {
    "ingredientName": "Brazilnut",
    "substituteName": "paradise nut",
    "category": "",
    "proportion": "",
    "note": ""
  },
  {
    "ingredientName": "Brazilnut",
    "substituteName": "almonds",
    "category": "",
    "proportion": "",
    "note": ""
  },
  {
    "ingredientName": "Brazilnut",
    "substituteName": "pecans",
    "category": "",
    "proportion": "",
    "note": ""
  },
  {
    "ingredientName": "Brown rice",
    "substituteName": "wild pecan rice",
    "category": "",
    "proportion": "",
    "note": ""
  },
  {
    "ingredientName": "Brown rice",
    "substituteName": "white rice",
    "category": "",
    "proportion": "",
    "note": ""
  },
  {
    "ingredientName": "Buckwheat",
    "substituteName": "kasha",
    "category": "",
    "proportion": "",
    "note": ""
  }
]

let subsArr = []

// create the top part of the ingredient object
arr.forEach((item) => {
  if (!subsArr.some(e => e.ingredientName === item.ingredientName)) {
    subsArr.push({
      "id": item.ingredientName.toLowerCase().replace(/ /g,"_"),
      "ingredientName": item.ingredientName,
      "substitutes": []
    })
  }
})

// add in the substitutes for each ingredient
arr.forEach((item) => {
  // find the index of the relevant ingredient
  let relevantIndex = subsArr.findIndex(i => i.ingredientName === item.ingredientName)
  // remove the ingredient name property
  // (it's already in the top part of the object)
  delete item.ingredientName
  // give item a score of "0"
  item.score = "0"
  let keysToCheck = ["category", "proportion", "note"]
  keysToCheck.forEach((key) => {
    if (item[key].length == 0) {
      delete item[key]
    }
  })
  // push item to that object's items array
  subsArr[relevantIndex].substitutes.push(item)
})
