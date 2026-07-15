// ===== Convex-Tech Business Card Script =====

// QR Code Generation
document.addEventListener('DOMContentLoaded', () => {
    generateQRCode();
    setupActions();
});

function generateQRCode() {
    const canvas = document.getElementById('qrCode');
    const websiteURL = 'https://www.convex-tech.co.za';

    // Generate QR code using qrcode library
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
            // Fallback: show a placeholder
            const ctx = canvas.getContext('2d');
            canvas.width = 140;
            canvas.height = 140;
            ctx.fillStyle = '#f5f3ff';
            ctx.fillRect(0, 0, 140, 140);
            ctx.fillStyle = '#6b7280';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('QR Code', 70, 70);
            ctx.fillText('(Requires Internet)', 70, 88);
        }
    });
}

function setupActions() {
    // Download button - saves card as image
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', () => {
        // Alert user about screenshot approach
        alert('To save this card:\n\n1. Take a screenshot of the card\n2. Or use your browser\'s Print function (Ctrl+P) and save as PDF\n\nTip: The card is print-optimized!');
    });

    // Share button - uses Web Share API if available
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Convex-Tech',
            text: 'Convex-Tech - We build apps, develop websites, and keep your digital presence updated. Check us out!',
            url: 'https://www.convex-tech.co.za'
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or share failed
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareData.url);
                }
            }
        } else {
            copyToClipboard(shareData.url);
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Website link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Website link copied to clipboard!');
    });
}

function showToast(message) {
    // Create a simple toast notification
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(230, 57, 70, 0.95);
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.88rem;
        font-weight: 500;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
