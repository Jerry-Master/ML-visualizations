from flask import Flask, render_template, url_for, send_from_directory, jsonify, request
from flask_bootstrap import Bootstrap

import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, './NN_computation')
from neural import generate_json, write_json

app = Flask(__name__)
bootstrap = Bootstrap(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@app.route('/compute_json/', methods=['GET', 'POST'])
def compute_json():
    # Get parameters
    data = request.get_json()
    filename = data['filename']
    arch = data['arch']
    maxEpoch = data['maxEpoch']
    tol = data['tol']

    # Return all the necessary data
    result = generate_json(filename, arch, maxEpoch, tol)
    # write_json(result, "debug.json")
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)