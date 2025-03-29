/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

/************************************************** External Dependencies ***************************************************/
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCloudinaryUpload } from "/src/hooks/useCloudinaryUpload"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { AuthContext } from "/src/context/AuthContext"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"
import { america, europa } from "/src/utils/countries"
import { grapeVarieties } from "/src/utils/grapeVarieties"
import { notify } from "/src/utils/notifications"

/************************************************** WineForm Component ***************************************************/
export const WineForm = ({ wine = null, onSuccess, onCancel }) => {
  const logger = new Logger("WineForm")
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({ defaultValues: wine || {} })
  const { uploadImage } = useCloudinaryUpload()
  const { upsertWine } = useUpsertWine()
  const { user } = useContext(AuthContext)
  const [regions, setRegions] = useState([])
  const [regionCountryMap, setRegionCountryMap] = useState({}) 
  const [isManualCountrySelection, setIsManualCountrySelection] = useState(false)

  /*************************************** Fetch Regions from Server ***************************************/
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/regions`)
      .then((res) => res.json())
      .then((data) => {
        const regionsData = data.data || []
        setRegions(regionsData)

        const countryMap = {}
        regionsData.forEach(region => {
          countryMap[region._id] = region.country || "" 
        })
        setRegionCountryMap(countryMap)
      })
      .catch((error) => console.error("Error al obtener regiones:", error))
  }, [])

  /*************************************** Reset form values when the wine changes ***************************************/
  useEffect(() => {
    if (wine) {
      Object.keys(wine).forEach((key) => {
        if (key === "region" && typeof wine[key] === "object") {
          setValue("region", wine[key]._id || "") 
          setValue("country", wine[key].country || "")
        } else {
          setValue(key, wine[key] || "")
        }
      })
    } else {
      reset()
    }
  }, [wine, setValue, reset])

  /*************************************** Handle country change when region is selected manually ***************************************/
  const selectedRegion = watch("region")
  useEffect(() => {
    if (selectedRegion && regionCountryMap[selectedRegion] && !isManualCountrySelection) {
      setValue("country", regionCountryMap[selectedRegion]) 
    }
  }, [selectedRegion, setValue, regionCountryMap, isManualCountrySelection])

  /*************************************** Handle when country is changed manually ***************************************/
  const handleCountryChange = () => {
    setIsManualCountrySelection(true) 
  }

  /*************************************** Form submission handler ***************************************/
  const onSubmit = async (data) => {
    try {
      // Check if user is authenticated and has winery role
      if (!user || user.role !== "wineries") {
        throw new Error("Solo las bodegas pueden agregar vinos. Asegúrate de estar autenticado correctamente.")
      }

      const wineryId = user.id

      // Get the selected region data
      const selectedRegionData = regions.find(region => region._id === data.region)
      if (!selectedRegionData) {
        throw new Error("La región ingresada no existe en la base de datos.")
      }

      let imageUrl = wine?.image || ""

      // Handle image upload if a new image is provided
      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        const imageResult = await uploadImage(data.image[0])
        if (imageResult.error) throw imageResult.error
        imageUrl = imageResult.data.secure_url
      }

      const wineData = {
        ...data,
        region: selectedRegionData._id,
        winery: wineryId,
        image: imageUrl, 
      }

      // Check if the wine already exists and update or insert it
      const wineId = wine?.id || wine?._id
      const result = await upsertWine(wineData, wineId)
      
      if (result.error) throw result.error

      notify.success(`Vino ${wineId ? "actualizado" : "agregado"} correctamente.`)
      reset()
      onSuccess()
    } catch (error) {
      console.error("Error al guardar el vino:", error)
      notify.error(`Error: ${error.message}`)
    }
  }

  /*************************************** Render the wine form UI ***************************************/
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Wine Name */}
      <RegisterField
        name="name"
        text="Nombre del Vino"
        type="text"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Wine Type */}
      <RegisterField
        name="type"
        text="Tipo de Vino"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={[
          { value: "Tinto", label: "Tinto" },
          { value: "Rosado", label: "Rosado" },
          { value: "Blanco", label: "Blanco" },
          { value: "Espumoso", label: "Espumoso" }
        ]}
      />

      {/* Grape Type */}
      <RegisterField
        name="grapeType"
        text="Tipo de Uva"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={grapeVarieties.map(grape => ({ value: grape, label: grape }))}
      />

      {/* Year */}
      <RegisterField
        name="year"
        text="Año"
        type="number"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Description */}
      <RegisterField
        name="description"
        text="Descripción"
        type="textarea"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Additional Description */}
      <RegisterField
        name="additionalDescription"
        text="Descripción Adicional"
        type="textarea"
        required={false} // Not mandatory
        register={register}
        formState={formState}
      />

      {/* Price */}
      <RegisterField
        name="price"
        text="Precio (€)"
        type="number"
        required={true}
        register={register}
        formState={formState}
      />

      {/* Region */}
      <RegisterField
        name="region"
        text="Región"
        type="select"
        required={true}
        register={register}
        formState={formState}
        options={regions.map(region => ({ value: region._id, label: region.name }))}
      />

      {/* Country */}
      <RegisterField
        name="country"
        text="País"
        type="select"
        required={true}
        register={register}
        formState={formState}
        onChange={handleCountryChange}
      />

      {/* Image */}
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
