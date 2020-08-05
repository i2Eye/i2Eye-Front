import getTestData from "../../TestData";
import exportCSV from "./ExportCSV";
import autoTable from "jspdf-autotable";

global.window = {};

self.addEventListener("message", function (event) {
  switch (event.data.data) {
    case "save excel": {
      const csvData = [];
      for (let i = 1; i <= 10000; i++) {
        csvData[i - 1] = { id: i, ...getTestData(i) };
      }
      self.postMessage(exportCSV(csvData));
      self.close();
      break;
    }

    case "save individual excel": {
      const id = event.data.id1
      const csvData = [];
        csvData[0] = { id: id, ...getTestData(id) };
      self.postMessage(exportCSV(csvData));
      self.close();
      break;
    }

    case "save pdf": {
      console.log(event.data)

      console.log("a")
      const jsPDF = require("jspdf/dist/jspdf.node.min");
      var doc = new jsPDF({ orientation: "l", unit: "cm", format: "a4" });
      doc.text("test", 1, 1);
      const header = [
        "ID",
        ...getTestData(1)
          .registration.map(
            (question) => question.num + ". " + question.question
          )
          .slice(0, 5),
      ];
      const people = [];
      for (let i = 1; i <= 10000; i++) {
        people[i - 1] = [
          i,
          ...getTestData(i)
            .registration.map((question) => question.answer)
            .slice(0, 5),
        ];
      }
      const table = { head: [header], body: people };

      autoTable(doc, table);
      var pdfBlob = doc.output("blob");
      self.postMessage(pdfBlob);
      self.close();
      break;
    }

    case "save individual pdf": {

      console.log(event.data)
      const id = event.data.id1
      const jsPDF = require("jspdf/dist/jspdf.node.min");
      var doc = new jsPDF({ orientation: "l", unit: "cm", format: "a4" });
            doc.setFontSize(10);
            // autoTable(doc, table);

      console.log(getTestData(id).registration[6].question)
      var text = []

      var peopl=[];
      peopl[0] = [
        id,
        ...getTestData(id)
          .registration.map((question) => text.push(question.num.toString() + ". " + question.question + ": " + question.answer.toString()))
      ];

     for(var i=0; i< 25;i++) {
      console.log(text[i])

      doc.text(text[i], 1, 1 + 0.7*i)

     }
     
      var pdfBlob = doc.output("blob");
      self.postMessage(pdfBlob);
      self.close();
      break;
    }
    
    default: {
      console.log("error");
      break;
    }
  }

}
);
