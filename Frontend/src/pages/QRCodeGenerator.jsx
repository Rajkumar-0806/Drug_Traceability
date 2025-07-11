// import { useEffect, useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import axios from "axios";

// function QRCodeGenerator() {
//   const [ndcCode, setNdcCode] = useState("");
//   const [manufacturerId, setManufacturerId] = useState("");
//   const [dealerId, setDealerId] = useState("");
//   const [dealerList, setDealerList] = useState([]);
//   const [loadingDealers, setLoadingDealers] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const qrSize = 150;

//   useEffect(() => {
//     const fetchDealers = async () => {
//       try {
//         const response = await axios.get("/dealers"); // use axios baseURL
//         // If dealerList contains objects, adjust here accordingly
//         setDealerList(response.data);
//       } catch (error) {
//         console.error("Error fetching dealer list:", error);
//         setDealerList([]);
//       } finally {
//         setLoadingDealers(false);
//       }
//     };

//     fetchDealers();
//   }, []);

//   const generateQRData = () => {
//     if (!ndcCode.trim() || !manufacturerId.trim() || !dealerId.trim()) return "";
//     return `${ndcCode}|${manufacturerId}|${dealerId}`;
//   };

//   const handleSaveQR = async () => {
//     const qrData = generateQRData();
//     if (!qrData) {
//       setMessage("Please fill in all fields.");
//       return;
//     }

//     setSaving(true);
//     setMessage("");

//     try {
//       const canvas = document.getElementById("qrCanvas");
//       const qrImageUrl = canvas.toDataURL("image/png");

//       await axios.post("/save-qr", {
//         qrData,
//         qrImageUrl,
//         manufacturerId,
//         dealerId,
//       });

//       setMessage("QR Code saved successfully!");
//     } catch (error) {
//       console.error("Error saving QR code:", error);
//       setMessage("Failed to save QR code.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="qr-code-generator">
//       <h2>QR Code Generator</h2>

//       <label htmlFor="ndcCode">NDC Code:</label>
//       <input
//         type="text"
//         id="ndcCode"
//         value={ndcCode}
//         placeholder="Enter NDC Code"
//         onChange={(e) => setNdcCode(e.target.value)}
//       />

//       <label htmlFor="manufacturerId">Manufacturer ID:</label>
//       <input
//         type="text"
//         id="manufacturerId"
//         value={manufacturerId}
//         placeholder="Enter Manufacturer ID"
//         onChange={(e) => setManufacturerId(e.target.value)}
//       />

//       <label htmlFor="dealerId">Dealer ID:</label>
//       <select
//         id="dealerId"
//         value={dealerId}
//         onChange={(e) => setDealerId(e.target.value)}
//         disabled={loadingDealers}
//       >
//         <option value="">-- Select Dealer ID --</option>
//         {dealerList.map((id, index) => (
//           <option key={index} value={id}>
//             {id}
//           </option>
//         ))}
//       </select>

//       {generateQRData() && (
//         <div className="qr-code-container" style={{ marginTop: 20 }}>
//           <QRCodeCanvas id="qrCanvas" value={generateQRData()} size={qrSize} />
//         </div>
//       )}

//       <button
//         className="generate-button"
//         onClick={handleSaveQR}
//         disabled={saving || !generateQRData()}
//         style={{ marginTop: 20 }}
//       >
//         {saving ? "Saving..." : "Save QR Code"}
//       </button>

//       {message && <p style={{ marginTop: 10 }}>{message}</p>}
//     </div>
//   );
// }

// export default QRCodeGenerator;
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

function QRCodeGenerator() {
  const [ndcCode, setNdcCode] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [dealerId, setDealerId] = useState("");
  const [dealerList, setDealerList] = useState([]);
  const [loadingDealers, setLoadingDealers] = useState(true);
  const [qrSize] = useState(150);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get("http://localhost:8002/dealers");
        setDealerList(response.data);
      } catch (error) {
        console.error("Error fetching dealer list:", error);
        setDealerList([]);
      } finally {
        setLoadingDealers(false);
      }
    };

    fetchDealers();
  }, []);

  const generateQRData = () => {
    if (!ndcCode.trim() || !manufacturerId.trim() || !dealerId.trim()) return "";
    return `${ndcCode}|${manufacturerId}|${dealerId}`;
  };

  const handleSaveQR = async () => {
    const qrData = generateQRData();

    if (!qrData) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const canvas = document.getElementById("qrCanvas");
      const qrImageUrl = canvas.toDataURL("image/png");

      await axios.post("http://localhost:8002/qr/save-qr", {
        qrData,
        qrImageUrl,
        manufacturerId,
        dealerId
      });

      alert("QR Code saved successfully!");
    } catch (error) {
      console.error("Error saving QR code:", error);
      alert("Failed to save QR code.");
    }
  };

  return (
    <div className="qr-code-generator">
      <h2>QR Code Generator</h2>

      <label htmlFor="ndcCode">NDC Code:</label>
      <input
        type="text"
        id="ndcCode"
        value={ndcCode}
        placeholder="Enter NDC Code"
        onChange={(e) => setNdcCode(e.target.value)}
      />

      <label htmlFor="manufacturerId">Manufacturer ID:</label>
      <input
        type="text"
        id="manufacturerId"
        value={manufacturerId}
        placeholder="Enter Manufacturer ID"
        onChange={(e) => setManufacturerId(e.target.value)}
      />

      <label htmlFor="dealerId">Dealer ID:</label>
      <select
        id="dealerId"
        value={dealerId}
        onChange={(e) => setDealerId(e.target.value)}
        disabled={loadingDealers}
      >
        <option value="">-- Select Dealer ID --</option>
        {dealerList.map((id, index) => (
          <option key={index} value={id}>
            {id}
          </option>
        ))}
      </select>

      {ndcCode && manufacturerId && dealerId && (
        <div className="qr-code-container">
          <QRCodeCanvas
            id="qrCanvas"
            value={generateQRData()}
            size={qrSize}
          />
        </div>
      )}

      <button
        className="generate-button"
        onClick={handleSaveQR}
        disabled={!ndcCode.trim() || !manufacturerId.trim() || !dealerId.trim()}
      >
        Save QR Code
      </button>
    </div>
  );
}

export default QRCodeGenerator;
