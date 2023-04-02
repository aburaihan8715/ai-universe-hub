// load data initially
const loadTechnologiesData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const tools = data.data.tools;
  // console.log(tools);
  displayToolsData(tools);
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
  for (let i = 0; i <= plans.length - 1; i++) {
    plans[i].textContent = toolData.pricing[i].plan;
    prices[i].textContent =
      toolData.pricing[i].plan === "Free" || toolData.pricing[i].price === "No cost" ? "Free of cost!" : toolData.pricing[i].price;
  }
  // features of details
  // const featuresItems = document.querySelectorAll(".feature_item");
  // for(let i=0; i<=featuresItems.length-1; i++){
  //   featuresItems.textContent="hello";
  // }
  // console.log(toolData.features);

  // integrations
  const integrationsItems = document.querySelectorAll(".integrations_item");
  for (let i = 0; i <= integrationsItems.length - 1; i++) {
    console.log(toolData.integrations[i]);
    integrationsItems[i].textContent = toolData.integrations[i];
  }

  // image
  const imageOfDetails = document.getElementById("image_of_details");
  imageOfDetails.src = toolData.image_link[0];

  // accuracy
  const accuracyNumber = document.getElementById("accuracy_number");
  const accuracyBox = document.getElementById("accuracy_box");
  accuracyNumber.textContent = toolData.accuracy.score ? toolData.accuracy.score : accuracyBox.innerHTML="";
  
};

// details btn handler
const showDetailsHandler = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayDetailsData(data.data);
};

// display data on ui
const displayToolsData = (tools) => {
  // tools = tools.slice(0, 6);
  const toolsContainer = document.getElementById("tools_container");
  tools.forEach((tool) => {
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
          <button onclick="showDetailsHandler('${tool.id}')" type="button" class="btn text-danger fs-4" data-bs-toggle="modal" data-bs-target="#technologiesModal">
              <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    toolsContainer.appendChild(toolsItem);
  });
};

// ============end===========
