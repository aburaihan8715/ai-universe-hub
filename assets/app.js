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
  // console.log(toolData.pricing[0].price);
  const detailsHeading = document.getElementById("details_heading");
  detailsHeading.textContent = toolData.description;
  // plan and pricing
  const plans=document.querySelectorAll(".plan");
  const prices=document.querySelectorAll(".price");

  for(let i=0; i<=plans.length-1; i++){
    plans[i].textContent=toolData.pricing[i].plan;
    prices[i].textContent=toolData.pricing[i].plan==="Free" || toolData.pricing[i].price==="No cost"? "Free of cost!": toolData.pricing[i].price;
  }

  // for(let i=0; i<=prices.length-1; i++){
  //   // console.log(toolData.pricing[i].price);
  //   prices[i].textContent=toolData.pricing[i].price;
  // }

  
};

// show details btn handler
const showDetailsHandler = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayDetailsData(data.data);
};

// display data on ui
const displayToolsData = (tools) => {
  tools = tools.slice(0, 6);
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
            <li>${tool.features[0]}</li>
            <li>${tool.features[1]}</li>
            <li>${tool.features[2]}</li>
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
