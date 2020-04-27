import os
import json
import datetime
from flask import Flask, jsonify , request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.exc import IntegrityError
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

# class Users():
#     """Model for user accounts"""
#     # We will need to add more things to represent the relationships

#     __tablename__ = 'Users'
#     # Password = db.Column(db.String(255), nullable=False)
#     NetID = db.Column(db.String(255), primary_key=True)
#     FirstName = db.Column(db.String(255), nullable=False)
#     LastName = db.Column(db.String(255), nullable=False)
#     Email = db.Column(db.String(255), nullable=False)

#     def __init__(self, FirstName, LastName, Email):
#         self.FirstName = FirstName
#         self.LastName = LastName
#         # self.Password = Password
#         self.Email = Email

#     def __repr__(self):
#         return "<Person_id {}>".format(self.NetID)


@app.route('/')
def my_index():
    return "hello"

# @app.route("/api/test_find_em/<id>", methods=['GET'])
# def test_find_em(id):

#     # print("enter find_user function")
#     # Info = request.get_json()
#     # print(Info)
#     # if not name:
#     #     return {"status": 400, "message": "Invalid body"}
#     # # person_id = Info.get("NetID")
#     # person_id = name
#     # if not person_id:
#     #     return {"status": 400, "message": "Missing field"}
#     # print(person_id)
#     # print(type(person_id))
#     # cur = mysql.connection.cursor()
#     # cur.execute("SELECT * FROM Users WHERE NetID = ""test1""")

#     # mysql.connection.commit()
#     # result = {"NetID": person_id}

#     result = db.session.execute(
#         "SELECT * FROM Users where NetID =:netid",
#         {"netid": id},
#     )
    
#     # print(result)

#     return jsonify({'result': [dict(row) for row in result]})











########### for user progile ############


# @app.route("/api/find_user", methods=['GET'])
# def find_user():
#     print("enter find_user function")
#     # cur = mysql.connection.cursor()
#     # cur.execute("SELECT * FROM Users WHERE NetID = ""test1""")

#     # mysql.connection.commit()
#     # result = {"NetID": person_id}
#     Info = request.get_json()
#     result = db.session.execute(
#         "SELECT * FROM Users where NetID = 'test2' "
#         # {"NetID": person_id},
#     )

#     # Infos = result.fetchone()
#     # result.close()

#     return jsonify({'result': [dict(row) for row in result]})

# @app.route("/api/get_all_users", methods=['GET'])
# def get_all_users():

#     result = db.session.execute(
#         "SELECT * FROM Users"
#         # {"NetID": person_id},
#     )
#     print("finish query!!!!!!!")

#     return jsonify({'result': [dict(row) for row in result]})






# -------------------------------HERE------------------------------------

# mes = {"Email": "aaaa", "FirstName": "wow", "LastName": "wasai", "NetID": 777}
# n = json.dumps(mes)

@app.route("/api/register", methods=['POST'])
def register():
    # cursor = db.cursor()
    # sql = "INSERT INTO Users (Email, FirstName, LastName, NetID, Password) VALUES (%s, %s, %s, %s, %s)"
    mess = request.get_json()
    # mess = json.loads(n)
    try:
        result = db.session.execute(
           "INSERT INTO Student (StudentId, Name, Major, Graduation, Email) VALUES (:studentId, :name, null, null, :email)",
           {"studentId": mess["NetID"], "name": mess["FirstName"] + " " + mess["LastName"], "email": mess["Email"]},
        )
        db.session.commit()
    
    except IntegrityError:
        return {"status": 409, "message": "Person already exists"} 
        
        
        # cursor.execute(sql, ('fake0', 'fake0', 'fake0', '125', 'fake0'))

    return {"status": 201, "message": "Register succeed"}

@app.route("/api/login", methods=['POST'])
def login():
    Info = request.get_json()
    if not Info:
        return {"status": 400, "message": "Invalid Info"}

    result = db.session.execute(
        "SELECT StudentId FROM Student WHERE StudentId=:netid",
        {"netid": Info["NetID"]},
        # {"netid": id}
    )
    person = result.fetchone()
    result.close()

    if person:
        return {"status": 200, "message": "Person found"}
    return {"status": 404, "message": "Person not found"}


@app.route("/api/profile/", methods=['POST', 'PUT'])
def profile():
    Info = request.get_json()

    if request.method == 'POST':

        result = db.session.execute(
        " SELECT * FROM Student NATURAL JOIN Profile WHERE StudentId=:netid",
        {"netid": Info["NetID"]},
        # {"netid":id}
        )
        profile1 = result.fetchone()
        print(profile1)

        p1 = dict(profile1.items())
        
        p1["FirstName"] = p1["Name"].split()[0]
        p1["LastName"] = p1["Name"].split()[1]
        del p1["Name"]
        
        
        # profile1 = result1.fetchone()
        # result1.close()

        # result = db.session.execute(
        # " SELECT * FROM Profile WHERE StudentId=:netid",
        # {"netid": Info["NetID"]},
        # # {"netid":id}
        # )

        # profile2 = result.fetchone()
        
        # # name = profile1[1]
        # # LastName = name.split()[1]
        # # FirstName = name.split()[0]
        
        # profile = dict(list(p1.items()) + list(profile2.items()))
        

        result.close()

        return {"status": 200, "message": "Profile found", "profile": p1}
        # return jsonify({'result': [dict(row) for row in result]})

    if request.method == 'PUT':

        fullname = Info["FirstName"] + " " +Info["LastName"]

        result1 = db.session.execute(
            " UPDATE Student SET Name =:name, Major =:major, Graduation=:graduation, Email=:email WHERE StudentId =:studentId",
            {"studentId": Info["NetID"], "name": fullname, "major": Info["Major"], "graduation": Info["Graduation"], "email": Info["Email"]}
            # {"NetID": person_id},
        )

        result2 = db.session.execute(
            " UPDATE Profile SET State =:state, City =:city, Address=:address WHERE StudentId =:studentId",
            {"studentId": Info["NetID"], "state": Info["State"], "city": Info["City"], "address": Info["Address"]}
            # {"NetID": person_id},
        )

        db.session.commit()

        return {"status": 204, "message": "Profile updated"}

@app.route("/api/find_employment", methods=['POST'])
def find_employment():
    Info = request.get_json()

    result = db.session.execute(
        "SELECT Position , StartDate, EndDate,OfficeName as CompanyName, OfficeCity as CompanyCity, State as CompanyState, Country as CompanyCountry, Address as CompanyAddress, Industry FROM (Employment as E JOIN Office as O on E.OfficeName = O.Name and E.OfficeCity = O.City) where StudentId =:netid",
        {"netid": Info["NetID"]},
        # {"netid": id},
    )
    # emp = result.fetchall()
    # result.close()
    
    all_history = result.fetchall()
    result.close()

    all_history = [dict(row) for row in all_history]
    print(all_history)
    his_list = {}
    his_dict = []
    i = 0
    for history in all_history:
        if history["StartDate"]:
            datetime = history["StartDate"]
            date2str=datetime.strftime("%Y-%m-%d")
            history["StartDate"] = date2str
        if history["EndDate"]:
            datetime = history["EndDate"]
            date2str=datetime.strftime("%Y-%m-%d")
            history["EndDate"] = date2str
        his_list["id"] = i
        his_list["value"] = history
        his_dict.append(his_list.copy())
        i = i+1

    return {"status": 200, "message": "employment found", "employment": his_dict}
    # return {"status": 400, "message": "Workouts not found","result": all_history}


@app.route("/api/employment", methods=['POST', 'PUT', 'DELETE'])
def employment():
    Info = request.get_json()

    if request.method == 'POST':
        if Info["StartDate"]:
            strdate1 = Info["StartDate"]
            date_time1 = datetime.datetime.strptime(strdate1,'%Y-%m-%d')
        else: date_time1 = None
        if Info["EndDate"]:
            strdate2 = Info["EndDate"]
            date_time2 = datetime.datetime.strptime(strdate2,'%Y-%m-%d')
        else: date_time2 = None

        try:
            result2 = db.session.execute(
               "INSERT INTO Office (Name, Industry, Address, City, Country, State) VALUES (:name, :industry, :address, :city, :country, :state)",
               {"name": Info["CompanyName"], "industry": Info["Industry"], "address": Info["CompanyAddress"],"city": Info["CompanyCity"], "country":Info["CompanyCountry"], "state":Info["CompanyState"]},
            )

        except IntegrityError:
            try:
                result1 = db.session.execute(
                   "INSERT INTO Employment (Position, StartDate, EndDate, StudentId, OfficeName, OfficeCity) VALUES (:position, :startdate, :enddate, :netid, :officename, :officecity)",
                   {"position": Info["Position"], "startdate": date_time1, "enddate": date_time2,"netid": Info["NetID"], "officename":Info["CompanyName"], "officecity":Info["CompanyCity"]},
                )
            except IntegrityError:
                return {"status": 409, "message": "History already exists"}

            db.session.commit()
            return {"status": 201, "message": "Insert succeed"}

        result1 = db.session.execute(
           "INSERT INTO Employment (Position, StartDate, EndDate, StudentId, OfficeName, OfficeCity) VALUES (:position, :startdate, :enddate, :netid, :officename, :officecity)",
           {"position": Info["Position"], "startdate": date_time1, "enddate": date_time2,"netid": Info["NetID"], "officename":Info["CompanyName"], "officecity":Info["CompanyCity"]},
        )

        db.session.commit()
         


        return {"status": 201, "message": "Insert succeed"}
        # return jsonify({'result': [dict(row) for row in result]})

    if request.method == 'PUT':

        if Info["StartDate"]:
            strdate1 = Info["StartDate"]
            date_time1 = datetime.datetime.strptime(strdate1,'%Y-%m-%d')
        else: date_time1 = None
        if Info["EndDate"]:
            strdate2 = Info["EndDate"]
            date_time2 = datetime.datetime.strptime(strdate2,'%Y-%m-%d')
        else: date_time2 = None

        result1 = db.session.execute(
            " UPDATE Employment SET Position =:position, StartDate =:startdate, EndDate=:enddate, OfficeName=:officename, OfficeCity=:officecity WHERE StudentId =:studentId",
            {"studentId": Info["NetID"], "position": Info["Position"], "startdate": date_time1, "enddate": date_time2, "officename": Info["CompanyName"], "officecity":Info["CompanyCity"]}
            # {"NetID": person_id},
        )

        result2 = db.session.execute(
            " UPDATE Office SET Industry =:industry, Address =:address, Country=:country, State=:state WHERE Name =:companyname and City =:companycity",
            {"industry": Info["Industry"], "address": Info["CompanyAddress"], "country": Info["CompanyCountry"], "state": Info["CompanyState"], "companyname" :Info["CompanyName"], "companycity": Info["CompanyCity"]}
            # {"NetID": person_id},
        )

        db.session.commit()

        return {"status": 204, "message": "Employment updated"}

    if request.method == 'DELETE':
        result = db.session.execute(
            "DELETE From Employment where StudentId =:netid and Position =:position and OfficeName =:officename and OfficeCity =:officecity",
            {"netid":Info["NetID"],"position":Info["Position"],"officename":Info["CompanyName"], "officecity": Info["CompanyCity"]},
        )
        db.session.commit()
        return {"status": 204, "message": "Employment deleted"}

@app.route("/api/find_enrollment", methods=['POST'])
def find_enrollment():
    Info = request.get_json()
    result = db.session.execute(
        "SELECT * From Enrollments Where StudentId =:netid",
        {"netid":Info["NetID"]}
        # {"netid":id},
    )
    enroll_list = result.fetchall()

    result.close()
    print(enroll_list)

    all_list = [dict(row) for row in enroll_list]

    enroll_list = {}
    enroll_dict = []
    i = 0
    for history in all_list:
        
        enroll_list["id"] = i
        enroll_list["value"] = history
        enroll_dict.append(enroll_list.copy())
        i = i+1

    return {"status": 200, "message": "employment found", "employment": enroll_dict}


# @app.route("/api/enrollment", methods=['POST', 'PUT', 'DELETE'])
# def enrollment():



########### for employment history ############



if __name__ == '__main__':
    app.run()