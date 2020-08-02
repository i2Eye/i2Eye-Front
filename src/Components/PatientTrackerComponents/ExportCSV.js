import * as XLSX from "xlsx";
import getTestData from "../../TestData";

const questionRef = getTestData(1);

const exportCSV = (csvData) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = "xlsx";

  const formatJSON = (fieldName) => {
    const dataList = csvData.map((person) => {
      const personData = {};
      person[fieldName].map((question) => {
        personData[question.num] = Array.isArray(question.answer)
          ? question.answer.toString()
          : question.answer;
      });
      return personData;
    });
    const header = {};
    questionRef[fieldName].map((question) => {
      header[question.num] = question.num + ". " + question.question;
    });
    return [header, ...dataList];
  };

  const exportToCSV = () => {
    const registrationSheet = XLSX.utils.json_to_sheet(
      formatJSON("registration"),
      { skipHeader: true }
    );
    const oralHealthSheet = XLSX.utils.json_to_sheet(formatJSON("oralHealth"), {
      skipHeader: true,
    });
    const bmiSheet = XLSX.utils.json_to_sheet(formatJSON("bmi"), {
      skipHeader: true,
    });
    const eyeScreeningSheet = XLSX.utils.json_to_sheet(
      formatJSON("eyeScreening"),
      { skipHeader: true }
    );
    const phlebotomySheet = XLSX.utils.json_to_sheet(formatJSON("phlebotomy"), {
      skipHeader: true,
    });
    const fingerstickAnemiaSheet = XLSX.utils.json_to_sheet(
      formatJSON("fingerstickAnemia"),
      { skipHeader: true }
    );
    const fingerstickRCBGSheet = XLSX.utils.json_to_sheet(
      formatJSON("fingerstickRCBG"),
      { skipHeader: true }
    );
    const bloodPressureSheet = XLSX.utils.json_to_sheet(
      formatJSON("bloodPressure"),
      { skipHeader: true }
    );
    const doctorSheet = XLSX.utils.json_to_sheet(formatJSON("doctorsConsult"), {
      skipHeader: true,
    });

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, registrationSheet, "Basic Info");
    XLSX.utils.book_append_sheet(wb, oralHealthSheet, "Oral Health");
    XLSX.utils.book_append_sheet(wb, bmiSheet, "BMI and Abdominal Obesity");
    XLSX.utils.book_append_sheet(wb, eyeScreeningSheet, "Eye Screening");
    XLSX.utils.book_append_sheet(wb, phlebotomySheet, "Phlebotomy Test");
    XLSX.utils.book_append_sheet(
      wb,
      fingerstickAnemiaSheet,
      "Fingerstick Blood Test (Anemia)"
    );
    XLSX.utils.book_append_sheet(
      wb,
      fingerstickRCBGSheet,
      "Fingerstick Blood Test (RCBG)"
    );
    XLSX.utils.book_append_sheet(wb, bloodPressureSheet, "Blood Pressure");
    XLSX.utils.book_append_sheet(wb, doctorSheet, "Doctor's Consult");

    const excelBuffer = XLSX.write(wb, {
      bookType: fileExtension,
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    return data;
  };

  return exportToCSV();
};

export default exportCSV;
