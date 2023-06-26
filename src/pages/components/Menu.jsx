import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
function Menu() {
  const [open, setOpen] = useState(false);

  const abrir = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="px-3 py-1 text-white bg-primary mx-3 rounded-2 text-center" onClick={abrir}>Vehiculos</div>
      {open && (
        <div className="p-3">
          <Link className="btn btn-success w-100" to={`/documentos-form/`}>
             Crear de Documentos
          </Link>
          <Link className="btn btn-success mt-1 w-100" to={`/vehiculos-form/`}>
            Crear de Vehiculos
          </Link>
        </div>
      )}
    </>
  );
}

export default Menu;
