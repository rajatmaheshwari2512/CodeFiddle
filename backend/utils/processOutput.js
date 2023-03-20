function processOutput(stream, ws) {
  let nextDataType = null;
  let nextDataLength = null;
  let buffer = Buffer.from("");

  function processData(data) {
    if (data) {
      buffer = Buffer.concat([buffer, data]);
    }
    if (!nextDataType) {
      if (buffer.length >= 8) {
        const header = bufferSlice(8);
        nextDataType = header.readUInt8(0);
        nextDataLength = header.readUInt32BE(4);
        // It's possible we got a "data" that contains multiple messages
        // Process the next one
        processData();
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlice(nextDataLength);
        ws.send(content);
        nextDataType = null;
        // It's possible we got a "data" that contains multiple messages
        // Process the next one
        processData();
      }
    }
  }

  function bufferSlice(end) {
    const out = buffer.slice(0, end);
    buffer = Buffer.from(buffer.slice(end, buffer.length));
    return out;
  }

  stream.on("data", processData);
}

module.exports = processOutput;
