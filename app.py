from flask import Flask, session, url_for, redirect, render_template
from flask_babel import Babel, refresh
from flask_bootstrap import Bootstrap
from flask_script import Manager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a1'
app.config['BABEL_DEFAULT_LOCALE'] = 'bn'
bootstrap = Bootstrap(app)
manager = Manager(app)
babel = Babel(app)


@babel.localeselector
def get_locale():
    return 'bn'


@app.route('/')
def index():
    return render_template('parlelections.html')


@app.route('/<lang>')
def language(lang):
    session['language'] = lang
    refresh()
    return redirect(url_for('parlelections'))


@app.route('/rohingya')
def rohingya():
    return render_template('rohingya.html')


@app.route('/parlelections')
def parlelections():
    return render_template('parlelections.html')


@app.route('/violence')
def violence():
    return render_template('violence.html')


@app.route('/coverage')
def coverage():
    return render_template('coverage.html')


@app.route('/myanmar')
def myanmar():
    return render_template('myanmar.html')


@app.route('/carto')
def carto():
    return render_template('carto.html')


@app.route('/basic')
def basic():
    return render_template(
        'layout.html', scripts={
            '2008 Elections - Winner': ['data/elections/result_consolidated_2008.json', 'js/result_consolidated_2008.js'],
            '2014 Elections - Winner': ['data/elections/result_consolidated_2014.json', 'js/result_consolidated_2014.js']
        }, css_file='css/parlelections.css',
    )


if __name__ == '__main__':
    manager.run()
