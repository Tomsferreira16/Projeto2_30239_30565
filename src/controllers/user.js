const passwordUtils = require("../utils/password");
const db = require("../prisma/database");
const jwtUtils = require("../utils/JWTToken");

async function me(req, res) {
  return res.json({ loggedIn: true, data: req.user });
}

async function updateUser(req, res) {
  const { name, newpassword, oldpassword } = req.body;

  console.log(req.body);

  let user = null;

  if (name && !newpassword && !oldpassword) {
    // Update only the name

    user = await db.utilizador.update({
      where: { id: req.user.id },
      data: {
        nome: name,
      },
    });
  } else if (!name && newpassword && oldpassword) {
    // Update only the password
    const userOld = await db.utilizador.findUnique({
      where: { id: req.user.id },
    });

    if (!userOld) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = passwordUtils.comparePassword(
      oldpassword,
      userOld.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user = await db.utilizador.update({
      where: { id: req.user.id },
      data: {
        password: passwordUtils.hashPassword(newpassword),
      },
    });
  } else if (name && newpassword && oldpassword) {
    // Update both name and password
    const userOld = await db.utilizador.findUnique({
      where: { id: req.user.id },
    });

    if (!userOld) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = passwordUtils.comparePassword(
      oldpassword,
      userOld.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user = await db.utilizador.update({
      where: { id: req.user.id },
      data: {
        nome: name,
        password: passwordUtils.hashPassword(newpassword),
      },
    });
  } else {
    return res.status(400).json({
      message: "Name, password and confirmation password are required",
    });
  }

  const token = jwtUtils.generateToken({
    id: Number(user.id),
    name: user.nome,
    admin: user.admin_priv,
  });

  // Create a cookie with the token
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + jwtUtils.ttlMs),
  });

  return res.json({
    message: "User updated",
    data: {
      accessToken: token,
      user: {
        id: Number(user.id),
        name: user.nome,
        admin: user.admin_priv,
      },
    },
  });
}

module.exports = {
  me,
  updateUser,
};
