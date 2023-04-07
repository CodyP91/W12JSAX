var activityContainer = document.getElementById('activity-container');
var getActivityBtn = document.getElementById('get-activity-btn');

function getActivity(category, price, accessibility) {
  var apiUrl = 'http://www.boredapi.com/api/activity';
  if (category) {
    apiUrl += '?type=' + category;
  }
  if (price) {
    apiUrl += (category ? '&' : '?') + 'price=' + price;
  }
  if (accessibility) {
    apiUrl += ((category || price) ? '&' : '?') + 'accessibility=' + accessibility;
  }
  axios.get(apiUrl)
    .then(function (response) {
      var activity = response.data.activity;
      activityContainer.innerHTML = '<p>' + activity + '</p>';
    })
    .catch(function (error) {
      console.log(error);
    });
}

getActivityBtn.addEventListener('click', function (event) {
  getActivity();
});

// Bonus: Allow the user to select different categories, price ranges, and accessibility values
var categorySelect = document.getElementById('category-select');
var priceRangeSelect = document.getElementById('price-range-select');
var accessibilityRangeSelect = document.getElementById('accessibility-range-select');

categorySelect.addEventListener('change', function (event) {
  var category = event.target.value;
  var price = priceRangeSelect.value;
  var accessibility = accessibilityRangeSelect.value;
  getActivity(category, price, accessibility);
});

priceRangeSelect.addEventListener('change', function (event) {
  var category = categorySelect.value;
  var price = event.target.value;
  var accessibility = accessibilityRangeSelect.value;
  getActivity(category, price, accessibility);
});

accessibilityRangeSelect.addEventListener('change', function (event) {
  var category = categorySelect.value;
  var price = priceRangeSelect.value;
  var accessibility = event.target.value;
  getActivity(category, price, accessibility);
});
