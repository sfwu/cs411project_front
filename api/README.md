## General Set Up Description

For first time set up, run the following commend in the /api directory:

### pip install flask
### pip install -U python-dotenv
### python3 -m venv venv
### . venv/bin/activate
### pip install flask-cors

Note: some of them will be installed globally. The .flaskenv is created by songfeng to help you run the project, 
it needs support of python-dotenv which is installed in the second step.

Additionally, some dependencies are required as the following:

### pip install flask-sqlalchemy
### pip install Flask-Migrate
### pip install PyMySQL
### pip install numpy
### pip install pandas
### pip install pymysql
### pip install sklearn



## To run the backend everytime:

### “. venv/bin/activate”
###   Flask run

Note: ". venv/bin/activate ” sets up your environment file and virtual environment for dev. To get out of the virtual environment, run deactivate.
