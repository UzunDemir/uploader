import React, { useState } from "react";

export default function KnowledgeBaseUploader() {
  const [urls, setUrls] = useState("");
  const [files, setFiles] = useState([]);

  // Обработка URL (много URL по строкам)
  const handleUrlsChange = (e) => {
    setUrls(e.target.value);
  };

  // Обработка одиночных файлов и папки (multiple + webkitdirectory)
  const handleFilesChange = (e) => {
    const fileList = e.target.files;
    const arr = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // фильтруем по расширениям
      if (["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)
          || file.name.endsWith(".pdf") || file.name.endsWith(".txt") || file.name.endsWith(".docx")) {
        arr.push(file);
      }
    }
    setFiles(arr);
  };

  // Отправка данных (например, на сервер)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Пример: вывод в консоль
    console.log("URLs:", urls.split("\n").filter(u => u.trim()));
    console.log("Файлы:", files);
    alert("Данные готовы для загрузки. Реализуйте отправку на сервер.");
  };

  return (
    <div style={{maxWidth: 600, margin: "auto", padding: 20}}>
      <h2>Загрузка данных для базы знаний</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Введите список URL (каждый с новой строки):
          <textarea
            rows={5}
            value={urls}
            onChange={handleUrlsChange}
            placeholder="https://example.com/file1.pdf&#10;https://example.com/file2.txt"
            style={{width: "100%", marginTop: 6, marginBottom: 12}}
          />
        </label>

        <hr />

        <label>
          Загрузите файлы PDF, TXT, DOCX (поодиночке или несколько):
          <input
            type="file"
            multiple
            accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFilesChange}
            style={{display: "block", marginTop: 6, marginBottom: 12}}
          />
        </label>

        <label>
          Или загрузите папку с файлами (если браузер поддерживает):
          <input
            type="file"
            multiple
            webkitdirectory="true"
            directory=""
            accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFilesChange}
            style={{display: "block", marginTop: 6, marginBottom: 12}}
          />
        </label>

        <button type="submit" style={{padding: "8px 16px", fontSize: 16}}>Загрузить</button>
      </form>

      <div style={{marginTop: 20}}>
        <h3>Выбранные файлы:</h3>
        <ul>
          {files.map((f, i) => (
            <li key={i}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
