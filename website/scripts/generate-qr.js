import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the local network IP address (e.g. 192.168.x.x)
function getLocalNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      // Look for IPv4 and non-internal (i.e. not 127.0.0.1)
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '192.168.1.38';
}

const networkIp = getLocalNetworkIp();
const targetUrl = process.env.VITE_MENU_URL || 'https://patisserie-22.vercel.app/menu';
const outputDir = path.resolve(__dirname, '../public/qr');
const outputPath = path.join(outputDir, 'menu-qr.png');

async function generateQrCode() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await QRCode.toFile(outputPath, targetUrl, {
      width: 1024,
      margin: 2,
      color: {
        dark: '#3A2B56', // Lavender deep brand color
        light: '#FAF7F2', // Soft cream background
      },
      errorCorrectionLevel: 'H',
    });

    console.log(`✅ QR Code generated successfully!`);
    console.log(`📍 Target URL: ${targetUrl}`);
    console.log(`💾 Saved to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Failed to generate QR Code:', error);
    process.exit(1);
  }
}

generateQrCode();
