const { User, userValidate, loginValidate} = require("../models/components/user");
const bcrypt = require("bcrypt");




exports.userAuth = async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("You dont have an account!");
        } else {
            const isSuccess = await bcrypt.compare(req.body.password, user.password);
            if (!isSuccess) {
                return res.status(
                    403).send("Email or password is wrong!");
            } else {
                const token = user.createAuthToken();
                res.header("x-auth-token", token).send(token);
            }
        }
    }
}

exports.userList = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}
exports.userAdd = async (req, res) => {
    const { error } = userValidate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(401).send("Sen onsuzda varsan!!!");
    }

    if (req.body.role === "admin") {
        const adminCheck = await User.findOne({ role: "admin" });
        if (adminCheck) {
            return res.status(403).send("Admin is Allah!!!");
        }
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    user = new User(req.body);
    user.password = hashPassword;

    const token = user.createAuthToken();
    const result = await user.save();
    res.status(201).header("x-auth-token", token).send(result);
};


exports.userEdit = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role,
        active: req.body.active
    })
    res.status(200).send(user);
}

exports.userDelete = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
}