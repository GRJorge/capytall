const global = require('../public/javascripts/global')

module.exports = {
    get:function(con,fun){
        con.query('SELECT CONCAT(DAY(date),"/",MONTH(date),"/",YEAR(date)) AS date, folio, concept, category.name AS category, type, mount FROM transaction INNER JOIN category WHERE categoryFK=category.id AND transaction.userFK=? AND transaction.visible=1 ORDER BY date',[global.userId],fun)
    }
}