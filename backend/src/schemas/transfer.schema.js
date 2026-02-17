const { z } = require('zod');

const transferCreateSchema = z.object({
    fromUserId: z.string({required_error: "El id del usuario de origen es requerido"}),
    toUserId: z.string({ required_error: "El id del usuario de destino es requerido"}),
    amount: z.number({required_error: "El monto es requerido"}).min(0, "El monto debe ser mayor a 0"),
    idempotencyKey: z.string({required_error: "La clave de idempotencia es requerida y debe ser un UUID válido"})
})


module.exports = transferCreateSchema;