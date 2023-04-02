const uploadButton = document.querySelector('#uploadButton');

uploadButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.click();

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }

    const uploadPath = prompt('Enter the path to upload the file (leave blank for root directory):', '');

    let formattedPath = '';
    if (uploadPath) {
      formattedPath = uploadPath.split('/').map(folder => `folder ${folder}`).join('/');
      formattedPath = `/${formattedPath}`;
    }

    const formData = new FormData();
    formData.append('file', file);
    const uploadUrl = `http://localhost:8080/remotestorage/uploadFile?path=${encodeURIComponent(formattedPath)}`;
    fetch(uploadUrl, { method: 'POST', body: formData })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully.');
          //return browseFolder(formattedPath);
          return browseFolder('');
        } else {
          throw new Error('File upload failed.');
        }
      })
      .then(() => {
        //
      })
      .catch(error => console.error('Error:', error));
  });
});