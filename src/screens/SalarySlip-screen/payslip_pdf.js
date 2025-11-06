import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const handleGeneratePDF = async (payslip) => {
  console.log("📄 Payslip data:", payslip);

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const toRs = (amount) => `Rs. ${amount ?? 0}`;

    let y = height - 50;

    // ===========================
    // COMPANY HEADER WITH LOGO
    // ===========================
    const company = payslip.company || {};
    if (company.logo_url) {
      try {
        const logoBytes = await fetch(company.logo_url).then((res) => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoBytes);
        const logoDims = logoImage.scale(0.2);
        page.drawImage(logoImage, {
          x: 50,
          y: y - logoDims.height + 20,
          width: 40,
          height: 40,
        });
      } catch (err) {
        console.warn("⚠️ Could not load company logo:", err);
      }
    }

    page.drawText(company.name || "Company Name Pvt. Ltd.", {
      x: 120,
      y,
      size: 18,
      font: fontBold,
      color: rgb(0, 0, 0.6),
    });
    y -= 20;

    if (company.address)
      page.drawText(company.address, {
        x: 120,
        y,
        size: 9,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

    y -= 12;
    if (company.email || company.contact_number)
      page.drawText(
        `${company.email || ""}  ${company.contact_number ? "|  " + company.contact_number : ""}`,
        { x: 120, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) }
      );

    y -= 25;
    page.drawLine({
      start: { x: 45, y },
      end: { x: width - 45, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    y -= 20;

    // ===========================
    // PAYSLIP TITLE
    // ===========================
    page.drawText(`Payslip for ${payslip.month} ${payslip.year}`, {
      x: 50,
      y,
      size: 13,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 30;

    // ===========================
    // EMPLOYEE DETAILS BOX
    // ===========================
    const details = [
      `Employee Name: ${payslip.employee_name || "-"}`,
      `Employee ID: ${payslip.employee_id || "-"}`,
      `Department: ${payslip.department || "-"}`,
      `Designation: ${payslip.designation || "-"}`,
      `Email: ${payslip.email || "-"}`,
    ];

    page.drawRectangle({
      x: 45,
      y: y - 80,
      width: width - 90,
      height: 75,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
    });

    let dy = y - 20;
    details.forEach((line) => {
      page.drawText(line, { x: 60, y: dy, size: 10.5, font });
      dy -= 13;
    });

    y -= 100;

    // ===========================
    // EARNINGS & DEDUCTIONS TABLE
    // ===========================
    page.drawText("Earnings", { x: 60, y, size: 12, font: fontBold });
    page.drawText("Deductions", { x: width / 2 + 20, y, size: 12, font: fontBold });
    y -= 15;

    const earnings = payslip.earnings || [];
    const deductions = payslip.deductions || [];
    const maxRows = Math.max(earnings.length, deductions.length);

    for (let i = 0; i < maxRows; i++) {
      const e = earnings[i];
      const d = deductions[i];
      if (e)
        page.drawText(`${e.label}: ${toRs(e.amount)}`, { x: 70, y, size: 10.5, font });
      if (d)
        page.drawText(`${d.label}: ${toRs(d.value || d.amount)}`, {
          x: width / 2 + 30,
          y,
          size: 10.5,
          font,
        });
      y -= 13;
    }

    y -= 25;

    // ===========================
    // SUMMARY SECTION
    // ===========================
    const summary = [
      `Working Days: ${payslip.working_days ?? "-"}`,
      `Days Present: ${payslip.days_present ?? "-"}`,
      `LOP Days: ${payslip.lop_days ?? "-"}`,
      `Gross Earnings: ${toRs(payslip.gross_earnings)}`,
      `Total Deductions: ${toRs(payslip.total_deductions)}`,
    ];

    summary.forEach((line) => {
      page.drawText(line, { x: 60, y, size: 10.5, font });
      y -= 13;
    });

    // Highlight Net Pay
    y -= 20;
    page.drawRectangle({
      x: 45,
      y: y - 25,
      width: width - 90,
      height: 25,
      color: rgb(0.95, 0.95, 1),
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
    });
    page.drawText(`Net Pay: ${toRs(payslip.net_pay)}`, {
      x: 60,
      y: y - 10,
      size: 12,
      font: fontBold,
      color: rgb(0, 0.4, 0),
    });

    // ===========================
    // SAVE & SHARE PDF
    // ===========================
    const pdfBytes = await pdfDoc.save();
    const fileName = `Payslip_${payslip.month}_${payslip.year}.pdf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const base64Data = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert("PDF Generated", `File saved at: ${fileUri}`);
    }
  } catch (error) {
    console.error("❌ PDF Generation Error:", error);
    Alert.alert("Error", "Could not generate payslip PDF");
  }
};

export default handleGeneratePDF;
