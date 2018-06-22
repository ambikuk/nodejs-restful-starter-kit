
import fs from 'fs';
import db from '../../models';
import test from 'ava';

export default class BaseTest {

    clean() {
        test.after.always('guaranteed cleanup', async t => {
            db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
            .then(function(result){
                fs
                .readdirSync(__dirname + "/../../models/")
                .filter(file => {
                  return (file.indexOf(".") !== 0) && (file !== "index.js");
                })
                .forEach(file => {
                    const data = file.charAt(0).toUpperCase() + file.slice(1).replace('.js', '');
                    db['User'].destroy({
                        truncate: true
                    });
                    db['Task'].destroy({
                        truncate: true
                    });
                });
            }).then(() => {
               return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
            }).catch(err => {
               console.log(err);
            });
        });
    }

    prepare() {
        test.before(async t => {
            const user = {
                email : "buhoridermawan@gmail.com",
                password_hash: "$2a$10$5TvZDvIbAseRqmHFGnSsveG8Kh793T2L1WXg.9ZQM.nDou8X/5XC2",
                created_at: "2017-11-14 05:07:14",
                updated_at: "2017-11-14 05:07:14",
                last_login: "2017-11-14 05:07:14"
            }
            const userRow = await db.User.create(user);

            const task = {
                title : "Title",
                created_at: "2017-11-14 05:07:14",
                updated_at: "2017-11-14 05:07:14",
                user_id: userRow.id
            }
            await db.Task.create(task);
        });
    }
}