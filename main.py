import eel, os

projects_folder = 'projects'

if not os.path.exists(projects_folder):
  os.mkdir(projects_folder)

@eel.expose
def list_projects():
  return os.listdir(projects_folder)

@eel.expose
def new_project(project_name):
  os.mkdir(os.path.join(projects_folder, project_name))

eel.init('frontend')
eel.start('index.html')