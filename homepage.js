// fetchapi.js

const fetchMealData = async (mealType) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealType}`);
  const data = await response.json();
  return data.meals;
};

const displayMealData = (meals) => {
  const mealContainer = document.getElementById('meal-container');
  mealContainer.innerHTML = '';

  if (meals) {
      const table = document.createElement('table');
      table.classList.add('meal-table');

      meals.forEach(meal => {
          const row = table.insertRow();
          
          const cell1 = row.insertCell(0);
          cell1.innerHTML = `<h2>${meal.strMeal}</h2>`;
          
          const cell2 = row.insertCell(1);
          cell2.innerHTML = `<strong>Category:</strong> ${meal.strCategory}`;
          
          const cell3 = row.insertCell(2);
          cell3.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100px; height: auto;">`;
          
          const cell4 = row.insertCell(3);
          cell4.innerHTML = `<h3>Meal Instruction:</h3>${meal.strInstructions}`;
          
          const cell5 = row.insertCell(4);
          cell5.innerHTML = `<h3>Ingredients:</h3>${getIngredientsList(meal)}`;
          
          const cell6 = row.insertCell(5);
          cell6.innerHTML = `<h3>Youtube Link:</h3><a href="${meal.strYoutube}" target="_blank">Watch Video: How to Prepare</a>`;


});

      mealContainer.appendChild(table);
  } else {
      mealContainer.innerHTML = 'No meals found.';
  }
};


const getIngredientsList = (meal) => {
  const ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
          ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
      }
  }
  return ingredientsList.join('');
};


document.addEventListener('DOMContentLoaded', () => {
  const fetchMealBtn = document.getElementById('fetch-meal-btn');
  const mealTypeDropdown = document.getElementById('meal-type-dropdown');

  fetchMealBtn.addEventListener('click', async () => {
      const mealType = mealTypeDropdown.value; // For dropdown
      
      const meals = await fetchMealData(mealType);

      displayMealData(meals);
  });
  
  
});







