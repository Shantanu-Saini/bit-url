import React, { useState, useRef } from 'react';
import axios from 'axios';

const QRGenerator = () => {
    const [url, setUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const hideToast = () => {
        setTimeout(() => {
            setToastMsg('');
        }, 3000);
    };

    const handleGenerateQR = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/generate-qr', { url });
            setQrCode(response.data.qrCode);

            // Draw the image on canvas for downloading
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            const img = new Image();
            img.src = response.data.qrCode;
            img.onload = () => {
                if (canvas && ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            };

            setToastMsg('QR Code generated successfully!');
            hideToast();
        } catch (error) {
            console.error('Error generating QR code', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrCode);
        setCopied(true);
        setToastMsg('QR Code URL copied successfully!');
        hideToast();
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qr-code.jpg';
            link.href = canvas.toDataURL('image/jpeg');
            link.click();
        }
    };

    return (
        <div className="min-h-screen min-w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-between space-y-4">
                <h1 className="text-3xl">QR Code Generator</h1>

                {/* Toast Message */}
                {toastMsg && (
                    <div className="toast toast-top toast-end z-50">
                        <div className="alert alert-info">
                            <span>{toastMsg}</span>
                        </div>
                    </div>
                )}

                <div className="card glass w-96">
                    <div className="card-body">
                        <form onSubmit={handleGenerateQR}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Enter URL to generate QR Code</span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <button className="btn btn-primary w-full mt-4" type="submit">
                                Generate QR Code
                            </button>
                        </form>

                        {qrCode && (
                            <div className="mt-4">
                                <h3>QR Code:</h3>
                                <img src={qrCode} alt="Generated QR Code" className="w-full" />

                                <div className="flex items-center justify-between space-x-4 mt-4">
                                    <button
                                        className="btn btn-outline btn-success"
                                        onClick={handleCopy}
                                    >
                                        {copied ? 'Copied!' : 'Copy URL'}
                                    </button>
                                    <button
                                        className="btn btn-outline btn-primary"
                                        onClick={handleDownload}
                                    >
                                        Download QR Code
                                    </button>
                                </div>

                                {/* Hidden canvas for downloading QR Code */}
                                <canvas ref={canvasRef} width="300" height="300" style={{ display: 'none' }}></canvas>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRGenerator;
