function browseFolder(folderPath = '') {
  const icons = document.querySelectorAll('.folder-icon, .file-icon');
  icons.forEach(icon => icon.remove());

  //const folderPath = '';
  const url = `http://localhost:8080/remotestorage/browseFolder?folderPath=${folderPath}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const items = data.trim().split('\n');
      for (const item of items) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('icon');
        const newAnchor = document.createElement('a');
        if (item.startsWith('.')) {
          // hidden file
          continue;
        } else if (item.startsWith('folder')) {
          // folder
          newAnchor.classList.add('folder-icon');
          newAnchor.href = folderPath + item + '/';
          newAnchor.onclick = function() { const elements = document.querySelectorAll('.file-icon, .folder-icon');elements.forEach(element => {element.classList.remove('selected');});newAnchor.classList.add('selected');return false; };
          newAnchor.innerHTML = item.replace('folder ','');
        } else {
          // file
          newAnchor.classList.add('file-icon');
          newAnchor.href = folderPath + item;
          newAnchor.onclick = function() { const elements = document.querySelectorAll('.file-icon, .folder-icon');elements.forEach(element => {element.classList.remove('selected');});newAnchor.classList.add('selected');return false; };
          newAnchor.innerHTML = item;
        }
        newDiv.appendChild(newAnchor);
        document.body.appendChild(newDiv);
      }
    })
    .catch(error => console.error(error));
}