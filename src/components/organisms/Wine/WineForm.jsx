/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { useCloudinaryUpload } from "/src/hooks/useCloudinaryUpload"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { AuthContext } from "/src/context/AuthContext"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

export const WineForm = ({ wine = null, onSuccess }) => {
  const logger = new Logger("WineForm")
  const { register, handleSubmit, formState, reset } = useForm({ defaultValues: wine || {} })
  const { uploadImage } = useCloudinaryUpload()
  const { upsertWine } = useUpsertWine()
  const { user } = useContext(AuthContext) 

  const onSubmit = async (data) => {
    try {
      if (!user || user.role !== "wineries") {
        throw new Error("Solo las bodegas pueden agregar vinos. Asegúrate de estar autenticado correctamente.")
      }

      const wineryId = user.id
      console.log("Winery ID enviado al backend:", wineryId)

      const regionId = user.regionId || null
      if (!regionId) throw new Error("No se encontró la región asociada al usuario. Por favor, selecciona una región.")

      console.log("Region ID enviado al backend:", regionId)

      if (data.image[0]) {
        const imageResult = await uploadImage(data.image[0])
        if (imageResult.error) throw imageResult.error
        data.image = imageResult.data.secure_url
      } else {
        data.image = wine?.image || ""
      }

      const wineData = {
        ...data,
        region: regionId, 
        winery: wineryId,
      }

      const result = await upsertWine(wineData, wine?.id)
      if (result.error) throw result.error

      logger.info("Vino guardado correctamente.")
      alert("Vino guardado correctamente.")
      reset()
      onSuccess()
    } catch (error) {
      logger.error("Error al guardar el vino:", error)
      alert(`Error: ${error.message}`)
    }
  }

  const fields = [
    { name: "name", text: "Nombre del Vino", required: true },
    { name: "type", text: "Tipo de Vino", required: true },
    { name: "year", text: "Año", required: true, type: "number" },
    { name: "description", text: "Descripción", required: false },
    { name: "price", text: "Precio (€)", required: true, type: "number" },
    { name: "region", text: "Región", required: true, type: "select" }, // 🔹 Se mantiene como select si el usuario puede elegir
    { name: "country", text: "País", required: true, type: "select" },
  ]

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map((field) => (
        <RegisterField
          key={field.name}
          register={register}
          formState={formState}
          {...field}
        />
      ))}

      <div>
        <label htmlFor="image">Imagen del vino:</label>
        <input type="file" {...register("image")} />
      </div>

      <Button type="submit" variant="moderado">
        {wine ? "Actualizar Vino" : "Agregar Vino"}
      </Button>
    </FormContainer>
  )
}
