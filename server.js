const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors"); // Важно добавить пакет CORS

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "or56",
});

app.use(express.json());
app.use(cors()); // Используйте CORS, чтобы разрешить запросы с другого источника

app.post("/api/form_quest_users", (req, res) => {
  const { lastname, firstname, middlename, email, selectedItem } = req.body;

  if (!firstname || !lastname || !email || !selectedItem) {
    res.status(400).json({ error: "Заполните все обязательные поля" });
  } else {
    const query = "INSERT INTO form_quest_users (firstname, middlename, lastname, email, selectedItem) VALUES (?, ?, ?, ?, ?)";
    const values = [firstname, middlename, lastname, email, selectedItem];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Ошибка выполнения запроса к базе данных:", err);
        res.status(500).json({ error: "Произошла ошибка при сохранении данных" });
      } else {
        res.status(201).json({ message: "Данные успешно сохранены" });
      }
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("Сервер запущен на порту " + port);
});





