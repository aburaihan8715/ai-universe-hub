// load data initially
const loadTechnologiesData = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    const tools = data.data.tools;
    // console.log(tools);
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
        toolData?.pricing[i]?.plan === "Free" || toolData?.pricing[i]?.price === "No cost" || toolData?.pricing[i]?.price==='0'? "Free of cost!" : toolData.pricing[i].price;
    }
  }
  // features
  // const featuresItems = document.querySelectorAll(".feature_item");
  // for (let i = 0; i <= featuresItems.length - 1; i++) {
  //   featuresItems[i].textContent = toolData.features[i + 1]?.feature_name;
  // }
  // console.log(toolData.features[1].feature_name);

  // integrations
  // const integrationsItems = document.querySelectorAll(".integrations_item");
  // if (toolData.integrations === null) {
  //   const integrationList = document.getElementById("integration_list");
  //   integrationList.innerHTML = `<h6 class="text-danger">Data not found!!</h6>`;
  // } else {
  //   for (let i = 0; i <= integrationsItems.length - 1; i++) {
  //     // console.log(toolData.integrations[i]);
  //     integrationsItems[i].textContent = toolData?.integrations[i] ? toolData.integrations[i] : "Data not found!";
  //   }
  // }

  // image
  // const imageOfDetails = document.getElementById("image_of_details");
  // imageOfDetails.src = toolData.image_link[0];

  // accuracy
  // const accuracyNumber = document.getElementById("accuracy_number");
  // const accuracyBox = document.getElementById("accuracy_box");
  // if (toolData.accuracy.score === null) {
  //   accuracyBox.textContent= "";
  // } else {
  //   accuracyNumber.textContent = toolData.accuracy?.score ? toolData.accuracy.score : (accuracyBox.textContent = "");
  // }

  // questions and answers
  // const question = document.getElementById("question");
  // const answer = document.getElementById("answer");
  // if (toolData.input_output_examples === null) {
  //   const questionsAnswers = document.getElementById("questions_answers");
  //   questionsAnswers.innerHTML = `<h6 class="text-danger">Data not found!!</h6>`;
  // } else {
  //   question.textContent = toolData?.input_output_examples[0]?.input;
  //   answer.textContent = toolData?.input_output_examples[0]?.output;
  // }
};

// details btn handler
const showDetailsHandler = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  displayDetailsData(data.data);
};

// display data on ui
const displayToolsData = (tools) => {
  // tools = tools.slice(0, 6);
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

// ============end===========
