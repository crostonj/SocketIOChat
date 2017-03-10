//var schema = require('../Data/User');

module.exports = loginService =
    function() {
        return {
            LoginInUser: LoginInUser = function(id) {
                // var user = schema.findByUsername(id, function(err, user) {
                // user.changeName("Brian");
                // console.log("Brian is: ", user);
                // user.set("age", 6);
                // console.log("Brian is now: ", user); //Brian has an age, because set is not sanitized
                // user.save(function(err, user) {
                //     console.log("Brian after save: ", user); //Note the age has now gone as it wasn't in the schema
                //  });
                //});
                //return user;
            },
            RegisterUser: RegisterUser = function(data) {
                var newuser = new User();
                newuser.set("id", '1');
                newuser.set("username", data.username);
                newuser.set("fullname", data.fullname);
                newuser.set("password", data.password);
                return { newuser }
            }
        }
    }