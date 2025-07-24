const toolbox = {
  kind: 'flyoutToolbox',
  contents: []
};

const workspace = Blockly.inject('blocklyDiv', { toolbox });

const projectsListElement = document.querySelector('#projects');
const projectNameElement = document.querySelector('#projectName');

let projectList = [];
let selectedProject = '';

function updateProjectList() {
  projectsListElement.innerHTML = '';

  projectList.forEach((project) => {
    const projectElement = document.createElement('li');

    projectElement.addEventListener('click', () => {
      projectList = projectList.map(({ name }) => {
        return {
          name, selected: name == project.name
        };
      });
      selectedProject = project.name;
      projectNameElement.textContent = project.name;

      updateProjectList();
    });
    
    if (project.selected) projectElement.className = 'selected';
    projectElement.textContent = project.name;
    projectsListElement.append(projectElement);
  });
}

function fetchProjectList() {
  eel.list_projects()().then((projects) => {
    if (JSON.stringify(projectList.map(({ name }) => name)) == JSON.stringify(projects)) return;

    projectList = projects.map((name) => {
      return {
        name, selected: false
      };
    });

    updateProjectList();
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

let allowedCharacters = 'abcdefghijklmnopqrstuvwxyz';
allowedCharacters += allowedCharacters.toUpperCase() + '_123467890';

projectNameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const projectName = projectNameInput.value.trim();

  if (!projectName) return;
  if (projectList.includes(projectName)) return;

  let allowed = true;

  for (let index = 0; index < projectName.length; index++) {
    const character = projectName[index];

    if (!allowedCharacters.includes(character)) {
      allowed = false;
      break;
    }
  }

  if (!allowed) return;

  projectNameInput.value = '';

  eel.new_project(projectName);

  hideProjectNamePrompt();
});

setInterval(fetchProjectList, 500);