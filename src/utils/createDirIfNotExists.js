import fs from 'node:fs/promises';

// Утиліта, що перевіряє чи існує директорія за вказаним шляхом (url). Якщо директорія не існує, то функція створить її
export const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
