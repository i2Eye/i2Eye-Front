import getTestData from "../../TestData";
import exportCSV from "./ExportCSV";

self.addEventListener("message", function (event) {
  const csvData = [];
  for (let i = 1; i <= 10000; i++) {
    csvData[i - 1] = getTestData(i);
  }
  self.postMessage(exportCSV(csvData));
});
