import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import shortid from "shortid";
import { getSelectedVehicle } from "../../store/selectedvehicle/action";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Row,
    Col,
    Modal,
    ButtonGroup,
    Card,
    Form,
    Tooltip,
    Overlay,
} from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { useRouter } from "next/router";
import img from "../../public/imagesupload/uploadimage.png";
import eliminar from "../../public/imagesupload/eliminar.png";
import InfoIcon from "@material-ui/icons/Info";
import ModalMensajes from "../mensajes/ModalMensajes";

// Componentes Crear Producto
import DatosVehiculos from "./DatosVehiculos";
import DatosVehiculosDos from "./DatosVehiculosDos";
import DatosVehiculosTres from "./DatosVehiculosTres";
import DatosVehiculosCuatro from "./DatosVehiculosCuatro";
import DatosVehiculosCinco from "./DatosVehiculosCinco";
import DatosVehiculosSeis from "./DatosVehiculosSeis";
import DatosVehiculosSiete from "./DatosVehiculosSiete";
import DatosVehiculosOcho from "./DatosVehiculosOcho";
import DatosVehiculosNueve from "./DatosVehiculosNueve";
import DatosVehiculosDiez from "./DatosVehiculosTres";

import ModalComentariosHabitaculo from "./ModalComentariosHabitaculo";
import CategoriasProductosGenericos from "./CategoriasProductosGenericos";
import ModalComentariosUbicacionProducto from "./ModalComentariosUbicacionProducto";
//
import iconoaireacondicionadoinicial from "../../public/static/img/createproducts/aireacondicionadoini.png";
import iconoaireacondicionadoseleccion from "../../public/static/img/createproducts/aireacondicionadosel.png";
import iconoaireacondicionadodescarte from "../../public/static/img/createproducts/aireacondicionadodes.png";
import iconoarranqueinicial from "../../public/static/img/createproducts/arranqueini.png";
import iconoarranqueseleccion from "../../public/static/img/createproducts/arranquesel.png";
import iconoarranquedescarte from "../../public/static/img/createproducts/arranquedes.png";
import iconocajainicial from "../../public/static/img/createproducts/cajaini.png";
import iconocajaseleccion from "../../public/static/img/createproducts/cajasel.png";
import iconocajadescarte from "../../public/static/img/createproducts/cajades.png";
import iconodireccioninicial from "../../public/static/img/createproducts/direccionini.png";
import iconodireccionseleccion from "../../public/static/img/createproducts/direccionsel.png";
import iconodirecciondescarte from "../../public/static/img/createproducts/direcciondes.png";
import iconoembragueinicial from "../../public/static/img/createproducts/embragueini.png";
import iconoembragueseleccion from "../../public/static/img/createproducts/embraguesel.png";
import iconoembraguedescarte from "../../public/static/img/createproducts/embraguedes.png";
import iconoescapeinicial from "../../public/static/img/createproducts/escapeini.png";
import iconoescapeseleccion from "../../public/static/img/createproducts/escapesel.png";
import iconoescapedescarte from "../../public/static/img/createproducts/escapedes.png";
import iconofrenosinicial from "../../public/static/img/createproducts/frenosini.png";
import iconofrenosseleccion from "../../public/static/img/createproducts/frenossel.png";
import iconofrenosdescarte from "../../public/static/img/createproducts/frenosdes.png";
import iconoinyeccioninicial from "../../public/static/img/createproducts/inyeccionini.png";
import iconoinyeccionseleccion from "../../public/static/img/createproducts/inyeccionsel.png";
import iconoinyecciondescarte from "../../public/static/img/createproducts/inyecciondes.png";
import iconomotorinicial from "../../public/static/img/createproducts/motorini.png";
import iconomotorseleccion from "../../public/static/img/createproducts/motorsel.png";
import iconomotordescarte from "../../public/static/img/createproducts/motordes.png";
import iconoparabrisasinicial from "../../public/static/img/createproducts/parabrisasini.png";
import iconoparabrisasseleccion from "../../public/static/img/createproducts/parabrisassel.png";
import iconoparabrisasdescarte from "../../public/static/img/createproducts/parabrisasdes.png";
import iconorefrigeracioninicial from "../../public/static/img/createproducts/refrigeracionini.png";
import iconorefrigeracionseleccion from "../../public/static/img/createproducts/refrigeracionsel.png";
import iconorefrigeraciondescarte from "../../public/static/img/createproducts/refrigeraciondes.png";
import iconorefrigeracioncajainicial from "../../public/static/img/createproducts/refrigeracioncajaini.png";
import iconorefrigeracioncajaseleccion from "../../public/static/img/createproducts/refrigeracioncajasel.png";
import iconorefrigeracioncajadescarte from "../../public/static/img/createproducts/refrigeracioncajades.png";
import iconosistemaelectricoinicial from "../../public/static/img/createproducts/sistemaelectricoini.png";
import iconosistemaelectricoseleccion from "../../public/static/img/createproducts/sistemaelectricosel.png";
import iconosistemaelectricodescarte from "../../public/static/img/createproducts/sistemaelectricodes.png";
import iconosistemaelectricomotorinicial from "../../public/static/img/createproducts/sistemaelectricomotorini.png";
import iconosistemaelectricomotorseleccion from "../../public/static/img/createproducts/sistemaelectricomotorsel.png";
import iconosistemaelectricomotordescarte from "../../public/static/img/createproducts/sistemaelectricomotordes.png";
import iconosuspensioninicial from "../../public/static/img/createproducts/suspensionini.png";
import iconosuspensionseleccion from "../../public/static/img/createproducts/suspensionsel.png";
import iconosuspensiondescarte from "../../public/static/img/createproducts/suspensiondes.png";
import iconotransmisioninicial from "../../public/static/img/createproducts/transmisionini.png";
import iconotransmisionseleccion from "../../public/static/img/createproducts/transmisionsel.png";
import iconotransmisiondescarte from "../../public/static/img/createproducts/transmisiondes.png";

const useStyles = makeStyles({
    root: {
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //border: 10,
        //borderRadius: 48,
        //box: '5px 3px 5px 2px rgba(0, 0, 15, .3)',
        color: "#2D2E83",
        //height: 58,
        fontSize: 47,
        //width: 42,
        padding: "0 0px",
    },
});

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix=""
        />
    );
}

function NumberFormatCelular(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            prefix=""
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

NumberFormatCelular.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function RegistrarFotos(props) {
    const { showIngresoFotos, setShowIngresoFotos, generico } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState(false);
    const [imgUno, setImgUno] = useState(img);
    const [imgDos, setImgDos] = useState(img);
    const [imgTres, setImgTres] = useState(img);
    const [imgCuatro, setImgCuatro] = useState(img);
    const [imgCinco, setImgCinco] = useState(img);
    const [imgSeis, setImgSeis] = useState(img);
    const [imgSiete, setImgSiete] = useState(img);
    const [imgOcho, setImgOcho] = useState(img);
    const [imgNueve, setImgNueve] = useState(img);
    const [imgDiez, setImgDiez] = useState(img);
    const [mostrarDocumentoUno, setMostrarDocumentoUno] = useState(false);
    const [mostrarDocumentoDos, setMostrarDocumentoDos] = useState(false);
    const [mostrarDocumentoTres, setMostrarDocumentoTres] = useState(false);
    const [mostrarDocumentoCuatro, setMostrarDocumentoCuatro] = useState(false);
    const [mostrarDocumentoCinco, setMostrarDocumentoCinco] = useState(false);
    const [mostrarDocumentoSeis, setMostrarDocumentoSeis] = useState(false);
    const [mostrarDocumentoSiete, setMostrarDocumentoSiete] = useState(false);
    const [mostrarDocumentoOcho, setMostrarDocumentoOcho] = useState(false);
    const [mostrarDocumentoNueve, setMostrarDocumentoNueve] = useState(false);
    const [mostrarDocumentoDiez, setMostrarDocumentoDiez] = useState(false);

    const [selectedArchives, setSelectedArchives] = useState([]);
    const [baseArchives, setBaseArchives] = useState([]);

    // Lee Caracteristicas del Veh Selecdo
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );
    // Lee Carateristicas del Motor
    const caracteristicasmotor = useSelector(
        (state) => state.datosmotor.datosmotor
    );
    // Lee Datos de producto ingresdo por el vendedor
    const datosproductouno = useSelector(
        (state) => state.datosproducto.datosproducto
    );
    const datosproductodos = useSelector(
        (state) => state.datosproductouno.datosproductouno
    );
    const datosubicarproducto = useSelector(
        (state) => state.ubicarproducto.ubicarproducto
    );
    const usuariologueado = useSelector((state) => state.userlogged.userlogged);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const generabase64 = async () => {
        console.log("FILE NAME : ", baseArchives);

        if (!baseArchives) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "La Visibilidad de tu producto depende de las fotos, Ingresa como minimo una!"
            );
        }

        const recorreImagen = async () => {
            let longitud = baseArchives.length;
            let arreglofotos = [];
            let contador = 0;
            await Array.from(baseArchives).forEach((archivo) => {
                var reader = new FileReader();
                reader.readAsDataURL(archivo);
                reader.onload = function () {
                    var base64 = reader.result;
                    arreglofotos[contador] = base64;
                    //console.log("BASE 64 : ", base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64')));
                    var extension =
                        "." +
                        base64.substring(
                            base64.indexOf("/") + 1,
                            base64.indexOf(";base64")
                        );
                    contador = contador + 1;

                    if (contador === longitud) {
                        //console.log("CONTADOR : ", contador);
                        //console.log("LONGITUD : ", longitud);
                        setLoading(true);
                        grabarfoto(arreglofotos, extension);
                    }
                };
            });
        };
        recorreImagen();
    };

    useEffect(() => {
        //setLoading(false);
    }, []);

    const grabarfoto = async (dato, ext) => {
        //console.log("IMAGEN EN PRUEBA : ", dato);

        let longitud = dato.length;
        let datoimagen;
        let nombrefoto = shortid();
        //console.log("LONGITUD FOTO : ", longitud);
        switch (longitud) {
            case 1:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                };
                break;
            case 2:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                };
                break;
            case 3:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                };
                break;
            case 4:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                };
                break;
            case 5:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                };
                break;
            case 6:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                };
                break;
            case 7:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                };
                break;
            case 8:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                };
                break;
            case 9:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                };
                break;
            case 10:
                datoimagen = {
                    longitud,
                    nombreimagen1: nombrefoto + "-1" + ext,
                    imagen1: dato[0],
                    nombreimagen2: nombrefoto + "-2" + ext,
                    imagen2: dato[1],
                    nombreimagen3: nombrefoto + "-3" + ext,
                    imagen3: dato[2],
                    nombreimagen4: nombrefoto + "-4" + ext,
                    imagen4: dato[3],
                    nombreimagen5: nombrefoto + "-5" + ext,
                    imagen5: dato[4],
                    nombreimagen6: nombrefoto + "-6" + ext,
                    imagen6: dato[5],
                    nombreimagen7: nombrefoto + "-7" + ext,
                    imagen7: dato[6],
                    nombreimagen8: nombrefoto + "-8" + ext,
                    imagen8: dato[7],
                    nombreimagen9: nombrefoto + "-9" + ext,
                    imagen9: dato[8],
                    nombreimagen10: nombrefoto + "-10" + ext,
                    imagen10: dato[10],
                };
                break;
            default:
                datoimagen = {
                    longitud,
                    nombreimagen1: "",
                    imagen1: 0,
                    nombreimagen2: "",
                    imagen2: 0,
                    nombreimagen3: "",
                    imagen3: 0,
                    nombreimagen4: "",
                    imagen4: 0,
                    nombreimagen5: "",
                    imagen5: 0,
                    nombreimagen6: "",
                    imagen6: 0,
                    nombreimagen7: "",
                    imagen7: 0,
                    nombreimagen8: "",
                    imagen8: 0,
                    nombreimagen9: "",
                    imagen9: 0,
                    nombreimagen10: "",
                    imagen10: 0,
                };
                break;
        }

        //console.log("DATOS IMAGEN : ", datoimagen);
        //return;
        creaProducto(datoimagen);
    };

    const creaProducto = async (datosimagenes) => {
        // POST request using axios with async/await

        const ubicacionposiciones = JSON.parse(
            localStorage.getItem("ubicacionposicionproducto")
        );
        const vehiculoscompatibles = JSON.parse(
            localStorage.getItem("vehiculoscompatibles")
        );
        const informacionproducto = JSON.parse(
            localStorage.getItem("informacionproducto")
        );
        const datospublicacion = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        //console.log("UBICACIONES: ", ubicacionposiciones);
        //console.log("COMPATIBLES: ", vehiculoscompatibles);
        //console.log("INFORMACION: ", informacionproducto);
        //console.log("PUBLICACION: ", datospublicacion);

        //console.log("DATOS IMAGENES : ", datosimagenes);

        //let preciosinseparadores = datospublicacion.precio.replace(/,/g, "");
        //console.log("PRECIO : ", preciosinseparadores);
        //return;
        //let anchosinseparadores = datosproductodos.ancho.replace(/,/g, "");
        //let altosinseparadores = datosproductodos.alto.replace(/,/g, "");
        //let largosinseparadores = datosproductodos.largo.replace(/,/g, "");
        //let pesosinseparadores = datosproductodos.peso.replace(/,/g, "");

        /*
      let fecha = new Date();
        let numero = Date.parse(fecha);
        console.log("VALOR FECHA NUMERO : ", numero)
        */
        let idvehiculoscompatible = shortid();
        //console.log("PRECIO PRODUCTO: ", datospublicacion[0].precio);

        const newDetDos = [];
        let item = {
            id: idvehiculoscompatible,
            titulo: informacionproducto[0].titulonombre,
        };
        //newDetUno.push(itemUno);

        localStorage.setItem("idpublicacion", JSON.stringify(item));

        //Eliminar separadores en el precio
        let precio = datospublicacion[0].precio;
        let valorproducto = precio.replace(/,/g, "");
        //console.log("PRECIO : ",valorproducto);

        const formdata = new FormData();
        formdata.append("id", 0);
        formdata.append("productogenerico", generico);
        formdata.append("tipovehiculo", vehiculoscompatibles[0].tipoVehUno);
        formdata.append("carroceria", vehiculoscompatibles[0].carroceriaVehUno);
        formdata.append("marca", vehiculoscompatibles[0].marcaVehUno);
        formdata.append("anno", vehiculoscompatibles[0].annoVehUno);
        formdata.append("modelo", vehiculoscompatibles[0].modeloVehUno);
        formdata.append(
            "cilindrajemotor",
            vehiculoscompatibles[0].cilindrajeVehUno
        );
        formdata.append(
            "tipocombustible",
            vehiculoscompatibles[0].combustibleVehUno
        );
        formdata.append(
            "transmision",
            vehiculoscompatibles[0].transmisionVehUno
        );
        formdata.append("tipotraccion", vehiculoscompatibles[0].traccionVehUno);
        formdata.append("turbocompresor", 0);
        formdata.append(
            "posicionproducto",
            ubicacionposiciones[0].posicionProducto
        );
        formdata.append(
            "partedelvehiculo",
            ubicacionposiciones[0].ubicacionProducto
        );

        formdata.append("titulonombre", informacionproducto[0].titulonombre);
        formdata.append("marcarepuesto", informacionproducto[0].marcarepuesto);
        formdata.append("condicion", informacionproducto[0].condicion);
        formdata.append(
            "estadoproducto",
            informacionproducto[0].estadoproducto
        );
        formdata.append(
            "vendeporpartes",
            informacionproducto[0].vendeporpartes
        );
        formdata.append("numerodeparte", informacionproducto[0].numerodeparte);
        formdata.append(
            "numerodeunidades",
            datospublicacion[0].numerodeunidades
        );
        formdata.append("precio", valorproducto);
        formdata.append("compatible", idvehiculoscompatible);
        formdata.append(
            "descripcionproducto",
            datospublicacion[0].descripcionproducto
        );
        formdata.append("peso", datospublicacion[0].peso);
        formdata.append("alto", datospublicacion[0].alto);
        formdata.append("ancho", datospublicacion[0].ancho);
        formdata.append("largo", datospublicacion[0].largo);

        formdata.append("descuento", formData.descuento);
        formdata.append("usuario", usuariologueado.uid);
        formdata.append("moneda", formData.moneda);
        formdata.append("estado", formData.estado);
        formdata.append("longitud", datosimagenes.longitud);
        formdata.append("nombreimagen1", datosimagenes.nombreimagen1);
        formdata.append("imagen1", datosimagenes.imagen1);
        formdata.append("nombreimagen2", datosimagenes.nombreimagen2);
        formdata.append("imagen2", datosimagenes.imagen2);
        formdata.append("nombreimagen3", datosimagenes.nombreimagen3);
        formdata.append("imagen3", datosimagenes.imagen3);
        formdata.append("nombreimagen4", datosimagenes.nombreimagen4);
        formdata.append("imagen4", datosimagenes.imagen4);
        formdata.append("nombreimagen5", datosimagenes.nombreimagen5);
        formdata.append("imagen5", datosimagenes.imagen5);
        formdata.append("nombreimagen6", datosimagenes.nombreimagen6);
        formdata.append("imagen6", datosimagenes.imagen6);
        formdata.append("nombreimagen7", datosimagenes.nombreimagen7);
        formdata.append("imagen7", datosimagenes.imagen7);
        formdata.append("nombreimagen8", datosimagenes.nombreimagen8);
        formdata.append("imagen8", datosimagenes.imagen8);
        formdata.append("nombreimagen9", datosimagenes.nombreimagen9);
        formdata.append("imagen9", datosimagenes.imagen9);
        formdata.append("nombreimagen10", datosimagenes.nombreimagen10);
        formdata.append("imagen10", datosimagenes.imagen10);

        //console.log("FORM DATA : ", formdata);
        //return;
        //console.log("DATOS CREACION DE PRODUCTO : ", producto);
        let creoregistro = false;
        let url = "https://sitbusiness.co/mrp/api";

        await fetch(`${url}/16`, {
            method: "POST",
            body: formdata,
            //headers: headers,
        }).then((response) => {
            if (response) {
                if (response.status === 200) {
                    creoregistro = true;
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Fotos productos grabadas de forma correcta!"
                    );
                    setLoading(false);
                    //router.push("/");
                    router.push("/CreateProduct/terminapublicacion");
                } else {
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Se presentaron inconvenientes al grabar los fotos, Intenta nuevamente!"
                    );
                    setLoading(false);
                    router.push("/");
                    //Router.push(`/search?keyword=${keyword}`);
                    //router.push("/CreateProduct/terminapublicacion");
                }
            } else {
                console.log("RESPONSE INGRESO FOTOS : ", response);
            }
        });

        if (creoregistro) {
            setLoading(true);

            const formdataveh = new FormData();
            formdataveh.append("codigopublicacion", idvehiculoscompatible);
            formdataveh.append(
                "tipovehiculo",
                vehiculoscompatibles[0].tipoVehUno
            );
            formdataveh.append(
                "carroceria",
                vehiculoscompatibles[0].carroceriaVehUno
            );
            formdataveh.append("marca", vehiculoscompatibles[0].marcaVehUno);
            formdataveh.append("anno", vehiculoscompatibles[0].annoVehUno);
            formdataveh.append("modelo", vehiculoscompatibles[0].modeloVehUno);
            formdataveh.append(
                "cilindrajemotor",
                vehiculoscompatibles[0].cilindrajeVehUno
            );
            formdataveh.append(
                "tipocombustible",
                vehiculoscompatibles[0].combustibleVehUno
            );
            formdataveh.append(
                "transmision",
                vehiculoscompatibles[0].transmisionVehUno
            );
            formdataveh.append(
                "partedelvehiculo",
                ubicacionposiciones[0].ubicacionProducto
            );
            formdataveh.append(
                "tipotraccion",
                vehiculoscompatibles[0].traccionVehUno
            );
            formdataveh.append("turbocompresor", 0);
            formdataveh.append(
                "posicionproducto",
                ubicacionposiciones[0].posicionProducto
            );
            formdataveh.append("usuario", usuariologueado.uid);

            const grabaVehiculos = async () => {
                let url = "https://sitbusiness.co/mrp/api";

                await fetch(`${url}/24`, {
                    method: "POST",
                    body: formdataveh,
                    //headers: headers,
                }).then((response) => {
                    if (response) {
                        if (response.status === 200) {
                            setShowModalMensajes(true);
                            setTituloMensajes("Información del producto");
                            setTextoMensajes(
                                "Vehículos compatibles creados de forma correcta!"
                            );
                            setLoading(false);
                            //router.push("/");
                        } else {
                            setShowModalMensajes(true);
                            setTituloMensajes("Información del producto");
                            setTextoMensajes(
                                "Se presentaron inconvenientes al grabar hehículos compatibles!"
                            );
                            setLoading(false);
                            //router.push("/");
                        }
                    } else {
                        console.log(
                            "RESPONSE VEHICULOS COMPATIBLES : ",
                            response
                        );
                    }
                });
            };
            grabaVehiculos();
        }
    };

    const onSelectFile = (event) => {
        console.log("EVENT FILE : ", event.target.files);

        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Recuerda, maximo diez archivos!");
            return;
        }

        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        let longitud = baseArchives.length;

        //return

        const newDet = [];
        if (!baseArchives) {
            setBaseArchives(selectedFilesArray);
        } else newDet.push.apply(baseArchives, selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return file.name;
            //return URL.createObjectURL(file);
        });

        //console.log("NOMBRE ARCHIVO : ", selectedFiles);

        // Selected Files se actualiza con el ingreso o borrado, por eso se deben igualar
        //if(selectedFilesArray.length != baseArchives.length){
        //    setBaseArchives(selectedFilesArray)
        //}

        setSelectedArchives((previousImages) =>
            previousImages.concat(imagesArray)
        );
    };

    const actualizaImagenes = () => {
        //console.log("LONGITUD USE EFFECT : ", selectedArchives);
        //console.log("ARRAY BASE LONGITUD: ", baseArchives);
        if (selectedArchives.length > 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Recuerda, maximo 10 archivos!");
            setSelectedArchives([]);
            return;
        }

        if (selectedArchives.length === 1) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
        } else if (selectedArchives.length === 2) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
        } else if (selectedArchives.length === 3) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
        } else if (selectedArchives.length === 4) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
        } else if (selectedArchives.length === 5) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
        } else if (selectedArchives.length === 6) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
        } else if (selectedArchives.length === 7) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
        } else if (selectedArchives.length === 8) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
        } else if (selectedArchives.length === 9) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
        } else if (selectedArchives.length === 10) {
            setImgUno(URL.createObjectURL(baseArchives[0]));
            setImgDos(URL.createObjectURL(baseArchives[1]));
            setImgTres(URL.createObjectURL(baseArchives[2]));
            setImgCuatro(URL.createObjectURL(baseArchives[3]));
            setImgCinco(URL.createObjectURL(baseArchives[4]));
            setImgSeis(URL.createObjectURL(baseArchives[5]));
            setImgSiete(URL.createObjectURL(baseArchives[6]));
            setImgOcho(URL.createObjectURL(baseArchives[7]));
            setImgNueve(URL.createObjectURL(baseArchives[8]));
            setImgDiez(URL.createObjectURL(baseArchives[9]));
        }

        //console.log("LONGITUD BASE : ", baseArchives.length)
        //console.log("DOCUMENTOS SELECTED : ", selectedArchives);
        //console.log("DOCUMENTOS BASE : ", baseArchives);
    };

    useEffect(() => {
        if (selectedArchives.length > 0) {
            if (selectedArchives.length === 1) {
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 2) {
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 3) {
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 4) {
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 5) {
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 6) {
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 7) {
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 8) {
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 9) {
                setImgDiez(img);
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(false);
            } else if (selectedArchives.length === 10) {
                setMostrarDocumentoUno(true);
                setMostrarDocumentoDos(true);
                setMostrarDocumentoTres(true);
                setMostrarDocumentoCuatro(true);
                setMostrarDocumentoCinco(true);
                setMostrarDocumentoSeis(true);
                setMostrarDocumentoSiete(true);
                setMostrarDocumentoOcho(true);
                setMostrarDocumentoNueve(true);
                setMostrarDocumentoDiez(true);
            } else {
                setImgUno(img);
                setImgDos(img);
                setImgTres(img);
                setImgCuatro(img);
                setImgCinco(img);
                setImgSeis(img);
                setImgSiete(img);
                setImgOcho(img);
                setImgNueve(img);
                setImgDiez(img);
                setMostrarDocumentoUno(false);
                setMostrarDocumentoDos(false);
                setMostrarDocumentoTres(false);
                setMostrarDocumentoCuatro(false);
                setMostrarDocumentoCinco(false);
                setMostrarDocumentoSeis(false);
                setMostrarDocumentoSiete(false);
                setMostrarDocumentoOcho(false);
                setMostrarDocumentoNueve(false);
                setMostrarDocumentoDiez(false);
            }
            actualizaImagenes();
        } else {
            setImgUno(img);
            setImgDos(img);
            setImgTres(img);
            setImgCuatro(img);
            setImgCinco(img);
            setImgSeis(img);
            setImgSiete(img);
            setImgOcho(img);
            setImgNueve(img);
            setImgDiez(img);
            setMostrarDocumentoUno(false);
            setMostrarDocumentoDos(false);
            setMostrarDocumentoTres(false);
            setMostrarDocumentoCuatro(false);
            setMostrarDocumentoCinco(false);
            setMostrarDocumentoSeis(false);
            setMostrarDocumentoSiete(false);
            setMostrarDocumentoOcho(false);
            setMostrarDocumentoNueve(false);
            setMostrarDocumentoDiez(false);
        }
    }, [selectedArchives]);

    const onCloseModalFotosProducto = () => {
        setShowModalFotos(false);
    };

    return (
        <div className="cajafotosproductos ps-page__header mt-25">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <Row>
                
                <Col xl={7} lg={7} md={7} sm={7}>
                    <div>
                        <h3 className="ml-25 tituloadvertenciaproductosizquierda mt-15 mb-15">
                            Ingresa fotos del producto - mínimo una
                        </h3>
                    </div>
                </Col>
            </Row>

            <form onChange={onChange} className="ml-25">
                <div className="ps-form--review">
                    <Form.Group
                        controlId="formFileMultiple"
                        className="ps-form__group">
                        <div className="ml-8">
                            <Row>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoUno ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgUno
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />

                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-input">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgUno.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                            <div className="ml-4 inputtextobotofotos">
                                                                Ingresar foto
                                                            </div>
                                                        */}
                                                </label>
                                                <input
                                                    id="file-input"
                                                    name="images"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoDos ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgDos
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputUno">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgDos.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputUno"
                                                    name="imagesuno"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoTres ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgTres
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputDos">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgTres.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputDos"
                                                    name="imagesdos"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoCuatro ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgCuatro
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputTres">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgCuatro.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputTres"
                                                    name="imagestres"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoCinco ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgCinco
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputCuatro">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgCinco.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputCuatro"
                                                    name="imagescuatro"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="mt-15 ml-8">
                            <Row>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoSeis ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgSeis
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputCinco">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgSeis.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputCinco"
                                                    name="imagescinco"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoSiete ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgSiete
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputSeis">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgSiete.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputSeis"
                                                    name="imagesseis"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoOcho ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    0 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgOcho
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputSiete">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgOcho.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputSiete"
                                                    name="imagessiete"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoNueve ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    1 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgNueve
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputOcho">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgNueve.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputOcho"
                                                    name="imagesocho"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                <Col
                                    className="mr-85"
                                    xl={1}
                                    lg={1}
                                    sm={1}
                                    md={1}>
                                    <div class="image-upload">
                                        {mostrarDocumentoDiez ? (
                                            <div>
                                                {selectedArchives &&
                                                    selectedArchives.map(
                                                        (archive, index) => {
                                                            return (
                                                                <div
                                                                    key={
                                                                        archive
                                                                    }>
                                                                    {index ==
                                                                    2 ? (
                                                                        <div>
                                                                            <img
                                                                                className="tamañoimagenuploadproducto"
                                                                                src={
                                                                                    imgDiez
                                                                                }
                                                                                alt="Seleccione Archivo"
                                                                            />
                                                                            <div
                                                                                className="botonborrararchivo"
                                                                                onClick={() =>
                                                                                    setSelectedArchives(
                                                                                        selectedArchives.filter(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e !==
                                                                                                archive
                                                                                        )
                                                                                    )
                                                                                }>
                                                                                <h3>
                                                                                    X
                                                                                </h3>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                    {
                                                                        // <p>{index + 1}</p>
                                                                    }
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </div>
                                        ) : (
                                            <div>
                                                <label for="file-inputNueve">
                                                    <img
                                                        className="tamañoimagenupload"
                                                        src={imgDiez.src}
                                                        alt="Seleccione Archivo"
                                                    />
                                                    {/*
                                                        <div className="ml-4 inputtextobotofotos">
                                                            Ingresar foto
                                                        </div>
                                                         */}
                                                </label>
                                                <input
                                                    id="file-inputNueve"
                                                    name="imagesnueve"
                                                    type="file"
                                                    onChange={onSelectFile}
                                                    multiple
                                                    //style={{ display: "none" }}
                                                    accept="image/png, image/jpeg, application/pdf"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form.Group>
                </div>
            </form>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <br />
                </div>
            )}

            <div className="ml-25 mtmenos10">
                <Row>
                    <Col xl={7} lg={7} xs={7} md={7}>
                        <div>
                            <p className="ps-form__text">
                                Incluye como mínimo una foto!
                            </p>
                        </div>
                    </Col>
                    <Col xl={2} lg={2} xs={2} md={2}>
                        <Button
                            variant="outline-light"
                            className="ml-20 colortextoselect ps-btn baseinput">
                            {" "}
                            Cancelar{" "}
                        </Button>
                    </Col>
                    <Col xl={3} lg={3} xs={3} md={3}>
                        <div className="ml-22 ps-btn" onClick={generabase64}>
                            Publicar
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        id: 0,
        productogenerico: 0,
        tipoVeh: 0,
        carroceria: 0,
        marca: 0,
        anno: 0,
        modelo: 0,
        cilindrajemotor: 0,
        tipocombustible: 0,
        transmision: 0,
        partedelVeh: "",
        posicionproducto: "",
        titulonombre: "",
        marcarepuesto: "",
        condicion: "",
        estadoproducto: "",
        numerodeunidades: "",
        precio: "",
        numerodeparte: 0,
        compatible: "",
        descripcionproducto: "",
        vendeporpartes: "",
        peso: 0,
        largo: 0,
        ancho: 0,
        alto: 0,
        tipotraccion: 0,
        turbocompresor: 0,
        descuento: 0,
        usuario: 1,
        moneda: 0,
        estado: 31,
        numerodeimagenes: 0,
        nombreimagen1: "",
        nombreimagen2: "",
        nombreimagen3: "",
        nombreimagen4: "",
        nombreimagen5: "",
        nombreimagen6: "",
        nombreimagen7: "",
        nombreimagen8: "",
        nombreimagen9: "",
        nombreimagen10: "",
    };
}

export default RegistrarFotos;