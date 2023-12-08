const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const savedCreds = {
  type: process.env.type,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
  refresh_token: process.env.refresh_token,
};

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

async function authorize() {
  return google.auth.fromJSON(savedCreds);
}

module.exports = { authorize };
