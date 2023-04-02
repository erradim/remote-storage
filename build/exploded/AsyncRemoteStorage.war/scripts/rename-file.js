const renameButton = document.querySelector('#renameButton');

renameButton.addEventListener('click', async () => {
  const selectedElement = document.querySelector('.selected');
  if (selectedElement) {
    if (selectedElement.classList.contains('file-icon')) {
      const oldFilePath = selectedElement.getAttribute('href');
      const oldFileName = oldFilePath.split('/').pop();
      const newFileName = prompt('Enter new file name:', selectedElement.textContent);
      if (newFileName) {
        const newFilePath = oldFilePath.replace(oldFileName, newFileName);
        const renameUrl = `http://localhost:8080/remotestorage/renameFile?oldFileName=${encodeURIComponent(oldFilePath)}&newFileName=${encodeURIComponent(newFilePath)}`;
        try {
          const response = await fetch(renameUrl, { method: 'PUT' });
          if (response.ok) {
            selectedElement.setAttribute('href', newFilePath);
            selectedElement.textContent = newFileName;
          } else {
            console.error('Rename request failed.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } else if (selectedElement.classList.contains('folder-icon')) {
      const oldFolderName = selectedElement.textContent.split(' ')[1];
      const newFolderName = prompt('Enter new folder name:', oldFolderName);
      if (newFolderName) {
        const newFolderPath = `folder ${newFolderName}`;
        const renameUrl = `http://localhost:8080/remotestorage/renameFile?oldFileName=${encodeURIComponent(selectedElement.getAttribute('href'))}&newFileName=${encodeURIComponent(newFolderPath)}`;
        try {
          const response = await fetch(renameUrl, { method: 'PUT' });
          if (response.ok) {
            selectedElement.textContent = `Folder ${newFolderName}`;
          } else {
            console.error('Rename request failed.');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }
});