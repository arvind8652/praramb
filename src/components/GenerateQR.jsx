import React, { useState } from "react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrCodeImage, setQRCodeImage] = useState("");

  const generateQRCode = () => {
    const qr = require("qrcode-generator");
    const qrCode = qr(0, "H");
    qrCode.addData(text);
    qrCode.make();

    const qrCodeDataUrl = qrCode.createDataURL(10, 0);
    setQRCodeImage(qrCodeDataUrl);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text for QR Code"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeImage && (
        <div style={{ marginTop: "20px" }}>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
