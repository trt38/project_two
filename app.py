import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
rds_connection_string = "user:password@localhost:5432/Project_2"
engine = create_engine(f'postgresql://{rds_connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
OUD_data = Base.classes.OUD_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/years"
    )


@app.route("/api/v1.0/years")
def year():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    
    results = session.query(OUD_data.YEAR, OUD_data.STATE, func.count(OUD_data.STATE)).\
        group_by(OUD_data.YEAR).group_by(OUD_data.STATE).all()

    session.close()
    
    all_years = {}
    state_dict = {}
    for year, state, count in results:
        all_years[year] = {}
        for years in year:
            state_dict[state] = count
            all_years[year].update(state_dict)


    return jsonify(all_years)





if __name__ == '__main__':
    app.run(debug=False)
