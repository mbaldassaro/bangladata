from flask import Flask, session, url_for, request, redirect, render_template
#from flask_admin import Admin
from flask_script import Manager
from flask_bootstrap import Bootstrap
#from flask_babel import Babel, gettext, refresh

app = Flask(__name__)
bootstrap = Bootstrap(app)
manager = Manager(app)

@app.route('/')
def index():
    return render_template('base.html')


@app.route('/test')
def test():
    return render_template('test.html')

if __name__ == '__main__':
    manager.run()
