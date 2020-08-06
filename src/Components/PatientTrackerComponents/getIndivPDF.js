import getTestData from "../../TestData";

const getIndivPDF = (id) => {
  const jsPDF = require("jspdf/dist/jspdf.node.min");
  var doc = new jsPDF({ orientation: "p", unit: "cm", format: "a4" });
  // autoTable(doc, table);

  doc.setFontSize(11);

  const margin = { topBottom: 2.54, leftRight: 2.54 };
  const spacing = { btwSameText: 0.5, btwLines: 0.7, btwPara: 1.2 };
  const pageSize = {
    height: doc.internal.pageSize.height,
    width: doc.internal.pageSize.width,
  };
  const headerFooter = { topBottom: 1.5, leftRight: 2.54 };

  let currentPage = 0;

  const formatNewPage = (doc, dataKey) => {
    currentPage++;
    const defaultSize = doc.getFontSize();
    const defaultColor = doc.getTextColor();

    doc.setFontSize(16);
    doc.setFontStyle("bold");
    doc.text(pageSections[dataKey], margin.leftRight, margin.topBottom);
    doc.setFontSize(11);
    doc.setFontStyle("normal");
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Patient ID: " + id,
      pageSize.width - headerFooter.leftRight,
      headerFooter.topBottom,
      "right"
    );
    doc.text(
      currentPage.toString(),
      pageSize.width - headerFooter.leftRight,
      pageSize.height - headerFooter.topBottom,
      "right"
    );

    currentLine = margin.topBottom + spacing.btwPara;

    doc.setFontSize(defaultSize);
    doc.setTextColor(defaultColor);
    doc.setFontStyle("normal");
  };

  const pageSections = {
    registration: "Registration",
    oralHealth: "Oral Health",
    bmi: "BMI and Abdominal Obesity",
    eyeScreening: "Eye Screening",
    phlebotomy: "Phlebotomy Test",
    fingerstickAnemia: "Fingerstick Blood Test (Anemia)",
    fingerstickRCBG: "Fingerstick Blood Test (RCBG)",
    bloodPressure: "Blood Pressure",
    doctorsConsult: "Doctor's Consult",
  };

  var stations = [];

  const personInfo = getTestData(id);

  for (const s in personInfo) {
    const data = [];
    personInfo[s].forEach((question) => {
      data.push({
        question: doc.splitTextToSize(
          question.num.toString() + ". " + question.question,
          pageSize.width - 2 * margin.leftRight
        ),
        answer: Array.isArray(question.answer)
          ? doc.splitTextToSize(
              question.answer.toString().replace(/,/g, ", "),
              pageSize.width - 2 * margin.leftRight
            )
          : doc.splitTextToSize(
              question.answer.toString(),
              pageSize.width - 2 * margin.leftRight
            ),
      });
    });
    stations.push({ station: s, data: data });
  }

  let currentLine;

  stations.forEach((station) => {
    doc.addPage();
    formatNewPage(doc, station.station);

    const data = station.data;

    for (let i = 0; i < data.length; i++) {
      let additionalHeight = 0;
      additionalHeight =
        additionalHeight +
        spacing.btwSameText * data[i].question.length +
        spacing.btwLines;
      additionalHeight =
        additionalHeight + spacing.btwSameText * data[i].answer.length;

      if (currentLine + additionalHeight > pageSize.height - margin.topBottom) {
        doc.addPage();
        formatNewPage(doc, station.station);
      }

      for (let j = 0; j < data[i].question.length; j++) {
        doc.text(data[i].question[j], margin.leftRight, currentLine);
        currentLine = currentLine + spacing.btwSameText;
      }

      currentLine = currentLine + spacing.btwLines - spacing.btwSameText;
      doc.setTextColor(90, 90, 90);

      for (let j = 0; j < data[i].answer.length; j++) {
        doc.text(data[i].answer[j], margin.leftRight, currentLine);
        currentLine = currentLine + spacing.btwSameText;
      }
      doc.setTextColor(0, 0, 0);

      currentLine = currentLine + spacing.btwPara - spacing.btwSameText;
    }
  });

  doc.deletePage(1);

  var pdfBlob = doc.output("blob");
  return pdfBlob;
};

export default getIndivPDF;
