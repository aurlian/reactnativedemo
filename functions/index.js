const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const gcconfig = {
  projectId: "serdig-1538262587074",
  keyFilename: "serdig.json"
};
const { Storage } = require("@google-cloud/storage");
const UUID = require("uuid-v4");

admin.initializeApp({
  credential: admin.credential.cert(require("./serdig.json"))
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      return response.status(401).json({ error: "not authorized" });
    }

    let idToken = request.headers.authorization.split(" ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decoded => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          "/tmp/uploaded-image.jpg",
          body.image,
          "base64",
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
        const gcs = new Storage(gcconfig);
        const bucket = gcs.bucket("serdig-1538262587074.appspot.com");
        const uuid = UUID();
        bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        return response.status(401).json({ error: "not authorized" });
      });
  });
});
