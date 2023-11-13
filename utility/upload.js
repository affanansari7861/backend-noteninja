const Fs = require("fs");

const { google } = require("googleapis");
const { authorize } = require("./driveAuth");

async function uploadToDrive(pdf) {
  const drive = await google.drive({ version: "v3", auth: await authorize() });
  //! UPLOAD FILE
  const { data } = await drive.files.create({
    requestBody: {
      name: pdf.name,
      mimeType: pdf.mimetype,
    },
    media: {
      mimeType: pdf.mimetype,
      body: Fs.createReadStream(pdf.tempFilePath),
    },
  });
  await drive.permissions.create({
    fileId: data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const result = await drive.files.get({
    fileId: data.id,
    fields: "webViewLink,webContentLink",
  });
  return { ...result.data, fileId: data.id };
}

module.exports = { uploadToDrive };
