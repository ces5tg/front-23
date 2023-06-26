import axios from "axios";

const DocumentoApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/documentos/',
});
/* export const getAllTaSKS =()=> {
  return axios.get("http://127.0.0.1:8000/documentos/")
}
 */
//OBSERVACION  => LOS PARAMETROS NOS PUEDEN TENER EL MISMO NOMBRE , A PESAR DE QUE ESTEN EN ORDEN
export const getAllDocumentos = () => DocumentoApi.get("/");

export const getDocumento = (documento_id) => DocumentoApi.get(`/${documento_id}`);

export const createDocumento = (documento) => DocumentoApi.post("/", documento);

export const updateDocumento = (documento_id, documento) => DocumentoApi.put(`/${documento_id}/`, documento);

export const deleteDocumento = (documento_id) => DocumentoApi.delete(`/${documento_id}`);