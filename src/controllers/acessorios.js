const database = require("../prisma/database");

async function getAcessorios(req, res) {
  const acessorios = await database.tipo_Acessorio.findMany({
    include: {
      acessorio: true,
      instrumento: true,
    },
  });

  return res.json({ acessorios });
}
async function createAcessorio(req, res) {
  const { nome, instrumento } = req.body;

  if (!nome || !instrumento) {
    return res.status(400).json({
      error: "Parâmetros nome e instrumento são obrigatórios",
    });
  }

  try {
    const instrumentoExist = await database.instrumento.findFirst({
      where: { nome: { equals: instrumento, mode: "insensitive" } },
    });

    if (!instrumentoExist) {
      return res.status(404).json({ error: "Instrumento não encontrado" });
    }

    const acessorioExist = await database.acessorio.findFirst({
      where: {
        nome: { equals: nome, mode: "insensitive" },
      },
    });

    let acessorio = null;

    if (!acessorioExist) {
      acessorio = await database.acessorio.create({
        data: {
          nome,
        },
      });
    } else {
      acessorio = acessorioExist;
    }

    const a = await database.tipo_Acessorio.create({
      data: {
        instrumento: {
          connect: {
            id: instrumentoExist.id,
          },
        },
        acessorio: {
          connect: {
            id: acessorio.id,
          },
        },
      },
      include: {
        acessorio: true,
        instrumento: true,
      },
    });

    return res.json({ acessorio: a });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function updateAcessorio(req, res) {
  const { nome } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Parâmetros id é obrigatório",
    });
  }

  if (!nome) {
    return res.status(400).json({
      error: "Parâmetros nome é obrigatório",
    });
  }

  try {
    const acessorio = await database.acessorio.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
      },
    });

    return res.json({ acessorio });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function deleteAcessorio(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Parâmetros id é obrigatório",
    });
  }

  try {
    await database.tipo_Acessorio.deleteMany({
      where: {
        acessorio_id: Number(id),
      },
    });

    await database.acessorio.delete({
      where: {
        id: Number(id),
      },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAcessorios,
  createAcessorio,
  updateAcessorio,
  deleteAcessorio,
};
