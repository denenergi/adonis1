import vine from "@vinejs/vine";

export const todoValidator = vine.compile(
    vine.object({
        name: vine.string(),
        descriptions: vine.string().optional(),
        file: vine.file({extnames:['jpg', 'png', 'jpeg']}).optional(),
        // file: vine.file({extnames:['jpg', 'png', 'jpeg']}).optional(),
        // filePath: vine.string().optional(),
    })
)