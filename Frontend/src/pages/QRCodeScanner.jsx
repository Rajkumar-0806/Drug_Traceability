// src/components/QRCodeScanner.jsx
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = ({ onScanResult }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        onScanResult && onScanResult(decodedText);
        scanner.clear();
      },
      (error) => {
        console.warn("QR Scan Error", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear Error", err));
    };
  }, [onScanResult]);

  return (
    <div>
      <h3>Scan QR Code</h3>
      <div id="reader" style={{ width: "300px" }}></div>
    </div>
  );
};

export default QRCodeScanner;
