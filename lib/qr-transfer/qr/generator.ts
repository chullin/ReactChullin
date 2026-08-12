import QRCode from 'qrcode';
import { QR_CONFIG } from '../config';

export async function createQrDataUrl(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: QR_CONFIG.errorCorrectionLevel,
    margin: 2,
    scale: 8,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });
}

