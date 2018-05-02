const sqlite3 = require('sqlite3').verbose();
const dateFormat = require('dateformat');
const fileManager = require('./fileManager.js')

function getDb() {
    return db = new sqlite3.Database('quiz.db', (error) => {
        if (error) 
            console.log(err.message)
    })
}

function getUserId(user, callbackParam, callback) {
    let db = getDb()
    var userId
    db.serialize(function() {
        let sql = `SELECT id FROM user WHERE name = ?`
        db.get(sql, [user], (error, row) => {
            if (error)
                return console.log(error.message)
            else {
                callback(row.id, callbackParam)
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

exports.showLastScores = function exportLastScores(limit, filename){ showLastScores(limit, filename) }

function showLastScores(limit, filename = false) {
    let db = getDb()
    let datas = ["Last scores"]
    let sql = "SELECT s.score, s.date, u.name FROM scores s JOIN user u ON u.id = s.user_id ORDER BY s.date DESC LIMIT "+ limit
    db.each(sql, function(err, row) {
        if (err)
            return console.log(err.message)
        let dataRow = row.name + ' ' + row.score + ' ' + row.date
        datas.push("\r\n" + dataRow)
        if (!filename) 
            console.log(dataRow);
    }, function() {
        if (filename) 
            fileManager.write(datas, filename)
    })
}

exports.exportScores = function (user, filename) {
    getUserId(user, filename, showScores)
}

function showScores(userId, filename = false) {  
    let db = getDb()
    let datas = ["User's score"]
    let sql = "SELECT s.score, s.date, u.name FROM scores s JOIN user u ON u.id = s.user_id WHERE s.user_id = " + userId + " ORDER BY s.date DESC"
    db.each(sql, function(err, row) {
        if (err)
            return console.log(err.message)
        let dataRow = row.name + ' ' + row.score + ' ' + row.date
        datas.push("\r\n" + dataRow)
        if (!filename) 
            console.log(row);
    }, function() {
        if (filename) 
            fileManager.write(datas, filename)
    })
}

exports.showUsers = function showUsers() {
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
                console.log('Hello', username)
            else 
                addUser(username)
        })
    })
}