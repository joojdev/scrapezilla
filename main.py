import eel, os
allowed_characters = 'abcdefghijklmnopqrstuvwxyz'
allowed_characters += allowed_characters.upper() + '_1234567890'

projects_folder = 'projects'

if not os.path.exists(projects_folder):
  os.mkdir(projects_folder)

@eel.expose
def list_projects():
  return sorted(os.listdir(projects_folder))

@eel.expose
def new_project(project_name):
  project_list = os.listdir(projects_folder)

  if project_name in project_list: return

  allowed = True
  for character in project_name:
    if character not in allowed_characters:
      allowed = False
      break

  if not allowed: return

  os.mkdir(os.path.join(projects_folder, project_name))

eel.init('frontend')
eel.start('index.html')