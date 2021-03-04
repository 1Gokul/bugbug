import { Temporal } from "proposal-temporal/lib/index.mjs";
import * as common from "./common.js";

let resultGraphs = document.getElementById("result-graphs");
const dependencySection = document.getElementById("dependency-section");

async function renderUI() {
  resultGraphs.textContent = "";
  dependencySection.textContent = "";

  const bugSummaries = await common.getFilteredBugSummaries();

  let riskChartEl = document.createElement("div");
  resultGraphs.append(riskChartEl);
  await common.renderRiskChart(riskChartEl, bugSummaries);

  let regressionsChartEl = document.createElement("div");
  resultGraphs.append(regressionsChartEl);
  await common.renderRegressionsChart(regressionsChartEl, bugSummaries);

  let typesChartEl = document.createElement("div");
  resultGraphs.append(typesChartEl);
  await common.renderTypesChart(typesChartEl, bugSummaries);

  let fixTimesChartEl = document.createElement("div");
  resultGraphs.append(fixTimesChartEl);
  await common.renderFixTimesChart(fixTimesChartEl, bugSummaries);

  let patchCoverageChartEl = document.createElement("div");
  resultGraphs.append(patchCoverageChartEl);
  await common.renderPatchCoverageChart(patchCoverageChartEl, bugSummaries);

  let reviewTimeChartEl = document.createElement("div");
  resultGraphs.append(reviewTimeChartEl);
  await common.renderReviewTimeChartElChart(reviewTimeChartEl, bugSummaries);

  const external_components = common.allComponents.filter(
    (component) => !common.getOption("components").includes(component)
  );

  const dependencyHeatmapChartEl = document.createElement("div");
  dependencySection.append(dependencyHeatmapChartEl);
  await common.renderDependencyHeatmap(
    dependencyHeatmapChartEl,
    "Dependencies from external components (columns) to selected components (rows)",
    external_components,
    common.getOption("components")
  );
}

(async function init() {
  let startDate = Temporal.now.plainDateISO().subtract({ years: 1 }).toString();
  document.getElementById("createStartDate").value = document.getElementById(
    "fixStartDate"
  ).value = startDate;

  await common.setupOptions(renderUI);

  await renderUI();
})();
