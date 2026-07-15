document.addEventListener('DOMContentLoaded', () => {
    generateQRCode();
    setupActions();
});

function generateQRCode() {
    const canvas = document.getElementById('qrCode');
    const websiteURL = 'https://gregory0699industries-creator.github.io/convex-tech-card';

    QRCode.toCanvas(canvas, websiteURL, {
        width: 140,
        margin: 0,
        color: {
            dark: '#e63946',
            light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
    }, function (error) {
        if (error) {
            console.error('QR Code generation failed:', error);
        }
    });
}

function setupActions() {
    document.getElementById('downloadBtn').addEventListener('click', () => {
        alert('To save this card:\n\n1. Take a screenshot of the card\n2. Or use Ctrl+P and save as PDF\n\nThe card is print-optimized!');
    });

    document.getElementById('shareBtn').addEventListener('click', async () => {
        const shareData = {
            title: 'Convex-Tech',
            text: 'Convex-Tech - We build apps, develop websites, and keep your digital presence updated.',
            url: 'https://gregory0699industries-creator.github.io/convex-tech-card'
        };

        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) {
                if (err.name !== 'AbortError') copyToClipboard(shareData.url);
            }
        } else {
            copyToClipboard(shareData.url);
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Card link copied to clipboard!');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        showToast('Card link copied to clipboard!');
    });
}

function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(230,57,70,0.95);color:#fff;padding:12px 24px;border-radius:8px;font-size:0.88rem;font-weight:500;box-shadow:0 8px 24px rgba(0,0,0,0.3);z-index:9999;opacity:0;transition:all 0.3s ease;';
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
}
