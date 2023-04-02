// ===========utilities start==========
// loading spinner
const toggleSpinner = (isLoading) => {
  const spinnerBox = document.getElementById("spinner_box");
  if (isLoading) {
    spinnerBox.classList.remove("d-none");
  } else {
    spinnerBox.classList.add("d-none");
  }
};

//html template for displaying tools
const toolsTemplate = (tools) => {
  const toolsContainer = document.getElementById("tools_container");
  tools?.forEach((tool) => {
    const toolsItem = document.createElement("div");
    toolsItem.classList.add("col");
    toolsItem.innerHTML = `
        <div class="card h-100 p-4">
          <img src=${tool.image} class="card-img-top rounded" alt="technologies" />
          <div class="card-body">
            <h5 class="">Features</h5>
            <ol class="">
              <li>${tool.features[0] ? tool.features[0] : "Data not found"}</li>
              <li>${tool.features[1] ? tool.features[1] : "Data not found"}</li>
              <li>${tool.features[2] ? tool.features[2] : "Data not found"}</li>
            </ol>
            <hr />
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <h5>${tool.name}</h5>
              <div>
                <i class="bi bi-calendar2-week"></i>
                <span>${tool.published_in}</span>
              </div>
            </div>
            <button onclick="showDetailsHandler('${
              tool.id
            }')" type="button" class="btn text-danger fs-4" data-bs-toggle="modal" data-bs-target="#technologiesModal">
                <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    toolsContainer.appendChild(toolsItem);
  });
};

// ===========utilities end==========

// load data initially
const loadTechnologiesData = async () => {
  try {
    // loading start
    toggleSpinner(true);
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    const tools = data.data.tools;
    displayToolsData(tools);
  } catch (error) {
    console.log(error);
  }
};
loadTechnologiesData();

// display details data
const displayDetailsData = (toolData) => {
  // heading
  const detailsHeading = document.getElementById("details_heading");
  detailsHeading.textContent = toolData.description;

  // plan and pricing
  const plans = document.querySelectorAll(".plan");
  const prices = document.querySelectorAll(".price");
  const noPricing = document.getElementById("no_pricing");
  for (let i = 0; i <= plans.length - 1; i++) {
    const pricingBox = document.getElementById("pricing_box");
    if (toolData.pricing === null) {
      pricingBox.classList.add("d-none");
      noPricing.classList.remove("d-none");
    } else {
      pricingBox.classList.remove("d-none");
      noPricing.classList.add("d-none");
      plans[i].innerText = toolData?.pricing[i]?.plan;
      prices[i].innerText =
        toolData?.pricing[i]?.plan === "Free" || toolData?.pricing[i]?.price === "No cost" || toolData?.pricing[i]?.price === "0"
          ? "Free of cost!"
          : toolData.pricing[i].price;
    }
  }
  // features
  const featuresItems = document.querySelectorAll(".feature_item");
  for (let i = 0; i <= featuresItems.length - 1; i++) {
    featuresItems[i].textContent = toolData.features[i + 1]?.feature_name;
  }

  // integrations
  const integrationsItems = document.querySelectorAll(".integrations_item");
  const integrationList = document.getElementById("integration_list");
  const noIntegration = document.getElementById("no_integration");
  if (toolData.integrations === null) {
    integrationList.classList.add("d-none");
    noIntegration.classList.remove("d-none");
  } else {
    noIntegration.classList.add("d-none");
    integrationList.classList.remove("d-none");
    for (let i = 0; i <= integrationsItems.length - 1; i++) {
      integrationsItems[i].textContent = toolData?.integrations[i] ? toolData.integrations[i] : "Data not found!";
    }
  }

  // image
  const imageOfDetails = document.getElementById("image_of_details");
  imageOfDetails.src = toolData.image_link[0];

  // accuracy
  const accuracyNumber = document.getElementById("accuracy_number");
  const accuracyBox = document.getElementById("accuracy_box");
  if (toolData.accuracy.score === null) {
    accuracyBox.classList.add("d-none");
  } else {
    accuracyBox.classList.remove("d-none");
    accuracyNumber.textContent = toolData.accuracy?.score ? toolData.accuracy.score : (accuracyBox.textContent = "");
  }

  // questions and answers
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const questionsAnswers = document.getElementById("questions_answers");
  const noQuestionsAnswers = document.getElementById("no_questions_answers");
  if (toolData.input_output_examples === null) {
    questionsAnswers.classList.add("d-none");
    noQuestionsAnswers.classList.remove("d-none");
  } else {
    questionsAnswers.classList.remove("d-none");
    noQuestionsAnswers.classList.add("d-none");
    question.textContent = toolData?.input_output_examples[0]?.input;
    answer.textContent = toolData?.input_output_examples[0]?.output;
  }
};
// display all data based on click see more button
const displayAllData = (tools) => {
  const toolsContainer = document.getElementById("tools_container");
  toolsContainer.innerHTML = "";
  toolsTemplate(tools);
};

//  see more button click handler
const seeMoreBtn = document.getElementById("see_more_btn");
seeMoreBtn.addEventListener("click", function () {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllData(data.data.tools));
});

// details btn handler
const showDetailsHandler = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  displayDetailsData(data.data);
};

// display initial data on ui
const displayToolsData = (tools) => {
  const seeMoreBtnBox = document.getElementById("see_more_btn_box");
  if (tools.length > 6) {
    tools = tools.slice(0, 6);
    toolsTemplate(tools);
    // stop loading
    toggleSpinner(false);
    // display see more button box
    seeMoreBtnBox.classList.remove("d-none");
  } else {
    seeMoreBtnBox.classList.add("d-none");
  }
};

// ============end===========
