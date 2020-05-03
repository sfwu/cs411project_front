import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import pymysql
from sklearn.cluster import KMeans
from sklearn.linear_model import LogisticRegression

def similar_students(studentId, nclust):
    # Create database connection (hardcoded)
    db_connection_str = 'mysql+pymysql://admin:CS411project@jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com/sys'
    db_connection = create_engine(db_connection_str)

    # Set up dataframe columns (all positions, companies, and courses, plus StudentId)
    all_enrollments = pd.read_sql('SELECT * FROM Enrollments', con=db_connection)
    all_enrollments.StudentId = all_enrollments.StudentId.astype(int)
    all_employment = pd.read_sql('SELECT StudentId, Position, OfficeName FROM Employment', con=db_connection)
    all_employment.StudentId = all_employment.StudentId.astype(int)
    all_students = pd.read_sql('SELECT StudentId, Name, Major, Graduation FROM Student', con=db_connection)
    all_students.StudentId = all_students.StudentId.astype(int)

    all_enrollments['CourseCode'] = all_enrollments.Department + ' ' + all_enrollments.CourseNum

    colnames = np.concatenate([["StudentId"], all_students.Major.unique(), all_students.Graduation.unique(), all_employment.Position.unique(), all_employment.OfficeName.unique(), all_enrollments['CourseCode'].unique()])
    df = pd.DataFrame(columns=colnames)

    # Fill in matrix (1 = student has attribute, 0 = student does not)
    for index, row in all_students.iterrows():
        newrow = dict.fromkeys(colnames, 0)
        sid = int(row.StudentId)
        courses = all_enrollments[all_enrollments.StudentId == sid].CourseCode
        positions = all_employment[all_employment.StudentId == sid].Position
        companies = all_employment[all_employment.StudentId == sid].OfficeName

        newrow['StudentId'] = row.StudentId
        newrow[row.Major] = 1
        newrow[row.Graduation] = 1

        for c in courses:
            newrow[c] = 1
        for p in positions:
            newrow[p] = 1
        for c in companies:
            newrow[c] = 1
        df = df.append(newrow, ignore_index=True)

    # Fit kmeans clustering
    kmeans = KMeans(n_clusters=nclust).fit(df)

    # Identify other students with the same cluster assignment
    all_students["clust"] = kmeans.labels_
    clust = all_students[all_students.StudentId == sid]["clust"].values[0]
    sid_clust = all_students[all_students["clust"] == clust].StudentId.values

    # return will be a list of StudentId (ints) (i.e [473, 374])
    return list(sid_clust[sid_clust != studentId])

def courses_for_position(position, ncourses):
    # Create database connection (hardcoded)
    db_connection_str = 'mysql+pymysql://admin:CS411project@jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com/sys'
    db_connection = create_engine(db_connection_str)

    # Set up dataframe columns (all courses, plus 'response'))
    all_enrollments = pd.read_sql('SELECT * FROM Enrollments', con=db_connection)
    all_enrollments.StudentId = all_enrollments.StudentId.astype(int)
    all_employment = pd.read_sql('SELECT StudentId, Position FROM Employment', con=db_connection)
    all_employment.StudentId = all_employment.StudentId.astype(int)
    all_enrollments['CourseCode'] = all_enrollments.Department + ' ' + all_enrollments.CourseNum

    all_employment["response"] = (all_employment.Position.str.lower() == position.lower()).astype(int)

    # if position is not in our db, return empty list
    if len(list(all_employment["response"].unique())) < 2:
        return []

    colnames = np.concatenate([["response"], all_enrollments['CourseCode'].unique()])
    df = pd.DataFrame(columns=colnames)

    # Fill in matrix (1 = student has taken class, 0 = student has not)
    for index, row in all_employment.iterrows():
        newrow = dict.fromkeys(colnames, 0)
        sid = int(row.StudentId)
        courses = all_enrollments[all_enrollments.StudentId == sid].CourseCode

        newrow['response'] = row['response']
        for c in courses:
            newrow[c] = 1

        df = df.append(newrow, ignore_index=True)

    # fit logreg model (input = courses, output = position T/F)
    logreg = LogisticRegression()
    model = logreg.fit((df.loc[:, df.columns != 'response']).astype(int), df['response'].astype(int))

    # select the top ncourses courses that contribute to positive position response
    coef = pd.concat([pd.Series((df.loc[:, df.columns != 'response']).columns), pd.Series(model.coef_[0])], axis=1)
    coef.columns = ["course", "coef"]
    topcoef = coef.nlargest(n = ncourses, columns=["coef"])

    # return will be a list of length 'ncourses' of strings (i.e. ['CS 242', 'CS 361', 'CS 241', 'CS  225', 'CS 357'] for ncourses = 5)
    return list(topcoef["course"])

def courses_for_industry(industry, ncourses):
    # Create database connection (hardcoded)
    db_connection_str = 'mysql+pymysql://admin:CS411project@jobplacement.chbtuwrsaec5.us-east-1.rds.amazonaws.com/sys'
    db_connection = create_engine(db_connection_str)

    # Set up dataframe columns (all courses, plus 'response'))
    all_enrollments = pd.read_sql('SELECT * FROM Enrollments', con=db_connection)
    all_enrollments.StudentId = all_enrollments.StudentId.astype(int)
    all_enrollments['CourseCode'] = all_enrollments.Department + ' ' + all_enrollments.CourseNum
    all_employment = pd.read_sql('SELECT StudentId, Industry FROM Employment e JOIN Office o ON e.OfficeCity = o.City AND e.OfficeName = o.Name;', con=db_connection)
    all_employment.StudentId = all_employment.StudentId.astype(int)

    all_employment["response"] = (all_employment.Industry.str.lower() == industry.lower()).astype(int)

    # if industry is not in our db, return empty list
    if len(list(all_employment["response"].unique())) < 2:
        return []

    colnames = np.concatenate([["response"], all_enrollments['CourseCode'].unique()])
    df = pd.DataFrame(columns=colnames)

    # Fill in matrix (1 = student has taken class, 0 = student has not)
    for index, row in all_employment.iterrows():
        newrow = dict.fromkeys(colnames, 0)
        sid = int(row.StudentId)
        courses = all_enrollments[all_enrollments.StudentId == sid].CourseCode

        newrow['response'] = row['response']
        for c in courses:
            newrow[c] = 1

        df = df.append(newrow, ignore_index=True)

    # fit logreg model (input = courses, output = position T/F)
    logreg = LogisticRegression()
    model = logreg.fit((df.loc[:, df.columns != 'response']).astype(int), df['response'].astype(int))

    # select the top ncourses courses that contribute to positive position response
    coef = pd.concat([pd.Series((df.loc[:, df.columns != 'response']).columns), pd.Series(model.coef_[0])], axis=1)
    coef.columns = ["course", "coef"]
    topcoef = coef.nlargest(n = ncourses, columns=["coef"])

    # return will be a list of length 'ncourses' of strings (i.e. ['CS 242', 'CS 361', 'CS 241', 'CS  225', 'CS 357'] for ncourses = 5)
    return list(topcoef["course"])
