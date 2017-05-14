var Sequelize = require('sequelize')
    , sequelize = new Sequelize('sequelizetest', 'root', '', {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306, // or 5432 (for postgres)
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

sequelize
    .sync({force: true})
    .then(function (err) {
        console.log('It worked!');

        var user = User.build({
            username: 'john-doe',
            password: 'thisisthepassword'
        })

        user.save().then(function () {
            console.log('John doe saved');
        })

        User
            .find({where: {username: 'john-doe'}})
            .then(function (err, johnDoe) {
                if (!johnDoe) {
                    console.log('No user with the username "john-doe" has been found.');
                } else {
                    console.log('Hello ' + johnDoe.username + '!');
                    console.log('All attributes of john:', johnDoe.get());
                }
            });
    }, function (err) {
        console.log('An error occurred while creating the table:', err);
    });

