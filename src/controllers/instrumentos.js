const db = require("../prisma/database");

async function getInstrumentos(req, res) {
  const instrumentos = await db.instrumento.findMany({
    include: {
      tipo_instrumento: true,
    },
  });
  return res.json({ instrumentos });
}

async function getInstrumentoById(req, res) {
  const { id } = req.params;
  const instrumento = await db.instrumento.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      tipo_instrumento: true,
    },
  });
  return res.json({ instrumento });
}

async function createInstrumento(req, res) {
  const { nome, tipo_instrumento } = req.body;

  if (!nome || !tipo_instrumento) {
    return res
      .status(400)
      .json({ error: "Nome e tipo_instrumento_id são obrigatórios" });
  }

  const tipoInstrumento = await db.tipo_Instrumento.findMany({
    where: {
      nome: {
        equals: tipo_instrumento,
        mode: "insensitive",
      },
    },
  });

  let tipoInstId = null;
  if (tipoInstrumento.length === 0) {
    const newTipoInst = await db.tipo_Instrumento.create({
      data: {
        nome: tipo_instrumento,
      },
    });
    tipoInstId = newTipoInst.instrumento_id;
  } else {
    tipoInstId = tipoInstrumento[0].instrumento_id;
  }

  const instrumento = await db.instrumento.create({
    data: {
      nome,
      tipo_instrumento: {
        connect: {
          instrumento_id: tipoInstId,
        },
      },
    },
    include: {
      tipo_instrumento: true,
    },
  });

  return res.json({ instrumento });
}

async function updateInstrumento(req, res) {
  const { nome, tipo_instrumento } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID é obrigatório" });
  }

  if (!nome || !tipo_instrumento) {
    return res
      .status(400)
      .json({ error: "Nome e tipo_instrumento_id são obrigatórios" });
  }

  const tipoInstrumento = await db.tipo_Instrumento.findMany({
    where: {
      nome: {
        equals: tipo_instrumento,
        mode: "insensitive",
      },
    },
  });

  let tipoInstId = null;
  if (tipoInstrumento.length === 0) {
    const newTipoInst = await db.tipo_Instrumento.create({
      data: {
        nome: tipo_instrumento,
      },
    });
    tipoInstId = newTipoInst.instrumento_id;
  } else {
    tipoInstId = tipoInstrumento[0].instrumento_id;
  }

  const instrumento = await db.instrumento.update({
    where: {
      id: Number(id),
    },
    data: {
      nome,
      tipo_instrumento: {
        connect: {
          instrumento_id: tipoInstId,
        },
      },
    },
    include: {
      tipo_instrumento: true,
    },
  });

  return res.json({ instrumento });
}

async function deleteInstrumento(req, res) {
  const { id } = req.params;
  await db.instrumento.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json({ message: "Instrumento apagado com sucesso" });
}

module.exports = {
  getInstrumentos,
  getInstrumentoById,
  createInstrumento,
  updateInstrumento,
  deleteInstrumento,
};
