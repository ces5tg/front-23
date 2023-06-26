import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Layout } from "../.././components/Layout";

import {
  getAllDocumentos,
  createDocumento,
  getDocumento,
  updateDocumento,
} from "../.././api/documento.api";
import { getAllVehiculos } from "../.././api/vehiculo.api";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";

export function DocumentosForm() {
  /* const [documento, setDocumento] = useState(null); 
    const handleDocumentoChange = (e) => {
      setDocumento(e.target.files[0]);
    }; */

  const params = useParams(); //creamos el objeto  , este se encarga de los parametros enviados
  const [vehiculos, setVehiculos] = useState([]);
  useEffect(() => {
    async function loadDocumentos() {
      if (params.id) {
        const documento = await getDocumento(params.id);
        setValue("nombre", documento.data.nombre);
        setValue("fecha_vencimiento", documento.data.fecha_vencimiento);
        setValue("vehiculo", documento.data.vehiculo);
      }
    }
    async function loadVehiculos() {
      // funcion a la que cargamos los vehiculos - peticion API
      const resVehiculos = await getAllVehiculos();
      console.log(resVehiculos);
      setVehiculos(resVehiculos.data);
    }
    loadDocumentos();
    loadVehiculos();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,getValues
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data);
      await updateDocumento(params.id, data);
      toast.success("Se Actulizo correctamente", {
        position: "bottom-right",
        style: {
          background: "gray",
          color: "#fff",
        },
      });
    } else {
      await createDocumento(data);
      console.log(data)
      toast.success("Se Guardo correctamente", {
        position: "bottom-right",
        style: {
          background: "green",
          color: "#fff",
        },
      });
    }
  });

  return (
    <>
      <Layout>
        <main>
          <div className="container-fluid p-4">
            <div className="card mb-4 ">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h1>Documentos</h1>
                <div>
                  <Link className="btn btn-success" to={`/documentos/`}>
                    Lista de Documentos
                  </Link>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <h2>Subir Documento</h2>
                <form onSubmit={onSubmit}  >
                  {/* NOMBRE */}
                  <div className="mb-3">
                    <label htmlFor="seguro" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("nombre", { required: true })}
                    />
                    {errors.nombre && <span>este campo es requerido</span>}
                  </div>
                  {/* FECHA_VENCIMIENTO */}
                  <div className="mb-3">
                    <label htmlFor="fechaVencimiento" className="form-label">
                      Fecha de Vencimiento
                    </label>

                    <input
                      className="form-control"
                      type="date"
                      {...register("fecha_vencimiento", { required: true })}
                    />
                    {errors.fecha_vencimiento && (
                      <span>este campo es requerido</span>
                    )}
                  </div>
                  {/* VEHICULO */}

                  <div>
                    <label>Vehiculo</label>
                    <select
                      className="form-control"
                      {...register("vehiculo", { required: true })}
                    >
                      {vehiculos.map((option, index) => (
                        <option key={index} value={option.vehiculo_id}>
                          {option.marca}
                        </option>
                      ))}
                    </select>
                    {errors.vehiculo && <span>este campo es requerido</span>}
                  </div>

                  {/* DOCUMENTO OPCIONAL ================================================= */}
                 {/*  <div className="mb-3">
                      <label htmlFor="documento" className="form-label">
                        Documento
                      </label>
                      <input type="file" {...register('archivo')} />
                    </div>
                    {errors.archivo && <span>este campo es requierido</span> } */}
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
            <div className="text-center">
              <Link to="/vehiculos" className="btn btn-primary">
                Volver
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
