import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';

const inputDir = './source/img/sprite/'; // Директория с исходными SVG-файлами
const outputDir = './source/img/sprite/'; // Директория для оптимизированных SVG-файлов

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении директории:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file) === '.svg') {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Ошибка при чтении файла:', err);
          return;
        }

        const result = optimize(data, {
          path: inputPath,
          multipass: true,
        });

        if (result.error) {
          console.error('Ошибка при оптимизации файла:', result.error);
          return;
        }

        fs.writeFile(outputPath, result.data, err => {
          if (err) {
            console.error('Ошибка при записи файла:', err);
            return;
          }

          console.log(`Файл ${file} успешно оптимизирован и сохранен в ${outputDir}`);
        });
      });
    }
  });
});
