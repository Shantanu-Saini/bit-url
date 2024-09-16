import { useState } from 'react';
import axios from 'axios';

const UrlShortner = () => {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const hideToast = () => {
        setTimeout(() => {
            setToastMsg('');
        }, 3000);
    };

    const handleShortenUrl = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resp = await axios.post('http://localhost:3000/urlshort', { url });
            console.log(resp.data);
            setShortenedUrl(resp.data.shortUrl);
            setToastMsg('Bit URL generated successfully!');
            setCopied(false);
            hideToast();
        } catch (error) {
            console.log("Error in url shortener home");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedUrl);
        setCopied(true);
        setToastMsg('Bit URL Copied Successfully!');
        hideToast();
    };

    return (
        <div className="min-h-screen min-w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-between space-y-4">
                <h1 className="text-3xl">Bit URL</h1>

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
                        <form onSubmit={handleShortenUrl}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Enter your URL</span>
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
                                Shorten URL
                            </button>
                        </form>

                        {shortenedUrl && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between space-x-4">
                                    <span className="text-sm">{shortenedUrl}</span>
                                    <button
                                        className="btn btn-outline btn-success"
                                        onClick={handleCopy}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlShortner;
