const global = require('../public/javascripts/global')

module.exports = {
    statistics:function(con,fun){
        con.query("SELECT COUNT(CASE WHEN type=0 THEN id END) AS incomeCount, COUNT(CASE WHEN type=1 THEN id END) AS withdrawalCount, SUM(mount) AS generalTotal FROM transaction WHERE visible=1 AND userFK=?",[global.userId],fun)
    },
    getActualWeek:function(con,fun){
        con.query("SELECT folio, concept, mount, type FROM transaction WHERE visible=1 AND userFK=? AND WEEK(date)=WEEK(NOW()) ORDER BY id DESC",[global.userId],fun)
    }
}