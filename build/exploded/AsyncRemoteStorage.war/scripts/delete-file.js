const deleteButton = document.querySelector('#deleteButton');

deleteButton.addEventListener('click', () => {
  const selectedElement = document.querySelector('.selected');
  if (selectedElement) {
    if (selectedElement.classList.contains('file-icon')) {
      const filePath = selectedElement.getAttribute('href');
      deleteFile(filePath)
        .then(() => {
          // File deleted successfully
          selectedElement.parentNode.removeChild(selectedElement);
        })
        .catch(error => console.error(error));
    } else if (selectedElement.classList.contains('folder-icon')) {
      // Display message for trying to delete folders.
      console.error('Cannot delete folders.');
    }
  }
});

function deleteFile(filePath) {
  const deleteUrl = `http://localhost:8080/remotestorage/deleteFile?fileName=${encodeURIComponent(filePath)}`;
  return fetch(deleteUrl, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        // File deleted successfully
        // console.log('File deleted successfully.');
      } else {
        // Delete request failed
        // Note: This will be called if the file does not exist,
        // but this is a scenario that not longer possible due to the way the UI is implemented now.
        throw new Error('Delete request failed.');
      }
    });
}