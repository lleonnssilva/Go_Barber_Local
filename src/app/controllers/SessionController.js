const { User } = require("../models");
class SessionController {
  async create(req, res) {
    return res.render("auth/signIn");
  }
  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      return res.redirect("/");
    });
  }

  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash("error", "Usuário não encontrado");
      return res.redirect("/");
    }
    if (!(await user.checkPassword(password))) {
      req.flash("error", "Senha não confere");
      return res.redirect("/");
    }
    req.session.user = user;

    return res.redirect("/app/dashboard");
  }
}
module.exports = new SessionController();
