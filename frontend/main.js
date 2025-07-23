const toolbox = {
  kind: 'flyoutToolbox',
  contents: []
}

const workspace = Blockly.inject('blocklyDiv', { toolbox });

const projectsListElement = document.querySelector('#projects');

let projectList = [];

function updateProjectsList() {
  eel.list_projects()().then((projects) => {
    projectList = projects;

    projectsListElement.innerHTML = '';

    projects.forEach((project) => {
      const projectElement = document.createElement('li');
      projectElement.textContent = project;
      projectsListElement.append(projectElement);
    });
  });
}

const newProjectButton = document.querySelector('#newProjectButton');
const blackScreenElement = document.querySelector('#blackScreen');
const projectNameForm = document.querySelector('#projectNameForm');
const cancelProjectNameFormButton = document.querySelector('#cancelProjectNameFormButton');
const projectNameInput = document.querySelector('#projectNameInput');

function showProjectNamePrompt() {
  blackScreenElement.classList.remove('hidden');
  projectNameForm.classList.remove('hidden');
}

function hideProjectNamePrompt() {
  blackScreenElement.classList.add('hidden');
  projectNameForm.classList.add('hidden');
}

newProjectButton.addEventListener('click', () => {
  showProjectNamePrompt();
});

cancelProjectNameFormButton.addEventListener('click', () => {
  hideProjectNamePrompt();
});

projectNameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const projectName = projectNameInput.value.trim();

  if (!projectName) return;
  if (projectList.includes(projectName)) return;

  projectNameInput.value = '';

  eel.new_project(projectName);

  hideProjectNamePrompt();
});

setInterval(updateProjectsList, 500);