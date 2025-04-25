from flask import Flask, session, url_for, redirect, render_template
from flask_babel import Babel, refresh
from flask_bootstrap import Bootstrap

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a1'
app.config['BABEL_DEFAULT_LOCALE'] = 'bn'
bootstrap = Bootstrap(app)
babel = Babel(app)

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
            '2001 Elections - Winner': ['data/elections/2001/result_consolidated.json', 'js/2001/result_consolidated.js'],
            '2001 Elections - JP': ['data/elections/2001/jp.json', 'js/2001/jp.js'],
            '2001 Elections - BNP': ['data/elections/2001/bnp.json', 'js/2001/bnp.js'],
            '2001 Elections - AL': ['data/elections/2001/awami.json', 'js/2001/awami.js'],
            '2001 Elections - JIB': ['data/elections/2001/jib.json', 'js/2001/jib.js'],
            '2001 Elections - Other': ['data/elections/2001/other.json', 'js/2001/other.js'],
            '2001 Elections - Cancelled': ['data/elections/2001/cancelled.json', 'js/2001/cancelled.js'],
            '2001 Elections - Turnout': ['data/elections/2001/turnout.json', 'js/2001/turnout.js'],

            '2008 Elections - Winner': ['data/elections/2008/result_consolidated.json', 'js/2008/result_consolidated.js'],
            '2008 Elections - AL': ['data/elections/2008/awami.json', 'js/2008/awami.js'],
            '2008 Elections - BNP': ['data/elections/2008/bnp.json', 'js/2008/bnp.js'],
            '2008 Elections - JP': ['data/elections/2008/jp.json', 'js/2008/jp.js'],
            '2008 Elections - JIB': ['data/elections/2008/jib.json', 'js/2008/jib.js'],
            '2008 Elections - Other': ['data/elections/2008/other.json', 'js/2008/other.js'],
            '2008 Elections - Cancelled': ['data/elections/2008/cancelled.json', 'js/2008/cancelled.js'],
            '2008 Elections - Turnout': ['data/elections/2008/turnout.json', 'js/2008/turnout.js'],

            '2014 Elections - Winner': ['data/elections/2014/result_consolidated.json', 'js/2014/result_consolidated.js'],
            '2014 Elections - AL': ['data/elections/2014/awami.json', 'js/2014/awami.js'],
            '2014 Elections - JP': ['data/elections/2014/jp.json', 'js/2014/jp.js'],
            '2014 Elections - Other': ['data/elections/2014/other.json', 'js/2014/other.js'],
            '2014 Elections - Cancelled': ['data/elections/2014/cancelled.json', 'js/2014/cancelled.js'],
            '2014 Elections - Turnout': ['data/elections/2014/turnout.json', 'js/2014/turnout.js'],
        }, css_file='css/parlelections.css',
    )


if __name__ == '__main__':
    app.run()
