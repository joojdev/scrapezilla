const toolbox = {
  kind: 'flyoutToolbox',
  contents: []
}

const workspace = Blockly.inject('blocklyDiv', { toolbox });

const projectsListElement = document.querySelector('#projects');

function updateProjectsList() {
  eel.list_projects()().then((projects) => {
    projectsListElement.innerHTML = '';

    projects.forEach((project) => {
      const projectElement = document.createElement('li');
      projectElement.textContent = project;
      projectsListElement.append(projectElement);
    });
  })
}

setInterval(updateProjectsList, 1000);