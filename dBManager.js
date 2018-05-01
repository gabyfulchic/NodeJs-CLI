var sqlite3 = require('sqlite3').verbose();

function getDb() {
    return db = new sqlite3.Database('quiz.db', (error) => {
        if (error) 
            console.log(err.message)
    })
}

function getUserId(user) {
    let db = getDb()
    var userId = null
    db.serialize(function() {
        db.get("SELECT * FROM user WHERE name = ?", [user], (error, row) => {
            if (error)
                return console.log(error.message)
            userId = row.id
        })
    })
    db.close()
    return userId
}

exports.insertScore = function insertScore(user, score) {
    let db = getDb()
    db.serialize(function() {
        var userId = getUserId(user)
        console.log(userId)
        var stmt = db.prepare("INSERT INTO scores (score, date, user_id) VALUES (?, ?, ?)")
        stmt.run(score, new Date(), userId)
        stmt.finalize()

        db.each("SELECT * FROM scores", function(err, row) {
            console.log(row.user_id, row.score, row.date);
        });
    })
    db.close()
}