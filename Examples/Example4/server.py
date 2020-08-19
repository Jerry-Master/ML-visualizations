from flask import Flask, render_template, url_for, send_from_directory
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@app.route('/something/', methods=['GET', 'POST'])
def do_something():
    print("doing something")
    return "fine"


if __name__ == '__main__':
    app.run(debug=True)