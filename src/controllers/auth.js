const db = require("../prisma/database");
const passwordUtils = require("../utils/password");
const jwtUtils = require("../utils/JWTToken");

async function login(req, res) {
  const DEFAULT_ERROR_MESSAGE = "Invalid email or password";
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await db.utilizador.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
  }

  const isPasswordValid = passwordUtils.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
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
    message: "Login successful",
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

async function register(req, res) {
  const DEFAULT_ERROR_MESSAGE = "An error occurred while creating the user";
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ message: "Email, name, and password are required" });
  }

  const user = await db.utilizador.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
  }

  const hashedPassword = passwordUtils.hashPassword(password);

  const newUser = await db.utilizador.create({
    data: {
      email: email,
      nome: name,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    message: "User created successfully",
    data: {
      id: Number(newUser.id),
      email: newUser.email,
      name: newUser.name,
    },
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.json({ message: "Logout successful" });
}

module.exports = {
  login,
  register,
  logout,
};
