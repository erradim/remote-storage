// Here it shall be determined whether the user has clicked on a file or a folder.
// If it is a file, then the file shall be downloaded by calling the downloadFile function.
// If it is a folder, then the folder shall be browsed by calling the browseFolder function.

const clickButton = document.querySelector('#clickButton');

clickButton.addEventListener('click', async () => {
  const selectedElement = document.querySelector('.selected');
  if (selectedElement) {
    if (selectedElement.classList.contains('file-icon')) {
      const filePath = selectedElement.getAttribute('href');
      try {
        await downloadFile(filePath);
        console.log('File downloaded successfully');
      } catch (error) {
        console.error(error);
      }
    } else if (selectedElement.classList.contains('folder-icon')) {
      const folderPath = selectedElement.getAttribute('href');
      try {
        await browseFolder(folderPath);
        console.log('Folder browsed successfully');
      } catch (error) {
        console.error(error);
      }
    } else {
      const folderPath = selectedElement.getAttribute('href');
      try {
        await browseFolder(folderPath);
        console.log('Folder browsed successfully');
      } catch (error) {
        console.error(error);
      }
    }
  }
});