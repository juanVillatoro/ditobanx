const { z } = require('zod');

const userCreateSchema = z.object({
    name: z.string({ required_error: "El nombre es requerido" }).min(3, "El nombre debe tener al menos 3 carácteres"),
    email: z.string({ required_error: "El email no es válido"}).email("El email no es válido"),
    password: z.string({ required_error: "La contraseña es requerida"}).min(3, "La contraseña debe tener al menos 3 carácteres"),
    balance: z.number({required_error: "El balance es requerido"}).min(0, "El balance no puede ser negativo")
})

module.exports = userCreateSchema;