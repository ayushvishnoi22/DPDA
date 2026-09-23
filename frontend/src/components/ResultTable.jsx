import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ScoreMeter from "./ScoreMeter";
import suggestions from "./suggestions";

function ResultTable({ data, score }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("DPDP Compliance Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Compliance Score: ${score}/100`, 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["Check", "Status", "Fix Suggestion"]],
      body: data.map((item) => [
        item.check,
        item.present ? "✅ Present" : "❌ Missing",
        item.present ? "—" : suggestions[item.check],
      ]),
      styles: { fontSize: 10, cellPadding: 2 },
      theme: "grid",
    });

    const date = new Date().toLocaleString().replaceAll("/", "-");
    doc.save(`DPDP_Report_${date}.pdf`);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      {score !== null && <ScoreMeter score={score} />}
      <h2 className="text-xl font-semibold mb-4">🧾 Compliance Checklist</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Check</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Fix Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{item.check}</td>
              <td className="px-4 py-2">
                {item.present ? "✅ Present" : "❌ Missing"}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {!item.present ? suggestions[item.check] : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {score !== null && (
        <button
          onClick={downloadPDF}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📥 Download PDF Report
        </button>
      )}
    </div>
  );
}

export default ResultTable;
