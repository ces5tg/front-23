import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Layout } from "../components/Layout";

import {
  getAllDocumentos,
  createDocumento,
  deleteDocumento,
} from "../api/documento.api";
import { getAllVehiculos } from "../api/vehiculo.api";
import { useForm } from "react-hook-form";
import { DocumentosForm } from "./form/DocumentosForm";
import { toast } from "react-hot-toast";
function Documentos() {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    async function loadDocumentos() {
      const resDocumentos = await getAllDocumentos();
      setDocumentos(resDocumentos.data);
    }
    loadDocumentos();
  }, []);

  const removeDocumento = async (id) => {
    await deleteDocumento(id);
    setDocumentos(documentos.filter((documento) => documento.documento != id));
    toast.success("Se elimino correctamente", {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <Layout>
        <main>
          <div className="card m-4">
            <div className="card-body">
              <Link className="btn btn-success" to={`/documentos-form/`}>
                Crear nuevo Documento
              </Link>
            </div>
          </div>
          <div className="card m-4">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha Nacimiento</th>
                    <th scope="col">Vehiculo</th>
                    <th colSpan={2} className="text-center">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map((documento) => (
                    <tr key={documento.documento}>
                      <td>{documento.documento}</td>
                      <td>{documento.nombre}</td>
                      <td>{documento.fecha_vencimiento}</td>
                      <td>{documento.vehiculo}</td>

                      <td>
                        <Link className="btn btn-primary" to={`/documentos/${documento.documento}`}>
                          editar
                        </Link>
                      </td>
                      <td>
                        <button className="btn btn-danger"
                          onClick={(e) =>
                            removeDocumento(documento.documento, e)
                          }
                        >
                          eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
export default Documentos;
