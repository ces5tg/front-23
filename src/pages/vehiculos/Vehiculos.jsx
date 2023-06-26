import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  getAllVehiculos,
  createVehiculo,
  deleteVehiculo,
  getVehiculo,
  getSearchVehiculo,
} from "../api/vehiculo.api";
import { useForm } from "react-hook-form";
import { VehiculosForm } from "./form/VehiculosForm";
import { toast } from "react-hot-toast";
function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [search, setSearch] = useState("");

  const param = useParams();
  useEffect(() => {
    async function loadVehiculos() {
      if (param.search) {
        const resVehiculos = await getSearchVehiculo(param.search);
        setVehiculos(resVehiculos.data);
      } else {
        const resVehiculos = await getAllVehiculos();
        console.log(resVehiculos);
        setVehiculos(resVehiculos.data);
      }
    }
    /* const shouldReloadPage =recargar;
    if (shouldReloadPage) {
      window.location.reload();
      shouldReloadPage = false
    } */
    loadVehiculos();
  }, [param]);

  const removeVehiculos = async (id) => {
    console.log(id);
    const a = await deleteVehiculo(id);
    setVehiculos(vehiculos.filter((vehiculo) => vehiculo.vehiculo_id !== id));
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
              <Link className="btn btn-success" to={`/vehiculos-form/`}>
                Crear nuevo Vehiculo
              </Link>
            </div>
          </div>
          <div className="card m-4">
            <div className="card-body">
              <input
                type="text"
                value={search}
                onChange={(e) => {setSearch(e.target.value)
                                  console.log(e.target.value)}}
              />
              <Link className="btn btn-primary" to={`/vehiculos/${search}`}>
                Buscar
              </Link>
            </div>

            <div className="card-body">
              {vehiculos ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Placa</th>
                      <th scope="col">Kilometraje</th>
                      <th scope="col">Marca</th>
                      <th scope="col">Modelo</th>
                      <th colSpan={2} className="text-center">
                        ACCIONES
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiculos.map((vehiculo) => (
                      <tr key={vehiculo.vehiculo_id}>
                        <th>{vehiculo.vehiculo_id}</th>
                        <td>{vehiculo.placa}</td>
                        <td>{vehiculo.kilometraje}</td>
                        <td>{vehiculo.marca}</td>
                        <td>{vehiculo.modelo}</td>
                        <td>
                          <Link
                            className="btn btn-primary"
                            to={`/vehiculos/${vehiculo.vehiculo_id}`}
                          >
                            editar
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={(e) =>
                              removeVehiculos(vehiculo.vehiculo_id, e)
                            }
                          >
                            eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>no hay datos</div>
              )}
              {/* <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th colSpan={2} className="text-center">
                      ACCIONES
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                {vehiculos.map((vehiculo) => (
                    <tr key={vehiculo.vehiculo_id}>
                      <th>{vehiculo.vehiculo_id}</th>
                      <td>{vehiculo.placa}</td>
                      <td>{vehiculo.kilometraje}</td>
                      <td>{vehiculo.marca}</td>
                      <td>{vehiculo.modelo}</td>
                      <td>
                        <Link
                          className="btn btn-primary"
                          to={`/vehiculos/${vehiculo.vehiculo_id}`}
                        >
                          editar
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={(e) =>
                            removeVehiculos(vehiculo.vehiculo_id, e)
                          }
                        >
                          eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </table> */}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default Vehiculos;
