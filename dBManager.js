const sqlite3 = require('sqlite3').verbose();
const dateFormat = require('dateformat');

function getDb() {
    return db = new sqlite3.Database('quiz.db', (error) => {
        if (error) 
            console.log(err.message)
    })
}

function getUserId(user, score, callback) {
    let db = getDb()
    var userId
    db.serialize(function() {
        let sql = `SELECT id FROM user WHERE name = ?`
        db.get(sql, [user], (error, row) => {
            if (error)
                return console.log(error.message)
            else {
                callback(row.id, score)
            } 
        })
    })
    db.close()
}

function insertScore(userId, score) {
    let db = getDb()
    db.serialize(function() {
        var now = dateFormat(new Date(), "dddd dS mmmm yyyy - H:MM:ss")
        var stmt = db.prepare("INSERT INTO scores (score, date, user_id) VALUES (?, ?, ?)")
        stmt.run(score, now, userId, function() {
            showLastScores(1)
        })
        stmt.finalize()
    })
    db.close()
}

exports.showLastScores = function exportLastScores(limit){ showLastScores(limit) }

function showLastScores(limit) {
    let db = getDb()
    let datas = []
    let sql = "SELECT s.score, s.date, u.name FROM scores s JOIN user u ON u.id = s.user_id ORDER BY s.date DESC LIMIT "+ limit
    db.each(sql, function(err, row) {
        let dataRow = row.name + ' ' + row.score + ' ' + row.date
        datas.push(dataRow)
        console.log(dataRow);
    })
    return datas
}

exports.showScores = function showScores(user) {
    let db = getDb()
    let datas = []
    let sql = "SELECT s.score, s.date, u.name FROM scores s JOIN user u ON u.id = s.user_id WHERE u.name = " + user + " ORDER BY s.date DESC"
    db.each(sql, function(err, row) {
        let dataRow = row.name + ' ' + row.score + ' ' + row.date
        datas.push(dataRow)
        console.log(dataRow);
    });
    return datas
}

function showUsers() {
    let db = getDb()
    db.each("SELECT id, name FROM user", function(err, row) {
        console.log(row.id, row.name);
    });
}

exports.insert = async function insert(user, score) {
    try {
        await getUserId(user, score, insertScore)
    }
    catch (e) {
        console.log(e.message)
    }
}

function addUser(username) {
    let db = getDb()
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO user (name, token) VALUES (?, ?)");
        stmt.run(username, null);
        stmt.finalize();
        console.log("Création de l'utilisateur " + username + "...")
        console.log("Bienvenue !")
    })
}

exports.checkUser = function checkUser(username) {
    let db = getDb()
    db.serialize(function() { 
        let sql = `SELECT * FROM user WHERE name = ?`
        db.get(sql, [username], (error, row) => {
            if (error)
                addUser(username)
            if (row) 
                console.log('Hello ', username)
            else 
                addUser(username)
        })
    })
}