const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

const mongoUrl = "mongodb://127.0.0.1:27017";
const dbName = "hse_site_db";

let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit", async (req, res) => {
  try {
    const formData = {
      name: req.body.name || "",
      email: req.body.email || "",
      message: req.body.message || "",
      createdAt: new Date()
    };

    await db.collection("messages").insertOne(formData);
    res.redirect("/messages");
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    res.status(500).send("Ошибка при сохранении данных");
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    let html = `
      <!doctype html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Полученные данные</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light">
        <div class="container py-5">
          <h1 class="mb-4">Полученные данные</h1>
          <a href="/" class="btn btn-primary mb-4">На главную</a>
    `;

    if (messages.length === 0) {
      html += `<div class="alert alert-warning">Пока нет отправленных данных.</div>`;
    } else {
      html += `<div class="row g-3">`;
      for (const item of messages) {
        html += `
          <div class="col-md-6">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text"><strong>Email:</strong> ${item.email}</p>
                <p class="card-text"><strong>Сообщение:</strong> ${item.message}</p>
                <p class="text-muted small mb-0">${new Date(item.createdAt).toLocaleString("ru-RU")}</p>
              </div>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    html += `
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).send("Ошибка при получении данных");
  }
});

MongoClient.connect(mongoUrl)
  .then((client) => {
    db = client.db(dbName);
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.error("Ошибка подключения к MongoDB:", error);
  });
