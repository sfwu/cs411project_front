import os
import json
from flask import Flask, jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
db = SQLAlchemy()
migrate = Migrate()



app = Flask(__name__)

# if 'RDS_HOSTNAME' in os.environ:
print("in os.environ")
DATABASE = {
'NAME': 'sys',
'USER': 'admin',
'PASSWORD': 'CS411project',
'HOST': 'jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com',
'PORT': '3306',
}
database_url = 'mysql+pymysql://%(USER)s:%(PASSWORD)s@%(HOST)s:%(PORT)s/%(NAME)s' % DATABASE
# else:
  # database_url = 'sqlite:///' + os.path.join(app.instance_path, 'task_list.sqlite')
print("database url is ", database_url)

app.config.from_mapping(
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev_key',
  SQLALCHEMY_DATABASE_URI = database_url,
  SQLALCHEMY_POOL_RECYCLE = 280,
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  )

db.init_app(app)
migrate.init_app(app, db)


# engine = create_engine('jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com')
# connection = engine.raw_connection()
# cursor = connection.cursor()

class Users():
    """Model for user accounts"""
    # We will need to add more things to represent the relationships

    __tablename__ = 'Users'
    # Password = db.Column(db.String(255), nullable=False)
    NetID = db.Column(db.String(255), primary_key=True)
    FirstName = db.Column(db.String(255), nullable=False)
    LastName = db.Column(db.String(255), nullable=False)
    Email = db.Column(db.String(255), nullable=False)

    def __init__(self, FirstName, LastName, Email):
        self.FirstName = FirstName
        self.LastName = LastName
        # self.Password = Password
        self.Email = Email

    def __repr__(self):
        return "<Person_id {}>".format(self.NetID)


@app.route('/')
def my_index():
    return "hello"

@app.route("/api/test_find_em/<id>", methods=['GET'])
def test_find_em(id):

    # print("enter find_user function")
    # Info = request.get_json()
    # print(Info)
    # if not name:
    #     return {"status": 400, "message": "Invalid body"}
    # # person_id = Info.get("NetID")
    # person_id = name
    # if not person_id:
    #     return {"status": 400, "message": "Missing field"}
    # print(person_id)
    # print(type(person_id))
    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM Users WHERE NetID = ""test1""")

    # mysql.connection.commit()
    # result = {"NetID": person_id}

    result = db.session.execute(
        "SELECT * FROM Users where NetID =:netid",
        {"netid": id},
    )
    
    # print(result)

    return jsonify({'result': [dict(row) for row in result]})











########### for user progile ############


@app.route("/api/find_user", methods=['GET'])
def find_user():
    print("enter find_user function")
    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM Users WHERE NetID = ""test1""")

    # mysql.connection.commit()
    # result = {"NetID": person_id}
    result = db.session.execute(
        "SELECT * FROM Users where NetID = 'test2' "
        # {"NetID": person_id},
    )

    # Infos = result.fetchone()
    # result.close()

    return jsonify({'result': [dict(row) for row in result]})

@app.route("/api/get_all_users", methods=['GET'])
def get_all_users():

    result = db.session.execute(
        "SELECT * FROM Users"
        # {"NetID": person_id},
    )
    print("finish query!!!!!!!")

    return jsonify({'result': [dict(row) for row in result]})






# -------------------------------HERE------------------------------------

# mes = {"Email": "aaaa", "FirstName": "wow", "LastName": "wasai", "NetID": 473}
# n = json.dumps(mes)

@app.route("/api/register", methods=['POST'])
def register():
    # cursor = db.cursor()
    # sql = "INSERT INTO Users (Email, FirstName, LastName, NetID, Password) VALUES (%s, %s, %s, %s, %s)"
    mess = request.get_json()
    # print(type(Info))
    # mess = json.loads(Info)
    # print(mess)

    db.session.execute(
       "INSERT INTO Users (Email, FirstName, LastName, NetID) VALUES (:email, :firstname, :lastname, :netid)",
       {"email": mess["Email"], "firstname": mess["FirstName"], "lastname": mess["LastName"], "netid": mess["NetID"]},
    )
    db.session.commit()
    
    # cursor.execute(sql, ('fake0', 'fake0', 'fake0', '125', 'fake0'))

    return {"message":"Register success!"}



@app.route("/api/update_user", methods=['GET'])
def update_user():

    result = db.session.execute(
        " UPDATE Users SET LastName = 'fake', email = 'hahahahafake@gmail.com' WHERE NetID = '125' "
        # {"NetID": person_id},
    )

    db.session.commit()

    return "user updated"



@app.route("/api/delete_user", methods=['GET'])
def delete_user():

    result = db.session.execute(
        "DELETE FROM  Users where NetID = '125' "
        # {"NetID": person_id},
    )

    db.session.commit()

    return "delete user succcess"




########### for employment history ############


@app.route("/api/find_employment", methods=['GET'])
def find_employment():

    result = db.session.execute(
        "SELECT * FROM Employment where NetID = '125' "
        # {"NetID": person_id},
    )

    return jsonify({'result': [dict(row) for row in result]})

# @app.route("/api/", methods=['GET'])
# def get_all_users():

#     result = db.session.execute(
#         "SELECT * FROM Users"
#         # {"NetID": person_id},
#     )
#     print("finish query!!!!!!!")

#     return jsonify({'result': [dict(row) for row in result]})


@app.route("/api/add_employment", methods=['GET'])
def add_employment():
    
    db.session.execute(
       "INSERT INTO Employment (Position, StartDate,EndDate, OfficeId) VALUES ('general manager', '', '', '125', '01')"
    )
    db.session.commit()

    return "add exployment success"



@app.route("/api/update_employment", methods=['GET'])
def update_employment():

    result = db.session.execute(
        " UPDATE Employment SET Position = 'noPosition', OfficeId = '999' WHERE NetID = '125' "
        # {"NetID": person_id},
    )

    db.session.commit()

    return "user updated"



@app.route("/api/delete_employment", methods=['GET'])
def delete_employment():

    result = db.session.execute(
        "DELETE FROM  Employment where NetID = '125', Position = 'general manager'"
        # {"NetID": person_id},
    )

    db.session.commit()

    return "delete exployment succcess"


if __name__ == '__main__':
    app.run()