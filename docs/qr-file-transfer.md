# Pure Frontend QR File Transfer

This tool is an offline optical file transfer utility. It is not an AirDrop replacement and it is not designed for high-bandwidth transfers.

## What It Does

The Sender browser reads a local file, calculates SHA-256, splits the binary data into chunks, encodes each chunk, and plays those chunks as a QR Code stream. The Receiver browser scans the QR stream with the camera, stores chunks in IndexedDB, resumes by Transfer ID, rebuilds the file, verifies SHA-256, and then offers Download or Share.

No backend, database server, WebSocket, WebRTC, cloud storage, or file upload service is used.

## Best Use Cases

- Air-gapped environment
- Offline laboratory
- Isolated network
- No shared Wi-Fi
- No Bluetooth
- USB restricted environment
- Small configuration files
- Scripts
- Logs
- Documents

## Limits

QR Code bandwidth is very limited. Large files can transfer, but they may take a long time. The default settings prioritize reliability:

- Chunk size: 700 bytes
- Sender speed: 3 QR/s
- Metadata interval: every 50 data frames
- QR error correction: L

Recommended sizes:

- Under 100 KB: excellent
- 100 KB to 500 KB: fast
- 500 KB to 2 MB: acceptable
- 2 MB to 10 MB: slow
- Over 10 MB: very slow

## Resume Model

Receiver chunks are written to IndexedDB using a compound key:

```ts
[transferId, index]
```

This lets the Receiver ignore duplicates, accept out-of-order chunks, and continue later after camera pause, browser reload, or tab close.

The Sender can export a small `.qrtransfer.json` file. This file does not contain the original file contents. It only stores session metadata such as Transfer ID, file size, SHA-256, chunk size, and total chunks. Loading it with the same original file rebuilds the same QR stream so a phone can continue an earlier transfer.

## Integrity

The Sender calculates SHA-256 using Web Crypto. The Receiver recalculates SHA-256 after rebuilding the Blob. The file is offered for download only after verification succeeds.

