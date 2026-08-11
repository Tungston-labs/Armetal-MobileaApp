import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

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

    const company = payslip.company || {};

    const logoSize = 50;
    const logoX = 50;
    let logoY = y - logoSize;

    if (company.logo_url) {
      try {
        const logoBytes = await fetch(company.logo_url).then((res) => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoBytes);
        page.drawImage(logoImage, { x: logoX, y: logoY, width: logoSize, height: logoSize });
      } catch (err) {
        console.warn("⚠️ Could not load company logo:", err);
      }
    }

    const textX = logoX + logoSize + 15;
    let textY = y - 10;

    page.drawText(company.name || "Company Name Pvt. Ltd.", {
      x: textX,
      y: textY,
      size: 18,
      font: fontBold,
      color: rgb(0, 0, 0.6),
    });

    textY -= 18;
    if (company.address)
      page.drawText(company.address, { x: textX, y: textY, size: 10, font, color: rgb(0.3, 0.3, 0.3) });

    textY -= 14;
    if (company.email || company.contact_number)
      page.drawText(
        `${company.email || ""} ${company.contact_number ? "| " + company.contact_number : ""}`,
        { x: textX, y: textY, size: 10, font, color: rgb(0.3, 0.3, 0.3) }
      );

    y = Math.min(logoY, textY) - 25;

    // Divider line
    page.drawLine({ start: { x: 45, y }, end: { x: width - 45, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
    y -= 20;

  
    page.drawText(`Payslip for ${payslip.month} ${payslip.year}`, {
      x: 50,
      y,
      size: 13,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 30;

    const details = [
      `Employee Name: ${payslip.employee_name || "-"}`,
      `Employee ID: ${payslip.employee_id || "-"}`,
      `Department: ${payslip.department || "-"}`,
      `Designation: ${payslip.designation || "-"}`,
      `Email: ${payslip.email || "-"}`,
    ];

    const boxX = 65;
    const boxWidth = width - 90;
    const boxHeight = 90;

    page.drawRectangle({
      x: boxX,
      y: y - boxHeight,
      width: boxWidth,
      height: boxHeight,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
    });

    const paddingLeft = 15;
    let dy = y - 20;
    details.forEach((line) => {
      page.drawText(line, { x: boxX + paddingLeft, y: dy, size: 10.5, font });
      dy -= 13;
    });

    y -= boxHeight + 20;

    const earnings = payslip.earnings || [];
    const deductions = payslip.deductions || [];
    const maxRows = Math.max(earnings.length, deductions.length);

    const tableBoxHeight = maxRows * 15 + 40; // dynamic height
    page.drawRectangle({
      x: boxX,
      y: y - tableBoxHeight,
      width: boxWidth,
      height: tableBoxHeight,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
      color: rgb(0.97, 0.97, 0.97),
    });

    // Table headers
    let tableY = y - 20;
    page.drawText("Earnings", { x: boxX + paddingLeft, y: tableY, size: 12, font: fontBold });
    page.drawText("Deductions", { x: boxX + boxWidth / 2 + paddingLeft, y: tableY, size: 12, font: fontBold });
    tableY -= 20;

    for (let i = 0; i < maxRows; i++) {
      const e = earnings[i];
      const d = deductions[i];
      if (e)
        page.drawText(`${e.label}: ${toRs(e.amount)}`, { x: boxX + paddingLeft, y: tableY, size: 10.5, font });
      if (d)
        page.drawText(`${d.label}: ${toRs(d.value || d.amount)}`, { x: boxX + boxWidth / 2 + paddingLeft, y: tableY, size: 10.5, font });
      tableY -= 15;
    }

    y -= tableBoxHeight + 20;

    const summary = [
      `Working Days: ${payslip.working_days ?? "-"}`,
      `Days Present: ${payslip.days_present ?? "-"}`,
      `LOP Days: ${payslip.lop_days ?? "-"}`,
      `Gross Earnings: ${toRs(payslip.gross_earnings)}`,
      `Total Deductions: ${toRs(payslip.total_deductions)}`,
    ];

    let summaryY = y;
    summary.forEach((line) => {
      page.drawText(line, { x: boxX + paddingLeft, y: summaryY, size: 10.5, font });
      summaryY -= 13;
    });

    y = summaryY - 20;

    const netPayText = `Net Pay: ${toRs(payslip.net_pay)}`;
    const netPayWidth = fontBold.widthOfTextAtSize(netPayText, 12);
    page.drawText(netPayText, {
      x: 45 + (width - 90 - netPayWidth) / 2,
      y: y - 10,
      size: 12,
      font: fontBold,
      color: rgb(0, 0.4, 0),
    });

    
    const pdfBytes = await pdfDoc.save();
    const fileName = `Payslip_${payslip.month}_${payslip.year}.pdf`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const base64Data = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Toast.show({
        type: "success",
        text1: "PDF Generated",
        text2: `File saved at: ${fileUri}`,
      });
    }
  } catch (error) {
    console.error("❌ PDF Generation Error:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Could not generate payslip PDF",
    });
  }
};

export default handleGeneratePDF;
