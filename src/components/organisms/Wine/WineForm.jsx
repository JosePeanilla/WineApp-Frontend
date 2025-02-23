/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCloudinaryUpload } from "/src/hooks/useCloudinaryUpload"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { AuthContext } from "/src/context/AuthContext"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

export const WineForm = ({ wine = null, onSuccess, onCancel }) => {
  const logger = new Logger("WineForm")
  const { register, handleSubmit, formState, reset, setValue } = useForm({ defaultValues: wine || {} })
  const { uploadImage } = useCloudinaryUpload()
  const { upsertWine } = useUpsertWine()
  const { user } = useContext(AuthContext)
  const [regions, setRegions] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/regions`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(data.data || [])
      })
      .catch((error) => console.error("Error al obtener regiones:", error))
  }, [])

  useEffect(() => {
    if (wine) {
      Object.keys(wine).forEach((key) => {
        if (key === "region" && typeof wine[key] === "object") {
          setValue("region", wine[key].name)
        } else {
          setValue(key, wine[key]) 
        }
      })
    } else {
      reset()
    }
  }, [wine, setValue, reset])

  const onSubmit = async (data) => {
    try {
      if (!user || user.role !== "wineries") {
        throw new Error("Solo las bodegas pueden agregar vinos. Asegúrate de estar autenticado correctamente.")
      }
  
      const wineryId = user.id
  
      const selectedRegion = regions.find(region => region.name.toLowerCase() === data.region.toLowerCase())
      if (!selectedRegion) {
        throw new Error("La región ingresada no existe en la base de datos.")
      }
  
      let imageUrl = wine?.image || "" 
  
      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        const imageResult = await uploadImage(data.image[0])
        if (imageResult.error) throw imageResult.error
        imageUrl = imageResult.data.secure_url
      }
  
      const wineData = {
        ...data,
        region: selectedRegion._id,
        winery: wineryId,
        image: imageUrl, 
      }
  
      const wineId = wine?.id || wine?._id
      const result = await upsertWine(wineData, wineId)
      
      if (result.error) throw result.error
  
      alert(`Vino ${wineId ? "actualizado" : "agregado"} correctamente.`)
      reset()
      onSuccess()
    } catch (error) {
      console.error("Error al guardar el vino:", error)
      alert(`Error: ${error.message}`)
    }
  }
  

  const fields = [
    { name: "name", text: "Nombre del Vino", required: true },
    { name: "type", text: "Tipo de Vino", required: true },
    { name: "year", text: "Año", required: true, type: "number" },
    { name: "description", text: "Descripción", required: false },
    { name: "price", text: "Precio (€)", required: true, type: "number" },
    { name: "region", text: "Región", required: true, type: "text" },  
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
      {wine && <Button type="button" variant="ligero" onClick={onCancel}>Cancelar</Button>}
    </FormContainer>
  )
}
