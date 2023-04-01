// load data initially
const loadTechnologiesData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const tools = data.data.tools;
  // console.log(tools);
  displayToolsData(tools);
};
loadTechnologiesData();

// display tools on ui
const displayToolsData = (tools) => {
  tools = tools.slice(0, 6);

  // for (const tool of tools) {
  //   const features = tool.features;
  //   for (const feature of features) {
  //     console.log(feature);
  //   }
  // }
  // console.log(tools[0].features[0]);
  // console.log(tools.features);
  const toolsContainer = document.getElementById("tools_container");
  tools.forEach((tool) => {
    console.log(tool);
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
          <button type="button" class="btn text-danger fs-4" data-bs-toggle="modal" data-bs-target="#technologiesModal">
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    toolsContainer.appendChild(toolsItem);
  });
};
