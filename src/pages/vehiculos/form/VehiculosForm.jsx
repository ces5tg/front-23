import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from ".././../components/Layout";
import {
  getAllVehiculos,
  createVehiculo,
  getVehiculo,
  updateVehiculo,
} from ".././../api/vehiculo.api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
export function VehiculosForm() {
  /* const [fotoConductor, setFotoConductor] = useState(null);

  const handleFotoConductorChange = (e) => {
    const file = e.target.files[0];
    setFotoConductor(file);
  }; */
  const params = useParams();
  useEffect(() => {
    async function loadVehiculos() {
      // funcion a la que cargamos los vehiculos - peticion API
      /* const res = await getAllVehiculos();
      console.log(res); */
      if (params.id) {
        const vehiculos = await getVehiculo(params.id);
        setValue("placa", vehiculos.data.placa);
        setValue("kilometraje", vehiculos.data.kilometraje);
        setValue("marca", vehiculos.data.marca);
        setValue("modelo", vehiculos.data.modelo);
      }
    }
    loadVehiculos(); // llamamos a la funcion
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm(); //handleSubmit => metodo de useForm  , handleSubmit => permite controlar los datos enviados , formState => estado del formulario  => propiedad "errors"
  const onSubmit = handleSubmit(async (data) => {
    //console.log(data); // muestra los datos del FORMULARIO

    if (params.id) {
      await updateVehiculo(params.id, data);
      toast.success("Se Actulizo correctamente", {
        position: "bottom-right",
        style: {
          background: "gray",
          color: "#fff",
        },
      });
    } else {
      await createVehiculo(data);
      setValue("placa", "");
      setValue("kilometraje", "");
      setValue("marca", "");
      setValue("modelo", "");
      toast.success("Se Guardo correctamente", {
        position: "bottom-right",
        style: {
          background: "green",
          color: "#fff",
        },
      });
    }
  });
  //a la hora de enviar el formulario solo toma los valores de "register"

  return (
    <>
      <Layout>
        <main>
          <div className="container-fluid p-4">
            <div className="card mb-4 ">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h1>Vehiculos</h1>
                <div>
                  <Link className="btn btn-success" to={`/vehiculos/`}>
                    Lista de Vehiculos
                  </Link>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p className="mb-0">Vehiculos</p>
                <form onSubmit={onSubmit}>
                  {/* PLACA */}
                  <div className="mb-3">
                    <label htmlFor="placa" className="form-label">
                      Placa del vehículo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("placa", { required: true })}
                    />
                    {errors.placa && <span>este es un campo requerido</span>}
                    {/* si existe un error se vera la etiqueta span */}
                  </div>
                  {/* KILOMETRAJE */}
                  <div className="mb-3">
                    <label htmlFor="kilometraje" className="form-label">
                      Kilometraje
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      {...register("kilometraje", { required: true })}
                    />
                    {errors.placa && <span>este es un campo requerido</span>}
                    {/* si existe un error se vera la etiqueta span */}
                  </div>
                  {/* MARCA  */}
                  <div className="mb-3">
                    <label htmlFor="marca" className="form-label">
                      Marca del vehículo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("marca", { required: true })}
                    />
                    {errors.placa && <span>este es un campo requerido</span>}
                    {/* si existe un error se vera la etiqueta span */}
                  </div>
                  {/* MODELO */}
                  <div className="mb-3">
                    <label htmlFor="modelo" className="form-label">
                      Modelo del vehiculo
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("modelo", { required: true })}
                    />
                    {errors.placa && <span>este es un campo requerido</span>}
                    {/* si existe un error se vera la etiqueta span */}
                  </div>
                  {/* IMAGEN - OPCIONAL ========================================*/}
                  {/* <div className="mb-3">
                    <label htmlFor="fotoConductor" className="form-label">
                      Foto del conductor
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="fotoConductor"
                      accept="image/*"
                      onChange={handleFotoConductorChange}
                    />
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </form>
                {/* {fotoConductor && (
                  <div className="mt-4">
                    <h5>Foto del conductor cargada:</h5>
                    <img
                      src={URL.createObjectURL(fotoConductor)}
                      alt="Foto del conductor"
                      className="img-fluid"
                    />
                  </div>
                )} */}
              </div>
            </div>
            <div className="text-center">
              <Link to="/documentos" className="btn btn-primary">
                Siguiente
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
