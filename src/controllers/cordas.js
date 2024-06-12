const database = require("../prisma/database");

async function getCordas(req, res) {
  try {
    const cordas = await database.instrumento_Corda.findMany({
      include: {
        corda: true,
        instrumento: true,
      },
    });

    res.json({ cordas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCorda(req, res) {
  const { nota, instrumento, numero } = req.body;

  if (!nota || !instrumento || !numero) {
    return res.status(400).json({
      error: "Parâmetros nota, instrumento e numero são obrigatórios",
    });
  }

  try {
    const instrumentoExist = await database.instrumento.findFirst({
      where: { nome: { equals: instrumento, mode: "insensitive" } },
    });

    if (!instrumentoExist) {
      return res.status(404).json({ error: "Instrumento não encontrado" });
    }

    const cordaExist = await database.corda.findFirst({
      where: {
        AND: [
          { nota: { equals: nota, mode: "insensitive" } },
          { numero: { equals: Number(numero) } },
        ],
      },
    });

    let corda = null;

    if (!cordaExist) {
      corda = await database.corda.create({
        data: {
          nota,
          numero: Number(numero),
        },
      });
    } else {
      corda = cordaExist;
    }

    const a = await database.instrumento_Corda.create({
      data: {
        instrumento: {
          connect: { id: instrumentoExist.id },
        },
        corda: {
          connect: { id: corda.id },
        },
      },
      include: {
        corda: true,
        instrumento: true,
      },
    });

    res.json(a);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCorda(req, res) {
  const { id } = req.params;
  const { nota, numero } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Parâmetro id é obrigatório" });
  }

  if (!nota || !numero) {
    return res.status(400).json({
      error: "Parâmetros nota e numero são obrigatórios",
    });
  }

  try {
    const corda = await database.corda.update({
      where: { id: parseInt(id) },
      data: {
        nota,
        numero: Number(numero),
      },
    });

    res.json({ corda });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCorda(req, res) {
  const { id } = req.params;

  try {
    await database.instrumento_Corda.deleteMany({
      where: { corda_id: parseInt(id) },
    });

    await database.corda.delete({
      where: { id: parseInt(id) },
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCordas,
  createCorda,
  updateCorda,
  deleteCorda,
};
