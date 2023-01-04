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
import RegistrarFotos from "./RegistrarFotos";

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
import DatosVehiculosDiez from "./DatosVehiculosDiez";

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

const CreateProduct = () => {
    const targetshow = useRef(null);
    const classes = useStyles();
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const [agregarDatos, setAgregarDatos] = useState(false);
    const [eliminoDatos, setEliminoDatos] = useState(false);
    const [mostrarBotonDatosMotor, setMostrarBotonDatosMotor] = useState(false);
    const [agregarVehiculo, setAgregarVehiculo] = useState(false);
    const [showModalDatosProducto, setShowModalDatosProducto] = useState(false);
    const [abrirCerrarCategoriasGenerico, setAbrirCerrarCategoriasGenerico] =
        useState(true);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [controlDuplicar, setControlDuplicar] = useState([]);

    const [controlAgregarVehiculo, setControlAgregarVehiculo] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [tamaño, setTamaño] = useState("col-12 col-md-6 ml-200");
    const [cerrarDatos, setCerrarDatos] = useState(
        "ps-form__group cajavehiculoscompatiblesproducto colorbase"
    );
    const [cerrarDatosDos, setCerrarDatosDos] = useState(
        "custom-selectidentificavehiculo redondearbordegenerico colorbase"
    );
    const [iconoCerrarUno, setIconCerrarUno] = useState(
        "ml-40 showcerrarabrir"
    );
    const [iconoCerrarDos, setIconCerrarDos] = useState(
        "form-control ps-form__input"
    );

    const [showIconoCerrarAbrir, setShowIconoCerrarAbrir] = useState(false);

    const [genericoUno, setGenericoUno] = useState("Si");
    const [labelGenericoUno, setLabelGenericoUno] = useState(
        "Si - Es compatible con diferentes marcas y modelos de Vehículos."
    );

    const [genericoDos, setGenericoDos] = useState("No");
    const [labelGenericoDos, setLabelGenericoDos] = useState(
        "No - No es compatible con varias marcas y modelos de Vehículos."
    );

    const [botonGenerico, setBotonGenerico] = useState("botongenerico");

    const [showCreateProduct, setCreateProduct] = useState(true);
    const [showModalLatoneria, setShowModalLatoneria] = useState(false);
    const [showModalLatoneriaActiva, setShowModalLatoneriaActiva] =
        useState(false);
    const [showDatosProductos, setShowDatosProductos] = useState(false);
    const [showDatosProductosActiva, setShowDatosProductosActiva] =
        useState(true);

    const [showDatosProductosAdicionales, setShowDatosProductosAdicionales] =
        useState(false);
    const [showIngresoFotos, setShowIngresoFotos] = useState(false);

    const [pageAcount, setPageAcount] = useState("ps-page__content ps-account");

    const [mostrarDatosVehiculos, setMostrarDatosVehiculos] = useState(false);

    const [contador, setContador] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [vehiculosSeleccionados, setVehiculosSeleccionados] = useState([]);
    const [vehiculoBorrar, setVehiculoBorrar] = useState(false);

    const [tipoVehiculoSeleccionado, settipoVehiculoSeleccionado] =
        useState(null);
    const [tipoVehUno, setTipoVehUno] = useState([]);

    const [marcaVehUno, setMarcaVehUno] = useState([]);
    const [annoVehUno, setAnnoVehUno] = useState([]);
    const [modeloVehUno, setModeloVehUno] = useState([]);
    const [carroceriaVehUno, setCarroceriaVehUno] = useState([]);
    const [cilindrajeVehUno, setcilindrajeVehUno] = useState([]);
    const [transmisionVehUno, settransmisionVehUno] = useState([]);
    const [combustibleVehUno, setcombustibleVehUno] = useState([]);
    const [traccionVehUno, settraccionVehUno] = useState([]);

    const [tipoVehDos, setTipoVehDos] = useState([]);
    const [marcaVehDos, setMarcaVehDos] = useState([]);
    const [annoVehDos, setAnnoVehDos] = useState([]);
    const [modeloVehDos, setModeloVehDos] = useState([]);
    const [carroceriaVehDos, setCarroceriaVehDos] = useState([]);
    const [cilindrajeVehDos, setcilindrajeVehDos] = useState([]);
    const [transmisionVehDos, settransmisionVehDos] = useState([]);
    const [combustibleVehDos, setcombustibleVehDos] = useState([]);
    const [traccionVehDos, settraccionVehDos] = useState([]);

    const [tipoVehTres, setTipoVehTres] = useState([]);
    const [marcaVehTres, setMarcaVehTres] = useState([]);
    const [annoVehTres, setAnnoVehTres] = useState([]);
    const [modeloVehTres, setModeloVehTres] = useState([]);
    const [carroceriaVehTres, setCarroceriaVehTres] = useState([]);
    const [cilindrajeVehTres, setcilindrajeVehTres] = useState([]);
    const [transmisionVehTres, settransmisionVehTres] = useState([]);
    const [combustibleVehTres, setcombustibleVehTres] = useState([]);
    const [traccionVehTres, settraccionVehTres] = useState([]);

    const [tipoVehCuatro, setTipoVehCuatro] = useState([]);
    const [marcaVehCuatro, setMarcaVehCuatro] = useState([]);
    const [annoVehCuatro, setAnnoVehCuatro] = useState([]);
    const [modeloVehCuatro, setModeloVehCuatro] = useState([]);
    const [carroceriaVehCuatro, setCarroceriaVehCuatro] = useState([]);
    const [cilindrajeVehCuatro, setcilindrajeVehCuatro] = useState([]);
    const [transmisionVehCuatro, settransmisionVehCuatro] = useState([]);
    const [combustibleVehCuatro, setcombustibleVehCuatro] = useState([]);
    const [traccionVehCuatro, settraccionVehCuatro] = useState([]);

    const [tipoVehCinco, setTipoVehCinco] = useState([]);
    const [marcaVehCinco, setMarcaVehCinco] = useState([]);
    const [annoVehCinco, setAnnoVehCinco] = useState([]);
    const [modeloVehCinco, setModeloVehCinco] = useState([]);
    const [carroceriaVehCinco, setCarroceriaVehCinco] = useState([]);
    const [cilindrajeVehCinco, setcilindrajeVehCinco] = useState([]);
    const [transmisionVehCinco, settransmisionVehCinco] = useState([]);
    const [combustibleVehCinco, setcombustibleVehCinco] = useState([]);
    const [traccionVehCinco, settraccionVehCinco] = useState([]);

    const [tipoVehSeis, setTipoVehSeis] = useState([]);
    const [marcaVehSeis, setMarcaVehSeis] = useState([]);
    const [annoVehSeis, setAnnoVehSeis] = useState([]);
    const [modeloVehSeis, setModeloVehSeis] = useState([]);
    const [carroceriaVehSeis, setCarroceriaVehSeis] = useState([]);
    const [cilindrajeVehSeis, setcilindrajeVehSeis] = useState([]);
    const [transmisionVehSeis, settransmisionVehSeis] = useState([]);
    const [combustibleVehSeis, setcombustibleVehSeis] = useState([]);
    const [traccionVehSeis, settraccionVehSeis] = useState([]);

    const [tipoVehSiete, setTipoVehSiete] = useState([]);
    const [marcaVehSiete, setMarcaVehSiete] = useState([]);
    const [annoVehSiete, setAnnoVehSiete] = useState([]);
    const [modeloVehSiete, setModeloVehSiete] = useState([]);
    const [carroceriaVehSiete, setCarroceriaVehSiete] = useState([]);
    const [cilindrajeVehSiete, setcilindrajeVehSiete] = useState([]);
    const [transmisionVehSiete, settransmisionVehSiete] = useState([]);
    const [combustibleVehSiete, setcombustibleVehSiete] = useState([]);
    const [traccionVehSiete, settraccionVehSiete] = useState([]);

    const [tipoVehOcho, setTipoVehOcho] = useState([]);
    const [marcaVehOcho, setMarcaVehOcho] = useState([]);
    const [annoVehOcho, setAnnoVehOcho] = useState([]);
    const [modeloVehOcho, setModeloVehOcho] = useState([]);
    const [carroceriaVehOcho, setCarroceriaVehOcho] = useState([]);
    const [cilindrajeVehOcho, setcilindrajeVehOcho] = useState([]);
    const [transmisionVehOcho, settransmisionVehOcho] = useState([]);
    const [combustibleVehOcho, setcombustibleVehOcho] = useState([]);
    const [traccionVehOcho, settraccionVehOcho] = useState([]);

    const [tipoVehNueve, setTipoVehNueve] = useState([]);
    const [marcaVehNueve, setMarcaVehNueve] = useState([]);
    const [annoVehNueve, setAnnoVehNueve] = useState([]);
    const [modeloVehNueve, setModeloVehNueve] = useState([]);
    const [carroceriaVehNueve, setCarroceriaVehNueve] = useState([]);
    const [cilindrajeVehNueve, setcilindrajeVehNueve] = useState([]);
    const [transmisionVehNueve, settransmisionVehNueve] = useState([]);
    const [combustibleVehNueve, setcombustibleVehNueve] = useState([]);
    const [traccionVehNueve, settraccionVehNueve] = useState([]);

    const [tipoVehDiez, setTipoVehDiez] = useState([]);
    const [marcaVehDiez, setMarcaVehDiez] = useState([]);
    const [annoVehDiez, setAnnoVehDiez] = useState([]);
    const [modeloVehDiez, setModeloVehDiez] = useState([]);
    const [carroceriaVehDiez, setCarroceriaVehDiez] = useState([]);
    const [cilindrajeVehDiez, setcilindrajeVehDiez] = useState([]);
    const [transmisionVehDiez, settransmisionVehDiez] = useState([]);
    const [combustibleVehDiez, setcombustibleVehDiez] = useState([]);
    const [traccionVehDiez, settraccionVehDiez] = useState([]);

    const [controlAccion, setControlAccion] = useState(0);
    const [generico, setGenerico] = useState("No");
    const [compatibilidad, setCompatibilidad] = useState(null);
    const [duplicar, setDuplicar] = useState(false);
    const [nuevoVehiculo, setNuevoVehiculo] = useState(false);

    const [showTraccion, setShowTraccion] = useState(false);
    const [showTransmision, setShowTransmision] = useState(false);
    const [showModalGenerico, setShowModalGenerico] = useState(false);
    const [showModalParaUnoVarios, setShowModalParaUnoVarios] = useState(false);

    const [listMarcasVehiculos, setListMarcasVehiculos] = useState([]);
    const [listCarroceriasVehiculos, setListCarroceriasVehiculos] = useState(
        []
    );

    const [listModelosVehiculos, setListModelosVehiculos] = useState([]);
    const [listCilindrajesVehiculos, setListCilindrajesVehiculos] = useState(
        []
    );

    const [vehiculoUnoCrear, setVehiculoUnoCrear] = useState(false);
    const [vehiculoUnoSelecc, setVehiculoUnoSelecc] = useState(false);
    const [vehiculoUnoEditar, setVehiculoUnoEditar] = useState(false);
    const [vehiculoUnoDuplicar, setVehiculoUnoDuplicar] = useState(false);
    const [vehiculoUnoUbicar, setVehiculoUnoUbicar] = useState(false);

    const [vehiculoDosCrear, setVehiculoDosCrear] = useState(false);
    const [vehiculoDosSelecc, setVehiculoDosSelecc] = useState(false);
    const [vehiculoDosEditar, setVehiculoDosEditar] = useState(false);
    const [vehiculoDosDuplicar, setVehiculoDosDuplicar] = useState(false);
    const [vehiculoDosUbicar, setVehiculoDosUbicar] = useState(false);

    const [vehiculoTresCrear, setVehiculoTresCrear] = useState(false);
    const [vehiculoTresSelecc, setVehiculoTresSelecc] = useState(false);
    const [vehiculoTresEditar, setVehiculoTresEditar] = useState(false);
    const [vehiculoTresDuplicar, setVehiculoTresDuplicar] = useState(false);
    const [vehiculoTresUbicar, setVehiculoTresUbicar] = useState(false);
    const [vehiculoTresNuevo, setVehiculoTresNuevo] = useState(false);

    const [vehiculoCuatroCrear, setVehiculoCuatroCrear] = useState(false);
    const [vehiculoCuatroSelecc, setVehiculoCuatroSelecc] = useState(false);
    const [vehiculoCuatroEditar, setVehiculoCuatroEditar] = useState(false);
    const [vehiculoCuatroDuplicar, setVehiculoCuatroDuplicar] = useState(false);
    const [vehiculoCuatroUbicar, setVehiculoCuatroUbicar] = useState(false);

    const [vehiculoCincoCrear, setVehiculoCincoCrear] = useState(false);
    const [vehiculoCincoSelecc, setVehiculoCincoSelecc] = useState(false);
    const [vehiculoCincoEditar, setVehiculoCincoEditar] = useState(false);
    const [vehiculoCincoDuplicar, setVehiculoCincoDuplicar] = useState(false);
    const [vehiculoCincoUbicar, setVehiculoCincoUbicar] = useState(false);

    const [vehiculoSeisCrear, setVehiculoSeisCrear] = useState(false);
    const [vehiculoSeisSelecc, setVehiculoSeisSelecc] = useState(false);
    const [vehiculoSeisEditar, setVehiculoSeisEditar] = useState(false);
    const [vehiculoSeisDuplicar, setVehiculoSeisDuplicar] = useState(false);
    const [vehiculoSeisUbicar, setVehiculoSeisUbicar] = useState(false);

    const [vehiculoSieteCrear, setVehiculoSieteCrear] = useState(false);
    const [vehiculoSieteSelecc, setVehiculoSieteSelecc] = useState(false);
    const [vehiculoSieteEditar, setVehiculoSieteEditar] = useState(false);
    const [vehiculoSieteDuplicar, setVehiculoSieteDuplicar] = useState(false);
    const [vehiculoSieteUbicar, setVehiculoSieteUbicar] = useState(false);

    const [vehiculoOchoCrear, setVehiculoOchoCrear] = useState(false);
    const [vehiculoOchoSelecc, setVehiculoOchoSelecc] = useState(false);
    const [vehiculoOchoEditar, setVehiculoOchoEditar] = useState(false);
    const [vehiculoOchoDuplicar, setVehiculoOchoDuplicar] = useState(false);
    const [vehiculoOchoUbicar, setVehiculoOchoUbicar] = useState(false);

    const [vehiculoNueveCrear, setVehiculoNueveCrear] = useState(false);
    const [vehiculoNueveSelecc, setVehiculoNueveSelecc] = useState(false);
    const [vehiculoNueveEditar, setVehiculoNueveEditar] = useState(false);
    const [vehiculoNueveDuplicar, setVehiculoNueveDuplicar] = useState(false);
    const [vehiculoNueveUbicar, setVehiculoNueveUbicar] = useState(false);

    const [vehiculoDiezCrear, setVehiculoDiezCrear] = useState(false);
    const [vehiculoDiezSelecc, setVehiculoDiezSelecc] = useState(false);
    const [vehiculoDiezEditar, setVehiculoDiezEditar] = useState(false);
    const [vehiculoDiezDuplicar, setVehiculoDiezDuplicar] = useState(false);
    const [vehiculoDiezUbicar, setVehiculoDiezUbicar] = useState(false);

    const [vehiculoUno, setVehiculoUno] = useState(false);
    const [vehiculoDos, setVehiculoDos] = useState(false);
    const [vehiculoTres, setVehiculoTres] = useState(false);
    const [vehiculoCuatro, setVehiculoCuatro] = useState(false);
    const [vehiculoCinco, setVehiculoCinco] = useState(false);
    const [vehiculoSeis, setVehiculoSeis] = useState(false);
    const [vehiculoSiete, setVehiculoSiete] = useState(false);
    const [vehiculoOcho, setVehiculoOcho] = useState(false);
    const [vehiculoNueve, setVehiculoNueve] = useState(false);
    const [vehiculoDiez, setVehiculoDiez] = useState(false);

    const [tipoVehSelec, setTipoVehSelec] = useState(0);
    const [botonCrearVehiculo, setbotonCrearVehiculo] = useState(false);

    const [seleccionoTipoVeh, setSeleccionoTipoVeh] = useState(false);
    const [seleccionoUbicacionProducto, setSeleccionoUbicacionProducto] =
        useState(false);
    const [SelecDatosProducto, setSelecDatosProducto] = useState(false);
    const [categoria, setCategoria] = useState(null);
    const [selecCategoria, setSelecCategoria] = useState("No");
    const [quantity, setQuantity] = useState(0);
    const [tituloInformacionProducto, setTituloInformacionProducto] = useState(
        "ml-15 mb-3 tituloadvertenciaproductosizquierda"
    );

    useEffect(() => {
        let tipo = 0;
        tipo = localStorage.getItem("tipovehiculo");

        if (tipo == '"1"') {
            setTipoVehSelec(1);
        } else if (tipo == '"2"') {
            setTipoVehSelec(2);
        } else if (tipo == '"3"') {
            setTipoVehSelec(3);
        } else if (tipo == '"4"') {
            setTipoVehSelec(4);
        } else if (tipo == '"5"') {
            setTipoVehSelec(5);
        } else if (tipo == '"6"') {
            setTipoVehSelec(6);
        } else {
            setTipoVehSelec(0);
        }
    }, [contador]);

    useEffect(() => {
        if (selecCategoria == "No" && contador == 0) {
            let dato = [];
            localStorage.setItem("informacionproducto", JSON.stringify(dato));
            localStorage.setItem(
                "datospublicacionproducto",
                JSON.stringify(dato)
            );
        }
    }, []);

    const productogenerico = [
        {
            label: "Seleccione tipo de producto",
            value: "",
        },
        {
            label: labelGenericoUno,
            value: genericoUno,
        },
        {
            label: labelGenericoDos,
            value: genericoDos,
        },
    ];

    // Inicializamos el arrego de Tipos de Vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    // Arreglo tipos de Marcas de Vehiculos

    // Arreglo años de los Vehiculos
    const [annos, setAnnos] = useState([]);

    const datoscrearproductosmodelos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    //console.log("MODELOS CREAR PRODUCTOS : ", datoscrearproductosmodelos);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    //console.log("CILINDRAJES CREAR PRODUCTOS : ", datoscrearproductoscilindrajes);

    useEffect(() => {
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcasVehiculos(
            JSON.parse(localStorage.getItem("datosmarcasvehiculos"))
        );
        setListCarroceriasVehiculos(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        //setListModelosVehiculos(JSON.parse(localStorage.getItem("datosmodelosVehiculos")));
        //setListCilindrajesVehiculos(JSON.parse(localStorage.getItem("datoscilindrajeVehiculos")));
        setListModelosVehiculos(datoscrearproductosmodelos);
        setListCilindrajesVehiculos(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        //setLoading(false)
    }, []);

    useEffect(() => {
        if (agregarDatos) {
            //alert(contador)
            //console.log("DUPLICAR: ", duplicar);
            let activo = false;
            if (
                !vehiculoUnoCrear &&
                //!vehiculoUnoDuplicar &&
                !vehiculoUnoEditar &&
                !vehiculoDosCrear &&
                //!vehiculoDosDuplicar &&
                !vehiculoDosEditar &&
                !vehiculoTresCrear &&
                //!vehiculoTresDuplicar &&
                !vehiculoTresEditar &&
                !vehiculoCuatroCrear &&
                //!vehiculoCuatroDuplicar &&
                !vehiculoCuatroEditar &&
                !vehiculoCincoCrear &&
                //!vehiculoCincoDuplicar &&
                !vehiculoCincoEditar &&
                !vehiculoSeisCrear &&
                //!vehiculoSeisDuplicar &&
                !vehiculoSeisEditar &&
                !vehiculoSieteCrear &&
                //!vehiculoSieteDuplicar &&
                !vehiculoSieteEditar &&
                !vehiculoOchoCrear &&
                //!vehiculoOchoDuplicar &&
                !vehiculoOchoEditar &&
                !vehiculoNueveCrear &&
                //!vehiculoNueveDuplicar &&
                !vehiculoNueveEditar &&
                !vehiculoDiezCrear &&
                //!vehiculoDiezDuplicar &&
                !vehiculoDiezEditar &&
                !duplicar
            ) {
                let count = 1;
                setControlAccion(count);
            } else if (controlAccion > 1) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, solo una acción a la vez, crear, editar o duplicar vehículo! XXX"
                );
                setAgregarDatos(false);
                return;
            }
            //console.log("VALOR CONTADOR: ", contador);

            const newDet = [];
            let dato;
            let item = {};
            let borro = false;

            if (contador === 1) {
                dato = {
                    id: 0,
                    valor:
                        "" +
                        tipoVehUno +
                        marcaVehUno +
                        annoVehUno +
                        modeloVehUno +
                        carroceriaVehUno +
                        cilindrajeVehUno +
                        transmisionVehUno +
                        combustibleVehUno +
                        traccionVehUno,
                };

                item = {
                    dato,
                };
                newDet.push(item);
            } else if (contador === 2) {
                for (var i = 0; i < 2; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 3) {
                for (var i = 0; i < 3; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 4) {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 5) {
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 6) {
                for (var i = 0; i < 6; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 7) {
                for (var i = 0; i < 7; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 8) {
                for (var i = 0; i < 8; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 9) {
                for (var i = 0; i < 9; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }
                    if (i == 8) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehNueve +
                                marcaVehNueve +
                                annoVehNueve +
                                modeloVehNueve +
                                carroceriaVehNueve +
                                cilindrajeVehNueve +
                                transmisionVehNueve +
                                combustibleVehNueve +
                                traccionVehNueve,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 10) {
                for (var i = 0; i < 10; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }
                    if (i == 8) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehNueve +
                                marcaVehNueve +
                                annoVehNueve +
                                modeloVehNueve +
                                carroceriaVehNueve +
                                cilindrajeVehNueve +
                                transmisionVehNueve +
                                combustibleVehNueve +
                                traccionVehNueve,
                        };
                    }
                    if (i == 9) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDiez +
                                marcaVehDiez +
                                annoVehDiez +
                                modeloVehDiez +
                                carroceriaVehDiez +
                                cilindrajeVehDiez +
                                transmisionVehDiez +
                                combustibleVehDiez +
                                traccionVehDiez,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            }

            setVehiculosSeleccionados(newDet);
            let longitud = vehiculosSeleccionados.length;

            let agregaItem = false;

            newDet &&
                newDet.map((item) => {
                    if (item.dato.valor == "000000000") {
                        if (!agregaItem) {
                            borro = true;
                            agregaItem = true;

                            if (agregarDatos) {
                                setVehiculoBorrar(true);
                            }

                            if (item.dato.id === 0) {
                                if (!duplicar) setVehiculoUnoCrear(true);
                                else setVehiculoUnoDuplicar(true);
                                setVehiculoUno(true);
                                //newDetUno.push(itemUno);
                            } else if (item.dato.id === 1) {
                                if (!duplicar) setVehiculoDosCrear(true);
                                else setVehiculoDosDuplicar(true);
                                setVehiculoDos(true);
                            } else if (item.dato.id === 2) {
                                if (!duplicar) setVehiculoTresCrear(true);
                                else setVehiculoTresDuplicar(true);
                                setVehiculoTres(true);
                            } else if (item.dato.id === 3) {
                                if (!duplicar) setVehiculoCuatroCrear(true);
                                else setVehiculoCuatroDuplicar(true);
                                setVehiculoCuatro(true);
                            } else if (item.dato.id === 4) {
                                if (!duplicar) setVehiculoCincoCrear(true);
                                else setVehiculoCincoDuplicar(true);
                                setVehiculoCinco(true);
                            } else if (item.dato.id === 5) {
                                if (!duplicar) setVehiculoSeisCrear(true);
                                else setVehiculoSeisDuplicar(true);
                                setVehiculoSeis(true);
                            } else if (item.dato.id === 6) {
                                if (!duplicar) setVehiculoSieteCrear(true);
                                else setVehiculoSieteDuplicar(true);
                                setVehiculoSiete(true);
                            } else if (item.dato.id === 7) {
                                if (!duplicar) setVehiculoOchoCrear(true);
                                else setVehiculoOchoDuplicar(true);
                                setVehiculoOcho(true);
                            } else if (item.dato.id === 8) {
                                if (!duplicar) setVehiculoNueveCrear(true);
                                else setVehiculoNueveDuplicar(true);
                                setVehiculoNueve(true);
                            } else if (item.dato.id === 9) {
                                if (!duplicar) setVehiculoDiezCrear(true);
                                else setVehiculoDiezDuplicar(true);
                                setVehiculoDiez(true);
                            }
                        }
                    }
                });

            if (!borro) {
                let control = contador + 1;

                if (control === 11) {
                    setShowModalMensajes(true);
                    setTituloMensajes("Información del producto");
                    setTextoMensajes(
                        "Número de vehículos no puede ser mayor a 10!"
                    );
                    setAgregarDatos(false);
                    setDuplicar(false);
                    setControlAgregarVehiculo(false);
                    return;
                }

                setContador(control);

                if (control === 1) {
                    setVehiculoUnoCrear(true);
                    setVehiculoUno(true);
                    //newDetUno.push(itemUno);
                } else if (control === 2) {
                    if (duplicar) {
                        setVehiculoDosDuplicar(true);
                    } else {
                        setVehiculoDosCrear(true);
                    }
                    setVehiculoDos(true);
                } else if (control === 3) {
                    if (duplicar) {
                        setVehiculoTresDuplicar(true);
                    } else {
                        setVehiculoTresCrear(true);
                    }
                    setVehiculoTres(true);
                } else if (control === 4) {
                    if (duplicar) {
                        setVehiculoCuatroDuplicar(true);
                    } else {
                        setVehiculoCuatroCrear(true);
                    }
                    setVehiculoCuatro(true);
                } else if (control === 5) {
                    if (duplicar) {
                        setVehiculoCincoDuplicar(true);
                    } else {
                        setVehiculoCincoCrear(true);
                    }
                    setVehiculoCinco(true);
                } else if (control === 6) {
                    if (duplicar) {
                        setVehiculoSeisDuplicar(true);
                    } else {
                        setVehiculoSeisCrear(true);
                    }
                    setVehiculoSeis(true);
                } else if (control === 7) {
                    if (duplicar) {
                        setVehiculoSieteDuplicar(true);
                    } else {
                        setVehiculoSieteCrear(true);
                    }
                    setVehiculoSiete(true);
                } else if (control === 8) {
                    if (duplicar) {
                        setVehiculoOchoDuplicar(true);
                    } else {
                        setVehiculoOchoCrear(true);
                    }
                    setVehiculoOcho(true);
                } else if (control === 9) {
                    if (duplicar) {
                        setVehiculoNueveDuplicar(true);
                    } else {
                        setVehiculoNueveCrear(true);
                    }
                    setVehiculoNueve(true);
                } else if (control === 10) {
                    if (duplicar) {
                        setVehiculoDiezDuplicar(true);
                    } else {
                        setVehiculoDiezCrear(true);
                    }
                    setVehiculoDiez(true);
                }
            }
            //console.log("VALOR NEW DET : ", newDet);
            setAgregarDatos(false);
            setControlAgregarVehiculo(false);
        }
    }, [agregarDatos]);

    useEffect(() => {
        if (eliminoDatos) {
            //console.log("VALOR ELIMINO: ", contador);

            const newDet = [];
            let dato;
            let item = {};
            let borro = false;

            if (contador === 1) {
                dato = {
                    id: 0,
                    valor:
                        "" +
                        tipoVehUno +
                        marcaVehUno +
                        annoVehUno +
                        modeloVehUno +
                        carroceriaVehUno +
                        cilindrajeVehUno +
                        transmisionVehUno +
                        combustibleVehUno +
                        traccionVehUno,
                };

                item = {
                    dato,
                };
                newDet.push(item);
            } else if (contador === 2) {
                for (var i = 0; i < 2; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 3) {
                for (var i = 0; i < 3; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 4) {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 5) {
                for (var i = 0; i < 5; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 6) {
                for (var i = 0; i < 6; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 7) {
                for (var i = 0; i < 7; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 8) {
                for (var i = 0; i < 8; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 9) {
                for (var i = 0; i < 9; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }
                    if (i == 8) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehNueve +
                                marcaVehNueve +
                                annoVehNueve +
                                modeloVehNueve +
                                carroceriaVehNueve +
                                cilindrajeVehNueve +
                                transmisionVehNueve +
                                combustibleVehNueve +
                                traccionVehNueve,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            } else if (contador === 10) {
                for (var i = 0; i < 11; i++) {
                    if (i == 0) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehUno +
                                marcaVehUno +
                                annoVehUno +
                                modeloVehUno +
                                carroceriaVehUno +
                                cilindrajeVehUno +
                                transmisionVehUno +
                                combustibleVehUno +
                                traccionVehUno,
                        };
                    }
                    if (i == 1) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDos +
                                marcaVehDos +
                                annoVehDos +
                                modeloVehDos +
                                carroceriaVehDos +
                                cilindrajeVehDos +
                                transmisionVehDos +
                                combustibleVehDos +
                                traccionVehDos,
                        };
                    }
                    if (i == 2) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehTres +
                                marcaVehTres +
                                annoVehTres +
                                modeloVehTres +
                                carroceriaVehTres +
                                cilindrajeVehTres +
                                transmisionVehTres +
                                combustibleVehTres +
                                traccionVehTres,
                        };
                    }
                    if (i == 3) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCuatro +
                                marcaVehCuatro +
                                annoVehCuatro +
                                modeloVehCuatro +
                                carroceriaVehCuatro +
                                cilindrajeVehCuatro +
                                transmisionVehCuatro +
                                combustibleVehCuatro +
                                traccionVehCuatro,
                        };
                    }
                    if (i == 4) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehCinco +
                                marcaVehCinco +
                                annoVehCinco +
                                modeloVehCinco +
                                carroceriaVehCinco +
                                cilindrajeVehCinco +
                                transmisionVehCinco +
                                combustibleVehCinco +
                                traccionVehCinco,
                        };
                    }
                    if (i == 5) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSeis +
                                marcaVehSeis +
                                annoVehSeis +
                                modeloVehSeis +
                                carroceriaVehSeis +
                                cilindrajeVehSeis +
                                transmisionVehSeis +
                                combustibleVehSeis +
                                traccionVehSeis,
                        };
                    }
                    if (i == 6) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehSiete +
                                marcaVehSiete +
                                annoVehSiete +
                                modeloVehSiete +
                                carroceriaVehSiete +
                                cilindrajeVehSiete +
                                transmisionVehSiete +
                                combustibleVehSiete +
                                traccionVehSiete,
                        };
                    }
                    if (i == 7) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehOcho +
                                marcaVehOcho +
                                annoVehOcho +
                                modeloVehOcho +
                                carroceriaVehOcho +
                                cilindrajeVehOcho +
                                transmisionVehOcho +
                                combustibleVehOcho +
                                traccionVehOcho,
                        };
                    }
                    if (i == 8) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehNueve +
                                marcaVehNueve +
                                annoVehNueve +
                                modeloVehNueve +
                                carroceriaVehNueve +
                                cilindrajeVehNueve +
                                transmisionVehNueve +
                                combustibleVehNueve +
                                traccionVehNueve,
                        };
                    }
                    if (i == 9) {
                        dato = {
                            id: i,
                            valor:
                                "" +
                                tipoVehDiez +
                                marcaVehDiez +
                                annoVehDiez +
                                modeloVehDiez +
                                carroceriaVehDiez +
                                cilindrajeVehDiez +
                                transmisionVehDiez +
                                combustibleVehDiez +
                                traccionVehDiez,
                        };
                    }

                    item = {
                        dato,
                    };
                    newDet.push(item);
                }
            }

            //console.log("DATOS ELIMINO : ", newDet);
            setVehiculosSeleccionados(newDet);

            setEliminoDatos(false);
        }
    }, [eliminoDatos]);

    const datosCrearProducto = () => {
        gregarDatos;
        //console.log("CONTADOR : ", contador);
        let nombre = " Un ";
    };

    const habilitarBotonTipo = () => {
        if (contador > 0 || selecCategoria == "Si") location.reload();
        //agregarDatosGenerico();
        else {
            setbotonCrearVehiculo(true);
            setSelecCategoria("No");
            handleChangeGenerico("No");
            setShowDatosProductos(false);
        }
    };

    const handleChangeGenerico = (selectedOptions) => {
        setAbrirCerrarCategoriasGenerico(true);
        if (selectedOptions == "No") {
            setCompatibilidad(2);
        } else if (selectedOptions == "Si") {
            setCompatibilidad(1);
        }

        if (selectedOptions === "Si") {
            setAgregarDatos(false);
            setNuevoVehiculo(false);
            setAgregarVehiculo(false);
            setSelecCategoria("Si");
            const newDetUno = [];
            const newDetDos = [];
            let itemUno = {
                tipoVehUno: 0,
                marcaVehUno: 0,
                annoVehUno: 0,
                modeloVehUno: 0,
                cilindrajeVehUno: 0,
                carroceriaVehUno: 0,
                transmisionVehUno: 0,
                combustibleVehUno: 0,
                traccionVehUno: 0,
            };
            newDetUno.push(itemUno);

            localStorage.setItem(
                "vehiculoscompatibles",
                JSON.stringify(newDetUno)
            );

            let itemDos = {
                ubicacionProducto: 0,
                posicionProducto: 0,
            };
            newDetDos.push(itemDos);
            //setSistemaMotorSeleccionado(1);
            localStorage.setItem(
                "ubicacionposicionproducto",
                JSON.stringify(newDetDos)
            );
        }

        let control = contador + 1;
        if (control === 1) {
            setContador(control);

            if (control === 1) {
                setVehiculoUnoCrear(true);
                setVehiculoUno(true);
            }
        }
        setGenerico(selectedOptions);
        setMostrarDatosVehiculos(true);
    };

    const agregarDatosVehiculos = () => {
        setDuplicar(false);
        let count = controlAccion + 1;
        setControlAccion(count);
        setAgregarDatos(true);

        if (vehiculoBorrar) setVehiculoBorrar(false);
        else setVehiculoBorrar(false);
    };

    const crearVehiculos = () => {
        alert(controlAccion)
        let count = controlAccion + 1;
        setControlAccion(count);
       
        if (count > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo! YYY"
            );
            return
        } else if(botonCrearVehiculo ){
            setNuevoVehiculo(true);
        } else {
            setAgregarDatos(true);
            setNuevoVehiculo(true);
        }
    };

    const agregarDatosLatoneria = () => {
        /*alert(vehiculoCincoCrear)
        alert(vehiculoCincoDuplicar)
        alert(vehiculoCincoEditar)
        alert(duplicar)*/
        if (
            vehiculoUnoCrear ||
            //vehiculoUnoDuplicar ||
            vehiculoUnoEditar ||
            vehiculoDosCrear ||
            //vehiculoDosDuplicar ||
            vehiculoDosEditar ||
            vehiculoTresCrear ||
            //vehiculoTresDuplicar ||
            vehiculoTresEditar ||
            vehiculoCuatroCrear ||
            //vehiculoCuatroDuplicar ||
            vehiculoCuatroEditar ||
            vehiculoCincoCrear ||
            //vehiculoCincoDuplicar ||
            vehiculoCincoEditar ||
            vehiculoSeisCrear ||
            //vehiculoSeisDuplicar ||
            vehiculoSeisEditar ||
            vehiculoSieteCrear ||
            //vehiculoSieteDuplicar ||
            vehiculoSieteEditar ||
            vehiculoOchoCrear ||
            //vehiculoOchoDuplicar ||
            vehiculoOchoEditar ||
            vehiculoNueveCrear ||
            //vehiculoNueveDuplicar ||
            vehiculoNueveEditar ||
            vehiculoDiezCrear ||
            //vehiculoDiezDuplicar ||
            vehiculoDiezEditar ||
            duplicar
        ) {
            setShowModalMensajes(true);
            setTituloMensajes("Vehículos compatibles");
            setTextoMensajes(
                "Para continuar debes cerrar todos los formularios de vehículos compatibles."
            );
            return;
        }
        setShowIconoCerrarAbrir(true);
        setAgregarVehiculo(false);
        setbotonCrearVehiculo(false);

        //setCerrarDatos("");
        setCerrarDatosDos("mt-1 datoscerrados");
        setIconCerrarUno("showcerrarabrir");
        setIconCerrarDos("form-control ps-form__input ml-20");
        setGenericoUno("Si");
        setLabelGenericoUno("Es genérico, sirve para varios vehículos.");
        setGenericoDos("No");
        setLabelGenericoDos("No es genérico, sirve para varios vehículos.");
        setBotonGenerico("ml-15 botongenericodos");
        setMostrar(true);

        setShowModalLatoneria(true);
        setShowModalLatoneriaActiva(true);

        if (vehiculoUnoSelecc) {
            setVehiculoUnoCrear(false);
            setVehiculoUnoSelecc(false);
            setVehiculoUnoEditar(false);
            setVehiculoUnoDuplicar(false);
            setVehiculoUnoUbicar(true);
        }

        if (vehiculoDosSelecc) {
            setVehiculoDosCrear(false);
            setVehiculoDosSelecc(false);
            setVehiculoDosEditar(false);
            setVehiculoDosDuplicar(false);
            setVehiculoDosUbicar(true);
        }

        if (vehiculoTresSelecc) {
            setVehiculoTresCrear(false);
            setVehiculoTresSelecc(false);
            setVehiculoTresEditar(false);
            setVehiculoTresDuplicar(false);
            setVehiculoTresUbicar(true);
        }

        if (vehiculoCuatroSelecc) {
            setVehiculoCuatroCrear(false);
            setVehiculoCuatroSelecc(false);
            setVehiculoCuatroEditar(false);
            setVehiculoCuatroDuplicar(false);
            setVehiculoCuatroUbicar(true);
        }

        if (vehiculoCincoSelecc) {
            setVehiculoCincoCrear(false);
            setVehiculoCincoSelecc(false);
            setVehiculoCincoEditar(false);
            setVehiculoCincoDuplicar(false);
            setVehiculoCincoUbicar(true);
        }

        if (vehiculoSeisSelecc) {
            setVehiculoSeisCrear(false);
            setVehiculoSeisSelecc(false);
            setVehiculoSeisEditar(false);
            setVehiculoSeisDuplicar(false);
            setVehiculoSeisUbicar(true);
        }

        if (vehiculoSieteSelecc) {
            setVehiculoSieteCrear(false);
            setVehiculoSieteSelecc(false);
            setVehiculoSieteEditar(false);
            setVehiculoSieteDuplicar(false);
            setVehiculoSieteUbicar(true);
        }

        if (vehiculoOchoSelecc) {
            setVehiculoOchoCrear(false);
            setVehiculoOchoSelecc(false);
            setVehiculoOchoEditar(false);
            setVehiculoOchoDuplicar(false);
            setVehiculoOchoUbicar(true);
        }

        if (vehiculoNueveSelecc) {
            setVehiculoNueveCrear(false);
            setVehiculoNueveSelecc(false);
            setVehiculoNueveEditar(false);
            setVehiculoNueveDuplicar(false);
            setVehiculoNueveUbicar(true);
        }

        if (vehiculoDiezSelecc) {
            setVehiculoDiezCrear(false);
            setVehiculoDiezSelecc(false);
            setVehiculoDiezEditar(false);
            setVehiculoDiezDuplicar(false);
            setVehiculoDiezUbicar(true);
        }

        const newDet = [];
        if (vehiculoUno) {
            let item = {
                tipoVehUno: tipoVehUno,
                marcaVehUno: marcaVehUno,
                annoVehUno: annoVehUno,
                modeloVehUno: modeloVehUno,
                cilindrajeVehUno: cilindrajeVehUno,
                carroceriaVehUno: carroceriaVehUno,
                transmisionVehUno: transmisionVehUno,
                combustibleVehUno: combustibleVehUno,
                traccionVehUno: traccionVehUno,
            };
            newDet.push(item);
        }

        if (vehiculoDos) {
            let item = {
                tipoVehDos: tipoVehDos,
                marcaVehDos: marcaVehDos,
                annoVehDos: annoVehDos,
                modeloVehDos: modeloVehDos,
                cilindrajeVehDos: cilindrajeVehDos,
                carroceriaVehDos: carroceriaVehDos,
                transmisionVehDos: transmisionVehDos,
                combustibleVehDos: combustibleVehDos,
                traccionVehDos: traccionVehDos,
            };
            newDet.push(item);
        }

        if (vehiculoTres) {
            let item = {
                tipoVehTres: tipoVehTres,
                marcaVehTres: marcaVehTres,
                annoVehTres: annoVehTres,
                modeloVehTres: modeloVehTres,
                cilindrajeVehTres: cilindrajeVehTres,
                carroceriaVehTres: carroceriaVehTres,
                transmisionVehTres: transmisionVehTres,
                combustibleVehTres: combustibleVehTres,
                traccionVehTres: traccionVehTres,
            };
            newDet.push(item);
        }

        if (vehiculoCuatro) {
            let item = {
                tipoVehCuatro: tipoVehCuatro,
                marcaVehCuatro: marcaVehCuatro,
                annoVehCuatro: annoVehCuatro,
                modeloVehCuatro: modeloVehCuatro,
                cilindrajeVehCuatro: cilindrajeVehCuatro,
                carroceriaVehCuatro: carroceriaVehCuatro,
                transmisionVehCuatro: transmisionVehCuatro,
                combustibleVehCuatro: combustibleVehCuatro,
                traccionVehCuatro: traccionVehCuatro,
            };
            newDet.push(item);
        }

        if (vehiculoCinco) {
            let item = {
                tipoVehCinco: tipoVehCinco,
                marcaVehCinco: marcaVehCinco,
                annoVehCinco: annoVehCinco,
                modeloVehCinco: modeloVehCinco,
                cilindrajeVehCinco: cilindrajeVehCinco,
                carroceriaVehCinco: carroceriaVehCinco,
                transmisionVehCinco: transmisionVehCinco,
                combustibleVehCinco: combustibleVehCinco,
                traccionVehCinco: traccionVehCinco,
            };
            newDet.push(item);
        }

        if (vehiculoSeis) {
            let item = {
                tipoVehSeis: tipoVehSeis,
                marcaVehSeis: marcaVehSeis,
                annoVehSeis: annoVehSeis,
                modeloVehSeis: modeloVehSeis,
                cilindrajeVehSeis: cilindrajeVehSeis,
                carroceriaVehSeis: carroceriaVehSeis,
                transmisionVehSeis: transmisionVehSeis,
                combustibleVehSeis: combustibleVehSeis,
                traccionVehSeis: traccionVehSeis,
            };
            newDet.push(item);
        }

        if (vehiculoSiete) {
            let item = {
                tipoVehSiete: tipoVehSiete,
                marcaVehSiete: marcaVehSiete,
                annoVehSiete: annoVehSiete,
                modeloVehSiete: modeloVehSiete,
                cilindrajeVehSiete: cilindrajeVehSiete,
                carroceriaVehSiete: carroceriaVehSiete,
                transmisionVehSiete: transmisionVehSiete,
                combustibleVehSiete: combustibleVehSiete,
                traccionVehSiete: traccionVehSiete,
            };
            newDet.push(item);
        }

        if (vehiculoOcho) {
            let item = {
                tipoVehOcho: tipoVehOcho,
                marcaVehOcho: marcaVehOcho,
                annoVehOcho: annoVehOcho,
                modeloVehOcho: modeloVehOcho,
                cilindrajeVehOcho: cilindrajeVehOcho,
                carroceriaVehOcho: carroceriaVehOcho,
                transmisionVehOcho: transmisionVehOcho,
                combustibleVehOcho: combustibleVehOcho,
                traccionVehOcho: traccionVehOcho,
            };
            newDet.push(item);
        }

        if (vehiculoNueve) {
            let item = {
                tipoVehNueve: tipoVehNueve,
                marcaVehNueve: marcaVehNueve,
                annoVehNueve: annoVehNueve,
                modeloVehNueve: modeloVehNueve,
                cilindrajeVehNueve: cilindrajeVehNueve,
                carroceriaVehNueve: carroceriaVehNueve,
                transmisionVehNueve: transmisionVehNueve,
                combustibleVehNueve: combustibleVehNueve,
                traccionVehNueve: traccionVehNueve,
            };
            newDet.push(item);
        }

        if (vehiculoDiez) {
            let item = {
                tipoVehDiez: tipoVehDiez,
                marcaVehDiez: marcaVehDiez,
                annoVehDiez: annoVehDiez,
                modeloVehDiez: modeloVehDiez,
                cilindrajeVehDiez: cilindrajeVehDiez,
                carroceriaVehDiez: carroceriaVehDiez,
                transmisionVehDiez: transmisionVehDiez,
                combustibleVehDiez: combustibleVehDiez,
                traccionVehDiez: traccionVehDiez,
            };
            newDet.push(item);
        }

        localStorage.setItem("vehiculoscompatibles", JSON.stringify(newDet));
    };

    const agregarDatosGenerico = () => {
        setGenerico("No");
        setVehiculoUno(false);
        setContador(0);
        setCompatibilidad(null);
        setAgregarVehiculo(false);
        setShowModalLatoneria(false);
        setShowModalLatoneriaActiva(false);
    };

    const mostrarVehiculos = () => {
        setAgregarVehiculo(true);
        setShowIconoCerrarAbrir(false);
        setShowModalLatoneria(true);

        setCerrarDatos(
            "ps-form__group cajavehiculoscompatiblesproducto colorbase"
        );
        setCerrarDatosDos(
            "custom-selectcreateproducto redondearbordegenerico colorbase"
        );

        setIconCerrarUno(
            "form-control ps-form__input textoeditardatosvehiculo colorbase"
        );
        setIconCerrarDos("form-control ps-form__input");

        setGenericoUno("Si");
        setLabelGenericoUno(
            "Si - Es compatible con diferentes marcas y modelos del vehículos."
        );
        setGenericoDos("No");
        setLabelGenericoDos(
            "No - NO es compatible con varias marcas y modelos de vehículos."
        );

        setBotonGenerico("botongenerico");

        setMostrar(false);

        let borrouno = false;
        let borrodos = false;
        let borrotres = false;
        let borrocuatro = false;
        let borrocinco = false;
        let borroseis = false;
        let borrosiete = false;
        let borroocho = false;
        let borronueve = false;
        let borrodiez = false;
        /*
        setVehiculoUnoSelecc(false);
        setVehiculoDosSelecc(false);
        setVehiculoTresSelecc(false);
        setVehiculoCuatroSelecc(false);
        setVehiculoCuatroSelecc(false);
        setVehiculoCincoSelecc(false);
        setVehiculoSeisSelecc(false);
        setVehiculoSieteSelecc(false);
        setVehiculoOchoSelecc(false);
        setVehiculoNueveSelecc(false);
        setVehiculoDiezSelecc(false);
       */
        let datos = JSON.parse(localStorage.getItem("vehiculoscompatibles"));
        let longitud = datos.length;

        datos &&
            datos.map((item) => {
                if (longitud > 0)
                    if (item.tipoVehUno == 0) {
                        borrouno = true;
                    }
                if (longitud > 1)
                    if (item.tipoVehDos == 0) {
                        borrodos = true;
                    }
                if (longitud > 2)
                    if (item.tipoVehTres == 0) {
                        borrotres = true;
                    }
                if (longitud > 3)
                    if (item.tipoVehCuatro == 0) {
                        borrocuatro = true;
                    }
                if (longitud > 4)
                    if (item.tipoVehCinco == 0) {
                        borrocinco = true;
                    }
                if (longitud > 5)
                    if (item.tipoVehSeis == 0) {
                        borroseis = true;
                    }
                if (longitud > 6)
                    if (item.tipoVehSiete == 0) {
                        borrosiete = true;
                    }
                if (longitud > 7)
                    if (item.tipoVehOcho == 0) {
                        borroocho = true;
                    }
                if (longitud > 8)
                    if (item.tipoVehNueve == 0) {
                        borronueve = true;
                    }
                if (longitud > 9)
                    if (item.tipoVehDiez == 0) {
                        borrodiez = true;
                    }
            });

        if (vehiculoUnoUbicar && !borrouno) {
            setVehiculoUnoSelecc(true);
            setVehiculoUnoUbicar(false);
        }

        if (vehiculoDosUbicar && !borrodos) {
            setVehiculoDosSelecc(true);
            setVehiculoDosUbicar(false);
        }

        if (vehiculoTresUbicar && !borrotres) {
            setVehiculoTresSelecc(true);
            setVehiculoTresUbicar(false);
        }

        if (vehiculoCuatroUbicar && !borrocuatro) {
            setVehiculoCuatroSelecc(true);
            setVehiculoCuatroUbicar(false);
        }

        if (vehiculoCincoUbicar && !borrocinco) {
            setVehiculoCincoSelecc(true);
            setVehiculoCincoUbicar(false);
        }

        if (vehiculoSeisUbicar && !borroseis) {
            setVehiculoSeisSelecc(true);
            setVehiculoSeisUbicar(false);
        }

        if (vehiculoSieteUbicar && !borrosiete) {
            setVehiculoSieteSelecc(true);
            setVehiculoSieteUbicar(false);
        }

        if (vehiculoOchoUbicar && !borroocho) {
            setVehiculoOchoSelecc(true);
            setVehiculoOchoUbicar(false);
        }

        if (vehiculoNueveUbicar && !borronueve) {
            setVehiculoNueveSelecc(true);
            setVehiculoNueveUbicar(false);
        }

        if (vehiculoDiezUbicar && !borrodiez) {
            setVehiculoDiezSelecc(true);
            setVehiculoDiezUbicar(false);
        }
    };

    const ingresarDatosProductos = () => {
        setShowDatosProductos(true);
        setSelecDatosProducto(true);
        setShowModalDatosProducto(true);
    };

    //setMostrarDatosMotor(true);
    return (
        <Container title="Mi Cuenta">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <div className="tamañospinner">{loading ? <Loading /> : null}</div>
            {/* <div className="ps-page ps-page--inner ml-250">  */}
            <div className="mt-40">
                <div className="container">
                    <Row className="mt-5">
                        <Col xl={2} lg={2} md={2} xs={2}>
                            <h2 className="ps-form__title">Crear Producto</h2>
                        </Col>

                        <Col xl={9} lg={9} md={9} xs={9}>
                            <div className="cajaadvertenciavehiculoscompatiblesproducto">
                                <i
                                    class="ml-700 fa tamañoiconoadvertencia fa-exclamation-triangle"
                                    aria-hidden="true"></i>
                                <h3 className="ml-2 tituloadvertenciaproductos mtmenos30">
                                    Antes de empezar, debes saber que!
                                </h3>

                                <br />
                                <h3 className="ml-2 textoadvertenciaproductos">
                                    Para poder publicar un producto debes:
                                    <br />
                                    Agregar al menos una foto.
                                    <br />
                                    Completar tus datos personales. *Si eres
                                    persona jurídica debes subir los documentos
                                    requeridos (Certificado de Cámara de
                                    comercio, RUT, Cedula de ciudadanía
                                    Representante legal).
                                </h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="ps-page__header"></div>
                    <div className={pageAcount}>
                        <div className="row">
                            <div className={tamaño}>
                                <form>
                                    <div className="ps-form--review">
                                        {showCreateProduct ? (
                                            <div>
                                                <div className={cerrarDatos}>
                                                    {generico === "No" ? (
                                                        <div className="ml-14">
                                                            <br />
                                                            <br />
                                                            <h3 className="tituloadvertenciaproductos mtmenos30">
                                                                Identificación
                                                                de los vehículos
                                                                compatibles
                                                            </h3>
                                                            <br />
                                                            <h3 className="tamañotextotoken">
                                                                ¿Su producto es
                                                                genérico?
                                                            </h3>
                                                            <Row>
                                                                {!compatibilidad ||
                                                                compatibilidad ==
                                                                    1 ? (
                                                                    <Row>
                                                                        <div>
                                                                            <Col
                                                                                xl={
                                                                                    10
                                                                                }
                                                                                lg={
                                                                                    10
                                                                                }
                                                                                md={
                                                                                    10
                                                                                }
                                                                                xs={
                                                                                    10
                                                                                }>
                                                                                <div
                                                                                    disabled={
                                                                                        mostrar
                                                                                    }
                                                                                    className="botongenerico"
                                                                                    variant="outline-light"
                                                                                    onClick={() =>
                                                                                        handleChangeGenerico(
                                                                                            "Si"
                                                                                        )
                                                                                    }>
                                                                                    {
                                                                                        labelGenericoUno
                                                                                    }
                                                                                </div>
                                                                            </Col>
                                                                        </div>

                                                                        {showIconoCerrarAbrir ? (
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }
                                                                                className="mlmenos80">
                                                                                <div
                                                                                    className={
                                                                                        iconoCerrarUno
                                                                                    }>
                                                                                    <i
                                                                                        onClick={() =>
                                                                                            mostrarVehiculos()
                                                                                        }
                                                                                        class="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                        aria-hidden="true"
                                                                                        ref={
                                                                                            targetshow
                                                                                        }
                                                                                        onMouseOver={() =>
                                                                                            setShowEdit(
                                                                                                true
                                                                                            )
                                                                                        }
                                                                                        onMouseOut={() =>
                                                                                            setShowEdit(
                                                                                                false
                                                                                            )
                                                                                        }></i>
                                                                                </div>
                                                                            </Col>
                                                                        ) : (
                                                                            <div className="mlmenos42">
                                                                                <Col
                                                                                    xl={
                                                                                        1
                                                                                    }
                                                                                    lg={
                                                                                        1
                                                                                    }
                                                                                    md={
                                                                                        1
                                                                                    }
                                                                                    xs={
                                                                                        1
                                                                                    }>
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </Col>
                                                                            </div>
                                                                        )}
                                                                    </Row>
                                                                ) : null}

                                                                {!compatibilidad ||
                                                                compatibilidad ==
                                                                    2 ? (
                                                                    <div>
                                                                        <Row>
                                                                            <Col
                                                                                xl={
                                                                                    10
                                                                                }
                                                                                lg={
                                                                                    10
                                                                                }
                                                                                md={
                                                                                    10
                                                                                }
                                                                                xs={
                                                                                    10
                                                                                }>
                                                                                <div
                                                                                    disabled={
                                                                                        mostrar
                                                                                    }
                                                                                    className={
                                                                                        botonGenerico
                                                                                    }
                                                                                    variant="outline-light"
                                                                                    onClick={() =>
                                                                                        habilitarBotonTipo()
                                                                                    }>
                                                                                    {
                                                                                        labelGenericoDos
                                                                                    }
                                                                                </div>
                                                                            </Col>

                                                                            {showIconoCerrarAbrir ? (
                                                                                <Col
                                                                                    xl={
                                                                                        1
                                                                                    }
                                                                                    lg={
                                                                                        1
                                                                                    }
                                                                                    md={
                                                                                        1
                                                                                    }
                                                                                    xs={
                                                                                        1
                                                                                    }
                                                                                    className="mt-6 mlmenos78">
                                                                                    <div
                                                                                        className={
                                                                                            iconoCerrarUno
                                                                                        }>
                                                                                        <i
                                                                                            onClick={() =>
                                                                                                mostrarVehiculos()
                                                                                            }
                                                                                            class="colortextoselect mt-1 fa fa-angle-down d-flex justify-content-center"
                                                                                            aria-hidden="true"
                                                                                            ref={
                                                                                                targetshow
                                                                                            }
                                                                                            onMouseOver={() =>
                                                                                                setShowEdit(
                                                                                                    true
                                                                                                )
                                                                                            }
                                                                                            onMouseOut={() =>
                                                                                                setShowEdit(
                                                                                                    false
                                                                                                )
                                                                                            }></i>
                                                                                    </div>
                                                                                    <Overlay
                                                                                        className=""
                                                                                        target={
                                                                                            targetshow.current
                                                                                        }
                                                                                        show={
                                                                                            showEdit
                                                                                        }
                                                                                        placement="top">
                                                                                        {(
                                                                                            props
                                                                                        ) => (
                                                                                            <Tooltip
                                                                                                id="overlay-example"
                                                                                                {...props}>
                                                                                                <h3 className="tamañotextotooltipproducto">
                                                                                                    {" "}
                                                                                                    Mostrar
                                                                                                    Vehículos{" "}
                                                                                                </h3>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                    </Overlay>
                                                                                </Col>
                                                                            ) : (
                                                                                <Col
                                                                                    xl={
                                                                                        1
                                                                                    }
                                                                                    lg={
                                                                                        1
                                                                                    }
                                                                                    md={
                                                                                        1
                                                                                    }
                                                                                    xs={
                                                                                        1
                                                                                    }>
                                                                                    <div className="fondodivselecciontipoproducto">
                                                                                        <InfoIcon
                                                                                            onClick={() => {
                                                                                                setShowModalGenerico(
                                                                                                    !showModalGenerico
                                                                                                );
                                                                                            }}
                                                                                            style={{
                                                                                                fontSize: 30,
                                                                                            }}
                                                                                            className="iconoinfomaterial"></InfoIcon>
                                                                                    </div>
                                                                                </Col>
                                                                            )}
                                                                        </Row>
                                                                    </div>
                                                                ) : null}
                                                            </Row>
                                                        </div>
                                                    ) : null}

                                                    {generico ? (
                                                        generico === "No" ? (
                                                            <div className="mtmenos4">
                                                                {
                                                                    <div>
                                                                        {vehiculoUno ? (
                                                                            <DatosVehiculos
                                                                                vehiculoUnoCrear={
                                                                                    vehiculoUnoCrear
                                                                                }
                                                                                setVehiculoUnoCrear={
                                                                                    setVehiculoUnoCrear
                                                                                }
                                                                                vehiculoUnoSelecc={
                                                                                    vehiculoUnoSelecc
                                                                                }
                                                                                setVehiculoUnoSelecc={
                                                                                    setVehiculoUnoSelecc
                                                                                }
                                                                                vehiculoUnoEditar={
                                                                                    vehiculoUnoEditar
                                                                                }
                                                                                setVehiculoUnoEditar={
                                                                                    setVehiculoUnoEditar
                                                                                }
                                                                                vehiculoUnoDuplicar={
                                                                                    vehiculoUnoDuplicar
                                                                                }
                                                                                setVehiculoUnoDuplicar={
                                                                                    setVehiculoUnoDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoUnoUbicar={
                                                                                    vehiculoUnoUbicar
                                                                                }
                                                                                setVehiculoUnoUbicar={
                                                                                    setVehiculoUnoUbicar
                                                                                }
                                                                                setTipoVehUno={
                                                                                    setTipoVehUno
                                                                                }
                                                                                setMarcaVehUno={
                                                                                    setMarcaVehUno
                                                                                }
                                                                                setAnnoVehUno={
                                                                                    setAnnoVehUno
                                                                                }
                                                                                setModeloVehUno={
                                                                                    setModeloVehUno
                                                                                }
                                                                                setCarroceriaVehUno={
                                                                                    setCarroceriaVehUno
                                                                                }
                                                                                setcilindrajeVehUno={
                                                                                    setcilindrajeVehUno
                                                                                }
                                                                                settransmisionVehUno={
                                                                                    settransmisionVehUno
                                                                                }
                                                                                setcombustibleVehUno={
                                                                                    setcombustibleVehUno
                                                                                }
                                                                                settraccionVehUno={
                                                                                    settraccionVehUno
                                                                                }
                                                                                tipoVehUno={
                                                                                    tipoVehUno
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                settipoVehiculoSeleccionado={
                                                                                    settipoVehiculoSeleccionado
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehUno={
                                                                                    marcaVehUno
                                                                                }
                                                                                annoVehUno={
                                                                                    annoVehUno
                                                                                }
                                                                                modeloVehUno={
                                                                                    modeloVehUno
                                                                                }
                                                                                carroceriaVehUno={
                                                                                    carroceriaVehUno
                                                                                }
                                                                                cilindrajeVehUno={
                                                                                    cilindrajeVehUno
                                                                                }
                                                                                transmisionVehUno={
                                                                                    transmisionVehUno
                                                                                }
                                                                                combustibleVehUno={
                                                                                    combustibleVehUno
                                                                                }
                                                                                traccionVehUno={
                                                                                    traccionVehUno
                                                                                }
                                                                                nuevoVehiculo={
                                                                                    nuevoVehiculo
                                                                                }
                                                                                setNuevoVehiculo={
                                                                                    setNuevoVehiculo
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoDos ? (
                                                                            <DatosVehiculosDos
                                                                                vehiculoDosCrear={
                                                                                    vehiculoDosCrear
                                                                                }
                                                                                setVehiculoDosCrear={
                                                                                    setVehiculoDosCrear
                                                                                }
                                                                                vehiculoDosSelecc={
                                                                                    vehiculoDosSelecc
                                                                                }
                                                                                setVehiculoDosSelecc={
                                                                                    setVehiculoDosSelecc
                                                                                }
                                                                                vehiculoDosEditar={
                                                                                    vehiculoDosEditar
                                                                                }
                                                                                setVehiculoDosEditar={
                                                                                    setVehiculoDosEditar
                                                                                }
                                                                                vehiculoDosDuplicar={
                                                                                    vehiculoDosDuplicar
                                                                                }
                                                                                setVehiculoDosDuplicar={
                                                                                    setVehiculoDosDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoDosUbicar={
                                                                                    vehiculoDosUbicar
                                                                                }
                                                                                setVehiculoDosUbicar={
                                                                                    setVehiculoDosUbicar
                                                                                }
                                                                                setTipoVehDos={
                                                                                    setTipoVehDos
                                                                                }
                                                                                setMarcaVehDos={
                                                                                    setMarcaVehDos
                                                                                }
                                                                                setAnnoVehDos={
                                                                                    setAnnoVehDos
                                                                                }
                                                                                setModeloVehDos={
                                                                                    setModeloVehDos
                                                                                }
                                                                                setCarroceriaVehDos={
                                                                                    setCarroceriaVehDos
                                                                                }
                                                                                setcilindrajeVehDos={
                                                                                    setcilindrajeVehDos
                                                                                }
                                                                                settransmisionVehDos={
                                                                                    settransmisionVehDos
                                                                                }
                                                                                setcombustibleVehDos={
                                                                                    setcombustibleVehDos
                                                                                }
                                                                                settraccionVehDos={
                                                                                    settraccionVehDos
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                marcaVehDos={
                                                                                    marcaVehDos
                                                                                }
                                                                                annoVehDos={
                                                                                    annoVehDos
                                                                                }
                                                                                modeloVehDos={
                                                                                    modeloVehDos
                                                                                }
                                                                                carroceriaVehDos={
                                                                                    carroceriaVehDos
                                                                                }
                                                                                cilindrajeVehDos={
                                                                                    cilindrajeVehDos
                                                                                }
                                                                                transmisionVehDos={
                                                                                    transmisionVehDos
                                                                                }
                                                                                combustibleVehDos={
                                                                                    combustibleVehDos
                                                                                }
                                                                                traccionVehDos={
                                                                                    traccionVehDos
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoTres ? (
                                                                            <DatosVehiculosTres
                                                                                vehiculoTresCrear={
                                                                                    vehiculoTresCrear
                                                                                }
                                                                                setVehiculoTresCrear={
                                                                                    setVehiculoTresCrear
                                                                                }
                                                                                vehiculoTresSelecc={
                                                                                    vehiculoTresSelecc
                                                                                }
                                                                                setVehiculoTresSelecc={
                                                                                    setVehiculoTresSelecc
                                                                                }
                                                                                vehiculoTresEditar={
                                                                                    vehiculoTresEditar
                                                                                }
                                                                                setVehiculoTresEditar={
                                                                                    setVehiculoTresEditar
                                                                                }
                                                                                vehiculoTresDuplicar={
                                                                                    vehiculoTresDuplicar
                                                                                }
                                                                                setVehiculoTresDuplicar={
                                                                                    setVehiculoTresDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoTresUbicar={
                                                                                    vehiculoTresUbicar
                                                                                }
                                                                                setVehiculoTresUbicar={
                                                                                    setVehiculoTresUbicar
                                                                                }
                                                                                setTipoVehTres={
                                                                                    setTipoVehTres
                                                                                }
                                                                                setMarcaVehTres={
                                                                                    setMarcaVehTres
                                                                                }
                                                                                setAnnoVehTres={
                                                                                    setAnnoVehTres
                                                                                }
                                                                                setModeloVehTres={
                                                                                    setModeloVehTres
                                                                                }
                                                                                setCarroceriaVehTres={
                                                                                    setCarroceriaVehTres
                                                                                }
                                                                                setcilindrajeVehTres={
                                                                                    setcilindrajeVehTres
                                                                                }
                                                                                settransmisionVehTres={
                                                                                    settransmisionVehTres
                                                                                }
                                                                                setcombustibleVehTres={
                                                                                    setcombustibleVehTres
                                                                                }
                                                                                settraccionVehTres={
                                                                                    settraccionVehTres
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                marcaVehTres={
                                                                                    marcaVehTres
                                                                                }
                                                                                annoVehTres={
                                                                                    annoVehTres
                                                                                }
                                                                                modeloVehTres={
                                                                                    modeloVehTres
                                                                                }
                                                                                carroceriaVehTres={
                                                                                    carroceriaVehTres
                                                                                }
                                                                                cilindrajeVehTres={
                                                                                    cilindrajeVehTres
                                                                                }
                                                                                transmisionVehTres={
                                                                                    transmisionVehTres
                                                                                }
                                                                                combustibleVehTres={
                                                                                    combustibleVehTres
                                                                                }
                                                                                traccionVehTres={
                                                                                    traccionVehTres
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoCuatro ? (
                                                                            <DatosVehiculosCuatro
                                                                                vehiculoCuatroCrear={
                                                                                    vehiculoCuatroCrear
                                                                                }
                                                                                setVehiculoCuatroCrear={
                                                                                    setVehiculoCuatroCrear
                                                                                }
                                                                                vehiculoCuatroSelecc={
                                                                                    vehiculoCuatroSelecc
                                                                                }
                                                                                setVehiculoCuatroSelecc={
                                                                                    setVehiculoCuatroSelecc
                                                                                }
                                                                                vehiculoCuatroEditar={
                                                                                    vehiculoCuatroEditar
                                                                                }
                                                                                setVehiculoCuatroEditar={
                                                                                    setVehiculoCuatroEditar
                                                                                }
                                                                                vehiculoCuatroDuplicar={
                                                                                    vehiculoCuatroDuplicar
                                                                                }
                                                                                setVehiculoCuatroDuplicar={
                                                                                    setVehiculoCuatroDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoCuatroUbicar={
                                                                                    vehiculoCuatroUbicar
                                                                                }
                                                                                setVehiculoCuatroUbicar={
                                                                                    setVehiculoCuatroUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehCuatro={
                                                                                    setTipoVehCuatro
                                                                                }
                                                                                setMarcaVehCuatro={
                                                                                    setMarcaVehCuatro
                                                                                }
                                                                                setAnnoVehCuatro={
                                                                                    setAnnoVehCuatro
                                                                                }
                                                                                setModeloVehCuatro={
                                                                                    setModeloVehCuatro
                                                                                }
                                                                                setCarroceriaVehCuatro={
                                                                                    setCarroceriaVehCuatro
                                                                                }
                                                                                setcilindrajeVehCuatro={
                                                                                    setcilindrajeVehCuatro
                                                                                }
                                                                                settransmisionVehCuatro={
                                                                                    settransmisionVehCuatro
                                                                                }
                                                                                setcombustibleVehCuatro={
                                                                                    setcombustibleVehCuatro
                                                                                }
                                                                                settraccionVehCuatro={
                                                                                    settraccionVehCuatro
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehCuatro={
                                                                                    marcaVehCuatro
                                                                                }
                                                                                annoVehCuatro={
                                                                                    annoVehCuatro
                                                                                }
                                                                                modeloVehCuatro={
                                                                                    modeloVehCuatro
                                                                                }
                                                                                carroceriaVehCuatro={
                                                                                    carroceriaVehCuatro
                                                                                }
                                                                                cilindrajeVehCuatro={
                                                                                    cilindrajeVehCuatro
                                                                                }
                                                                                transmisionVehCuatro={
                                                                                    transmisionVehCuatro
                                                                                }
                                                                                combustibleVehCuatro={
                                                                                    combustibleVehCuatro
                                                                                }
                                                                                traccionVehCuatro={
                                                                                    traccionVehCuatro
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoCinco ? (
                                                                            <DatosVehiculosCinco
                                                                                vehiculoCincoCrear={
                                                                                    vehiculoCincoCrear
                                                                                }
                                                                                setVehiculoCincoCrear={
                                                                                    setVehiculoCincoCrear
                                                                                }
                                                                                vehiculoCincoSelecc={
                                                                                    vehiculoCincoSelecc
                                                                                }
                                                                                setVehiculoCincoSelecc={
                                                                                    setVehiculoCincoSelecc
                                                                                }
                                                                                vehiculoCincoEditar={
                                                                                    vehiculoCincoEditar
                                                                                }
                                                                                setVehiculoCincoEditar={
                                                                                    setVehiculoCincoEditar
                                                                                }
                                                                                vehiculoCincoDuplicar={
                                                                                    vehiculoCincoDuplicar
                                                                                }
                                                                                setVehiculoCincoDuplicar={
                                                                                    setVehiculoCincoDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoCincoUbicar={
                                                                                    vehiculoCincoUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setVehiculoCincoUbicar={
                                                                                    setVehiculoCincoUbicar
                                                                                }
                                                                                setTipoVehCinco={
                                                                                    setTipoVehCinco
                                                                                }
                                                                                setMarcaVehCinco={
                                                                                    setMarcaVehCinco
                                                                                }
                                                                                setAnnoVehCinco={
                                                                                    setAnnoVehCinco
                                                                                }
                                                                                setModeloVehCinco={
                                                                                    setModeloVehCinco
                                                                                }
                                                                                setCarroceriaVehCinco={
                                                                                    setCarroceriaVehCinco
                                                                                }
                                                                                setcilindrajeVehCinco={
                                                                                    setcilindrajeVehCinco
                                                                                }
                                                                                settransmisionVehCinco={
                                                                                    settransmisionVehCinco
                                                                                }
                                                                                setcombustibleVehCinco={
                                                                                    setcombustibleVehCinco
                                                                                }
                                                                                settraccionVehCinco={
                                                                                    settraccionVehCinco
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehCinco={
                                                                                    marcaVehCinco
                                                                                }
                                                                                annoVehCinco={
                                                                                    annoVehCinco
                                                                                }
                                                                                modeloVehCinco={
                                                                                    modeloVehCinco
                                                                                }
                                                                                carroceriaVehCinco={
                                                                                    carroceriaVehCinco
                                                                                }
                                                                                cilindrajeVehCinco={
                                                                                    cilindrajeVehCinco
                                                                                }
                                                                                transmisionVehCinco={
                                                                                    transmisionVehCinco
                                                                                }
                                                                                combustibleVehCinco={
                                                                                    combustibleVehCinco
                                                                                }
                                                                                traccionVehCinco={
                                                                                    traccionVehCinco
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoSeis ? (
                                                                            <DatosVehiculosSeis
                                                                                vehiculoSeisCrear={
                                                                                    vehiculoSeisCrear
                                                                                }
                                                                                setVehiculoSeisCrear={
                                                                                    setVehiculoSeisCrear
                                                                                }
                                                                                vehiculoSeisSelecc={
                                                                                    vehiculoSeisSelecc
                                                                                }
                                                                                setVehiculoSeisSelecc={
                                                                                    setVehiculoSeisSelecc
                                                                                }
                                                                                vehiculoSeisEditar={
                                                                                    vehiculoSeisEditar
                                                                                }
                                                                                setVehiculoSeisEditar={
                                                                                    setVehiculoSeisEditar
                                                                                }
                                                                                vehiculoSeisDuplicar={
                                                                                    vehiculoSeisDuplicar
                                                                                }
                                                                                setVehiculoSeisDuplicar={
                                                                                    setVehiculoSeisDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoSeisUbicar={
                                                                                    vehiculoSeisUbicar
                                                                                }
                                                                                setVehiculoSeisUbicar={
                                                                                    setVehiculoSeisUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehSeis={
                                                                                    setTipoVehSeis
                                                                                }
                                                                                setMarcaVehSeis={
                                                                                    setMarcaVehSeis
                                                                                }
                                                                                setAnnoVehSeis={
                                                                                    setAnnoVehSeis
                                                                                }
                                                                                setModeloVehSeis={
                                                                                    setModeloVehSeis
                                                                                }
                                                                                setCarroceriaVehSeis={
                                                                                    setCarroceriaVehSeis
                                                                                }
                                                                                setcilindrajeVehSeis={
                                                                                    setcilindrajeVehSeis
                                                                                }
                                                                                settransmisionVehSeis={
                                                                                    settransmisionVehSeis
                                                                                }
                                                                                setcombustibleVehSeis={
                                                                                    setcombustibleVehSeis
                                                                                }
                                                                                settraccionVehSeis={
                                                                                    settraccionVehSeis
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehSeis={
                                                                                    marcaVehSeis
                                                                                }
                                                                                annoVehSeis={
                                                                                    annoVehSeis
                                                                                }
                                                                                modeloVehSeis={
                                                                                    modeloVehSeis
                                                                                }
                                                                                carroceriaVehSeis={
                                                                                    carroceriaVehSeis
                                                                                }
                                                                                cilindrajeVehSeis={
                                                                                    cilindrajeVehSeis
                                                                                }
                                                                                transmisionVehSeis={
                                                                                    transmisionVehSeis
                                                                                }
                                                                                combustibleVehSeis={
                                                                                    combustibleVehSeis
                                                                                }
                                                                                traccionVehSeis={
                                                                                    traccionVehSeis
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoSiete ? (
                                                                            <DatosVehiculosSiete
                                                                                vehiculoSieteCrear={
                                                                                    vehiculoSieteCrear
                                                                                }
                                                                                setVehiculoSieteCrear={
                                                                                    setVehiculoSieteCrear
                                                                                }
                                                                                vehiculoSieteSelecc={
                                                                                    vehiculoSieteSelecc
                                                                                }
                                                                                setVehiculoSieteSelecc={
                                                                                    setVehiculoSieteSelecc
                                                                                }
                                                                                vehiculoSieteEditar={
                                                                                    vehiculoSieteEditar
                                                                                }
                                                                                setVehiculoSieteEditar={
                                                                                    setVehiculoSieteEditar
                                                                                }
                                                                                vehiculoSieteDuplicar={
                                                                                    vehiculoSieteDuplicar
                                                                                }
                                                                                setVehiculoSieteDuplicar={
                                                                                    setVehiculoSieteDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoSieteUbicar={
                                                                                    vehiculoSieteUbicar
                                                                                }
                                                                                setVehiculoSieteUbicar={
                                                                                    setVehiculoSieteUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehSiete={
                                                                                    setTipoVehSiete
                                                                                }
                                                                                setMarcaVehSiete={
                                                                                    setMarcaVehSiete
                                                                                }
                                                                                setAnnoVehSiete={
                                                                                    setAnnoVehSiete
                                                                                }
                                                                                setModeloVehSiete={
                                                                                    setModeloVehSiete
                                                                                }
                                                                                setCarroceriaVehSiete={
                                                                                    setCarroceriaVehSiete
                                                                                }
                                                                                setcilindrajeVehSiete={
                                                                                    setcilindrajeVehSiete
                                                                                }
                                                                                settransmisionVehSiete={
                                                                                    settransmisionVehSiete
                                                                                }
                                                                                setcombustibleVehSiete={
                                                                                    setcombustibleVehSiete
                                                                                }
                                                                                settraccionVehSiete={
                                                                                    settraccionVehSiete
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehSiete={
                                                                                    marcaVehSiete
                                                                                }
                                                                                annoVehSiete={
                                                                                    annoVehSiete
                                                                                }
                                                                                modeloVehSiete={
                                                                                    modeloVehSiete
                                                                                }
                                                                                carroceriaVehSiete={
                                                                                    carroceriaVehSiete
                                                                                }
                                                                                cilindrajeVehSiete={
                                                                                    cilindrajeVehSiete
                                                                                }
                                                                                transmisionVehSiete={
                                                                                    transmisionVehSiete
                                                                                }
                                                                                combustibleVehSiete={
                                                                                    combustibleVehSiete
                                                                                }
                                                                                traccionVehSiete={
                                                                                    traccionVehSiete
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoOcho ? (
                                                                            <DatosVehiculosOcho
                                                                                vehiculoOchoCrear={
                                                                                    vehiculoOchoCrear
                                                                                }
                                                                                setVehiculoOchoCrear={
                                                                                    setVehiculoOchoCrear
                                                                                }
                                                                                vehiculoOchoSelecc={
                                                                                    vehiculoOchoSelecc
                                                                                }
                                                                                setVehiculoOchoSelecc={
                                                                                    setVehiculoOchoSelecc
                                                                                }
                                                                                vehiculoOchoEditar={
                                                                                    vehiculoOchoEditar
                                                                                }
                                                                                setVehiculoOchoEditar={
                                                                                    setVehiculoOchoEditar
                                                                                }
                                                                                vehiculoOchoDuplicar={
                                                                                    vehiculoOchoDuplicar
                                                                                }
                                                                                setVehiculoOchoDuplicar={
                                                                                    setVehiculoOchoDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoOchoUbicar={
                                                                                    vehiculoOchoUbicar
                                                                                }
                                                                                setVehiculoOchoUbicar={
                                                                                    setVehiculoOchoUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehOcho={
                                                                                    setTipoVehOcho
                                                                                }
                                                                                setMarcaVehOcho={
                                                                                    setMarcaVehOcho
                                                                                }
                                                                                setAnnoVehOcho={
                                                                                    setAnnoVehOcho
                                                                                }
                                                                                setModeloVehOcho={
                                                                                    setModeloVehOcho
                                                                                }
                                                                                setCarroceriaVehOcho={
                                                                                    setCarroceriaVehOcho
                                                                                }
                                                                                setcilindrajeVehOcho={
                                                                                    setcilindrajeVehOcho
                                                                                }
                                                                                settransmisionVehOcho={
                                                                                    settransmisionVehOcho
                                                                                }
                                                                                setcombustibleVehOcho={
                                                                                    setcombustibleVehOcho
                                                                                }
                                                                                settraccionVehOcho={
                                                                                    settraccionVehOcho
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehOcho={
                                                                                    marcaVehOcho
                                                                                }
                                                                                annoVehOcho={
                                                                                    annoVehOcho
                                                                                }
                                                                                modeloVehOcho={
                                                                                    modeloVehOcho
                                                                                }
                                                                                carroceriaVehOcho={
                                                                                    carroceriaVehOcho
                                                                                }
                                                                                cilindrajeVehOcho={
                                                                                    cilindrajeVehOcho
                                                                                }
                                                                                transmisionVehOcho={
                                                                                    transmisionVehOcho
                                                                                }
                                                                                combustibleVehOcho={
                                                                                    combustibleVehOcho
                                                                                }
                                                                                traccionVehOcho={
                                                                                    traccionVehOcho
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoNueve ? (
                                                                            <DatosVehiculosNueve
                                                                                vehiculoNueveCrear={
                                                                                    vehiculoNueveCrear
                                                                                }
                                                                                setVehiculoNueveCrear={
                                                                                    setVehiculoNueveCrear
                                                                                }
                                                                                vehiculoNueveSelecc={
                                                                                    vehiculoNueveSelecc
                                                                                }
                                                                                setVehiculoNueveSelecc={
                                                                                    setVehiculoNueveSelecc
                                                                                }
                                                                                vehiculoNueveEditar={
                                                                                    vehiculoNueveEditar
                                                                                }
                                                                                setVehiculoNueveEditar={
                                                                                    setVehiculoNueveEditar
                                                                                }
                                                                                vehiculoNueveDuplicar={
                                                                                    vehiculoNueveDuplicar
                                                                                }
                                                                                setVehiculoNueveDuplicar={
                                                                                    setVehiculoNueveDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoNueveUbicar={
                                                                                    vehiculoNueveUbicar
                                                                                }
                                                                                setVehiculoNueveUbicar={
                                                                                    setVehiculoNueveUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehNueve={
                                                                                    setTipoVehNueve
                                                                                }
                                                                                setMarcaVehNueve={
                                                                                    setMarcaVehNueve
                                                                                }
                                                                                setAnnoVehNueve={
                                                                                    setAnnoVehNueve
                                                                                }
                                                                                setModeloVehNueve={
                                                                                    setModeloVehNueve
                                                                                }
                                                                                setCarroceriaVehNueve={
                                                                                    setCarroceriaVehNueve
                                                                                }
                                                                                setcilindrajeVehNueve={
                                                                                    setcilindrajeVehNueve
                                                                                }
                                                                                settransmisionVehNueve={
                                                                                    settransmisionVehNueve
                                                                                }
                                                                                setcombustibleVehNueve={
                                                                                    setcombustibleVehNueve
                                                                                }
                                                                                settraccionVehNueve={
                                                                                    settraccionVehNueve
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehNueve={
                                                                                    marcaVehNueve
                                                                                }
                                                                                annoVehNueve={
                                                                                    annoVehNueve
                                                                                }
                                                                                modeloVehNueve={
                                                                                    modeloVehNueve
                                                                                }
                                                                                carroceriaVehNueve={
                                                                                    carroceriaVehNueve
                                                                                }
                                                                                cilindrajeVehNueve={
                                                                                    cilindrajeVehNueve
                                                                                }
                                                                                transmisionVehNueve={
                                                                                    transmisionVehNueve
                                                                                }
                                                                                combustibleVehNueve={
                                                                                    combustibleVehNueve
                                                                                }
                                                                                traccionVehNueve={
                                                                                    traccionVehNueve
                                                                                }
                                                                            />
                                                                        ) : null}

                                                                        {vehiculoDiez ? (
                                                                            <DatosVehiculosDiez
                                                                                vehiculoDiezCrear={
                                                                                    vehiculoDiezCrear
                                                                                }
                                                                                setVehiculoDiezCrear={
                                                                                    setVehiculoDiezCrear
                                                                                }
                                                                                vehiculoDiezSelecc={
                                                                                    vehiculoDiezSelecc
                                                                                }
                                                                                setVehiculoDiezSelecc={
                                                                                    setVehiculoDiezSelecc
                                                                                }
                                                                                vehiculoDiezEditar={
                                                                                    vehiculoDiezEditar
                                                                                }
                                                                                setVehiculoDiezEditar={
                                                                                    setVehiculoDiezEditar
                                                                                }
                                                                                vehiculoDiezDuplicar={
                                                                                    vehiculoDiezDuplicar
                                                                                }
                                                                                setVehiculoDiezDuplicar={
                                                                                    setVehiculoDiezDuplicar
                                                                                }
                                                                                agregarVehiculo={
                                                                                    agregarVehiculo
                                                                                }
                                                                                setAgregarVehiculo={
                                                                                    setAgregarVehiculo
                                                                                }
                                                                                setAgregarDatos={
                                                                                    setAgregarDatos
                                                                                }
                                                                                agregarDatos={
                                                                                    agregarDatos
                                                                                }
                                                                                setEliminoDatos={
                                                                                    setEliminoDatos
                                                                                }
                                                                                eliminoDatos={
                                                                                    eliminoDatos
                                                                                }
                                                                                setDuplicar={
                                                                                    setDuplicar
                                                                                }
                                                                                duplicar={
                                                                                    duplicar
                                                                                }
                                                                                vehiculoDiezUbicar={
                                                                                    vehiculoDiezUbicar
                                                                                }
                                                                                setVehiculoDiezUbicar={
                                                                                    setVehiculoDiezUbicar
                                                                                }
                                                                                contador={
                                                                                    contador
                                                                                }
                                                                                setContador={
                                                                                    setContador
                                                                                }
                                                                                setTipoVehDiez={
                                                                                    setTipoVehDiez
                                                                                }
                                                                                setMarcaVehDiez={
                                                                                    setMarcaVehDiez
                                                                                }
                                                                                setAnnoVehDiez={
                                                                                    setAnnoVehDiez
                                                                                }
                                                                                setModeloVehDiez={
                                                                                    setModeloVehDiez
                                                                                }
                                                                                setCarroceriaVehDiez={
                                                                                    setCarroceriaVehDiez
                                                                                }
                                                                                setcilindrajeVehDiez={
                                                                                    setcilindrajeVehDiez
                                                                                }
                                                                                settransmisionVehDiez={
                                                                                    settransmisionVehDiez
                                                                                }
                                                                                setcombustibleVehDiez={
                                                                                    setcombustibleVehDiez
                                                                                }
                                                                                settraccionVehDiez={
                                                                                    settraccionVehDiez
                                                                                }
                                                                                tipoVehSelec={
                                                                                    tipoVehSelec
                                                                                }
                                                                                showTraccion={
                                                                                    showTraccion
                                                                                }
                                                                                setShowTraccion={
                                                                                    setShowTraccion
                                                                                }
                                                                                showTransmision={
                                                                                    showTransmision
                                                                                }
                                                                                setShowTransmision={
                                                                                    setShowTransmision
                                                                                }
                                                                                controlAgregarVehiculo={
                                                                                    controlAgregarVehiculo
                                                                                }
                                                                                setControlAgregarVehiculo={
                                                                                    setControlAgregarVehiculo
                                                                                }
                                                                                vehiculosSeleccionados={
                                                                                    vehiculosSeleccionados
                                                                                }
                                                                                setVehiculosSeleccionados={
                                                                                    setVehiculosSeleccionados
                                                                                }
                                                                                vehiculoBorrar={
                                                                                    vehiculoBorrar
                                                                                }
                                                                                setVehiculoBorrar={
                                                                                    setVehiculoBorrar
                                                                                }
                                                                                controlAccion={
                                                                                    controlAccion
                                                                                }
                                                                                setControlAccion={
                                                                                    setControlAccion
                                                                                }
                                                                                controlDuplicar={
                                                                                    controlDuplicar
                                                                                }
                                                                                setControlDuplicar={
                                                                                    setControlDuplicar
                                                                                }
                                                                                dataannos={
                                                                                    annos
                                                                                }
                                                                                tipoVehiculoSeleccionado={
                                                                                    tipoVehiculoSeleccionado
                                                                                }
                                                                                marcaVehDiez={
                                                                                    marcaVehDiez
                                                                                }
                                                                                annoVehDiez={
                                                                                    annoVehDiez
                                                                                }
                                                                                modeloVehDiez={
                                                                                    modeloVehDiez
                                                                                }
                                                                                carroceriaVehDiez={
                                                                                    carroceriaVehDiez
                                                                                }
                                                                                cilindrajeVehDiez={
                                                                                    cilindrajeVehDiez
                                                                                }
                                                                                transmisionVehDiez={
                                                                                    transmisionVehDiez
                                                                                }
                                                                                combustibleVehDiez={
                                                                                    combustibleVehDiez
                                                                                }
                                                                                traccionVehDiez={
                                                                                    traccionVehDiez
                                                                                }
                                                                            />
                                                                        ) : null}
                                                                    </div>
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {
                                                                    <div className="mt-25">
                                                                        <h3 className="ml-15 tituloadvertenciaproductos mtmenos30">
                                                                            Identificación
                                                                            de
                                                                            los
                                                                            vehículos
                                                                            compatibles
                                                                        </h3>
                                                                        <br />
                                                                        <Row>
                                                                            <Col
                                                                                xl={
                                                                                    6
                                                                                }
                                                                                lg={
                                                                                    6
                                                                                }
                                                                                md={
                                                                                    6
                                                                                }
                                                                                xs={
                                                                                    6
                                                                                }>
                                                                                <div
                                                                                    className="ml-19 mt-1 datoscerrados"
                                                                                    disabled={
                                                                                        true
                                                                                    }>
                                                                                    <h3
                                                                                        className=" 
                                                                                    ml-16 textoubicacionproducto">
                                                                                        Es
                                                                                        genérico,
                                                                                        sirve
                                                                                        para
                                                                                        varios
                                                                                        vehículos.
                                                                                    </h3>
                                                                                </div>
                                                                            </Col>
                                                                            <Col
                                                                                xl={
                                                                                    1
                                                                                }
                                                                                lg={
                                                                                    1
                                                                                }
                                                                                md={
                                                                                    1
                                                                                }
                                                                                xs={
                                                                                    1
                                                                                }
                                                                                className="ml-200 mtmenos2">
                                                                                <div className="showcerrarabrir">
                                                                                    <i
                                                                                        class="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center apuntador"
                                                                                        onClick={
                                                                                            agregarDatosGenerico
                                                                                        }
                                                                                        aria-hidden="true"
                                                                                        ref={
                                                                                            targetshow
                                                                                        }
                                                                                        onMouseOver={() =>
                                                                                            setShowEdit(
                                                                                                true
                                                                                            )
                                                                                        }
                                                                                        onMouseOut={() =>
                                                                                            setShowEdit(
                                                                                                false
                                                                                            )
                                                                                        }></i>
                                                                                </div>

                                                                                <Overlay
                                                                                    className=""
                                                                                    target={
                                                                                        targetshow.current
                                                                                    }
                                                                                    show={
                                                                                        showEdit
                                                                                    }
                                                                                    placement="top">
                                                                                    {(
                                                                                        props
                                                                                    ) => (
                                                                                        <Tooltip
                                                                                            className="ubicartooltipgenerico"
                                                                                            id="overlay-example"
                                                                                            {...props}>
                                                                                            <h3>
                                                                                                {" "}
                                                                                                Tipo
                                                                                                de
                                                                                                producto{" "}
                                                                                            </h3>
                                                                                        </Tooltip>
                                                                                    )}
                                                                                </Overlay>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    ) : null}

                                                    {agregarVehiculo ? (
                                                        <div>
                                                            {
                                                                /*controlAgregarVehiculo ? (*/
                                                                <div className="ml-12">
                                                                    <div
                                                                        className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                        onClick={() =>
                                                                            agregarDatosVehiculos()
                                                                        }>
                                                                        {
                                                                            <h3>
                                                                                Click
                                                                                para
                                                                                agregar
                                                                                vehículo
                                                                            </h3>
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        className="ps-form__input mt-3
                                                                                   botonagregarotrovehiculo"
                                                                        onClick={() =>
                                                                            crearVehiculos()
                                                                        }>
                                                                        {
                                                                            <h3>
                                                                                Crear
                                                                                vehículo
                                                                            </h3>
                                                                        }
                                                                    </div>

                                                                    <div
                                                                        className="ml-605 ps-btn botonazul mt-15"
                                                                        onClick={() =>
                                                                            agregarDatosLatoneria()
                                                                        }>
                                                                        {
                                                                            <h3 className="textocolorblanco">
                                                                                Siguiente
                                                                            </h3>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                /*) : null*/
                                                            }
                                                        </div>
                                                    ) : botonCrearVehiculo ? (
                                                        <div className="ml-12">
                                                            <div
                                                                className="ps-form__input mt-3 botoncrearvehiculo"
                                                                onClick={() =>
                                                                    crearVehiculos()
                                                                }>
                                                                {
                                                                    <h3>
                                                                        Crear
                                                                        vehículo
                                                                    </h3>
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>

                                                {selecCategoria == "Si" ? (
                                                    <div className="cajavehiculoscompatiblesproducto">
                                                        <CategoriasProductosGenericos
                                                            setShowDatosProductos={
                                                                setShowDatosProductos
                                                            }
                                                            showDatosProductos={
                                                                showDatosProductos
                                                            }
                                                            abrirCerrarCategoriasGenerico={
                                                                abrirCerrarCategoriasGenerico
                                                            }
                                                            setAbrirCerrarCategoriasGenerico={
                                                                setAbrirCerrarCategoriasGenerico
                                                            }
                                                            categoria={
                                                                categoria
                                                            }
                                                            setCategoria={
                                                                setCategoria
                                                            }
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <div className="ps-form__group mtmenos20">
                                                <Row>
                                                    <Col
                                                        xl={11}
                                                        lg={11}
                                                        md={11}
                                                        xs={11}>
                                                        <div className="form-control ps-form__input">
                                                            <select
                                                                //disabled="disabled"
                                                                className="custom-select ps-form__labelselect"
                                                                onChange={(e) =>
                                                                    handleChangeGenerico(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }>
                                                                <option
                                                                    selected
                                                                    className="select-fontsize ps-form__label">
                                                                    Producto es
                                                                    Genérico
                                                                </option>
                                                                {productogenerico &&
                                                                    productogenerico.map(
                                                                        (
                                                                            itemselect
                                                                        ) => {
                                                                            return (
                                                                                <option
                                                                                    value={
                                                                                        itemselect.value
                                                                                    }>
                                                                                    {
                                                                                        itemselect.label
                                                                                    }
                                                                                </option>
                                                                            );
                                                                        }
                                                                    )}
                                                            </select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}

                                        <div className="ps-form__submit">
                                            <div>
                                                {mostrarBotonDatosMotor ? (
                                                    <p className="ps-form__text tamañotextocrearproducto">
                                                        Ahora vamos a
                                                        identificar las
                                                        caracteristícas del
                                                        motor
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div>
                                                {mostrarBotonDatosMotor ? (
                                                    <div
                                                        className="ps-btn"
                                                        onClick={
                                                            datosCrearProducto
                                                        }>
                                                        Click aquí
                                                    </div>
                                                ) : seleccionoTipoVeh ? (
                                                    <Row>
                                                        <Col
                                                            xl={4}
                                                            lg={4}
                                                            md={4}
                                                            sm={4}>
                                                            <div className="botonimagenesilustrativas mt-20">
                                                                <h3 className="textoimagenesilustrativas ">
                                                                    Listo, ya
                                                                    Seleccionaste
                                                                    el tipo de
                                                                    Vehículo!
                                                                </h3>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="ml-140">
                            {showModalLatoneria ? (
                                <DatosLatoneria
                                    setShowModalLatoneria={
                                        setShowModalLatoneria
                                    }
                                    showModalLatoneria={showModalLatoneria}
                                    setShowModalLatoneriaActiva={
                                        setShowModalLatoneriaActiva
                                    }
                                    showModalLatoneriaActiva={
                                        showModalLatoneriaActiva
                                    }
                                    seleccionoUbicacionProducto={
                                        seleccionoUbicacionProducto
                                    }
                                    setSeleccionoUbicacionProducto={
                                        setSeleccionoUbicacionProducto
                                    }
                                    showModalDatosProducto={
                                        showModalDatosProducto
                                    }
                                    setShowModalDatosProducto={
                                        setShowModalDatosProducto
                                    }
                                    setShowDatosProductos={
                                        setShowDatosProductos
                                    }
                                    setSelecDatosProducto={
                                        setSelecDatosProducto
                                    }
                                    tipoVehUno={tipoVehUno}
                                />
                            ) : seleccionoUbicacionProducto ? (
                                <div className="ml-40">
                                    <Row className="mtmenos80">
                                        <Col xl={1} lg={1} md={1} sm={1}></Col>
                                        <Col xl={4} lg={4} md={4} sm={4}>
                                            <div className="botonimagenesilustrativas mt-100">
                                                <h3 className="textoimagenesilustrativas ">
                                                    OK, ya hemos ubicado tu
                                                    producto, Oprime continuar
                                                    para ingresar los datos
                                                    adicionales.
                                                </h3>
                                            </div>
                                        </Col>
                                    </Row>
                                    {!SelecDatosProducto ? (
                                        <Row>
                                            <Col
                                                xl={3}
                                                lg={3}
                                                md={3}
                                                sm={3}></Col>
                                            <Col xl={4} lg={4} md={4} sm={4}>
                                                <Button
                                                    className="ps-btn botonazul mt-20"
                                                    onClick={
                                                        ingresarDatosProductos
                                                    }>
                                                    Click para continuar
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        {showDatosProductos ? (
                            <DatosProductos
                                setShowDatosProductos={setShowDatosProductos}
                                showDatosProductos={showDatosProductos}
                                setShowDatosProductosActiva={
                                    setShowDatosProductosActiva
                                }
                                showDatosProductosActiva={
                                    showDatosProductosActiva
                                }
                                SelecDatosProducto={SelecDatosProducto}
                                setSelecDatosProducto={setSelecDatosProducto}
                                showDatosProductosAdicionales={
                                    showDatosProductosAdicionales
                                }
                                setShowDatosProductosAdicionales={
                                    setShowDatosProductosAdicionales
                                }
                                showModalDatosProducto={showModalDatosProducto}
                                setShowModalDatosProducto={
                                    setShowModalDatosProducto
                                }
                                generico={generico}
                                tituloInformacionProducto={
                                    tituloInformacionProducto
                                }
                                setTituloInformacionProducto={
                                    setTituloInformacionProducto
                                }
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}

                        {showDatosProductosAdicionales ? (
                            <DatosProductosAdicionales
                                showDatosProductosAdicionales={
                                    showDatosProductosAdicionales
                                }
                                setShowDatosProductosAdicionales={
                                    setShowDatosProductosAdicionales
                                }
                                showIngresoFotos={showIngresoFotos}
                                setShowIngresoFotos={setShowIngresoFotos}
                                categoria={categoria}
                                setCategoria={setCategoria}
                                quantity={quantity}
                                setQuantity={setQuantity}
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}

                        {showIngresoFotos ? (
                            <RegistrarFotos
                                showIngresoFotos={showIngresoFotos}
                                setShowIngresoFotos={setShowIngresoFotos}
                                generico={generico}
                            />
                        ) : SelecDatosProducto ? (
                            console.log("VERDADERO")
                        ) : null}
                    </div>
                </div>

                <div className="App">
                    <ModalInformacionGenericos
                        shown={showModalGenerico}
                        close={() => {
                            setShowModalGenerico(false);
                        }}
                    />
                </div>
                <div className="App">
                    <ModalInformacionPorUnoVarios
                        shown={showModalParaUnoVarios}
                        close={() => {
                            setShowModalParaUnoVarios(false);
                        }}
                    />
                </div>
            </div>
            <div className="ps-page ps-page--inner mt-200"></div>
        </Container>
    );
};

function ModalInformacionGenericos({ shown, close }) {
    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido redondearventamensajes"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={10} lg={10} md={10} sm={10}>
                            <div className="titulodetaildescription">
                                Texto sobre lo que que queremos indicar al
                                usuario
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-10"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="mt-50 textoventanamensajes">
                    <h2>
                        {" "}
                        Contenido, o explicación, o opciones para selección
                    </h2>
                    <br />
                    <br />
                    <h2>
                        Información adiciona, explicando sobre lo que debe
                        realizar.
                    </h2>
                </div>
                <div className="ml-550 mt-80">
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <Button
                                variant="outline-light"
                                className="ps-btn"
                                onClick={() => close()}>
                                {" "}
                                Cerrar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    ) : null;
}

function ModalInformacionPorUnoVarios({ shown, close }) {
    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div
                className="modal-contenido"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col
                            xl={9}
                            lg={9}
                            md={9}
                            sm={9}
                            className="ml-60 mb-10">
                            <div className="tamañotextocrearproductoinfo">
                                PRODUCTOS ES PARA UNO O VARIOS VEHÍCULOS
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-30"
                                data-dismiss="modal"
                                onClick={close}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div className="ml-20 mr-30 textomodalinfoproductos">
                    <h2>
                        {" "}
                        El producto a vender puede ser utilizado en varios
                        vehículos de la misma marca o modelo, para varios años,
                        línea o cilindraje
                    </h2>

                    <h2>TEM</h2>
                </div>
            </div>
        </div>
    ) : null;
}

function DatosLatoneria(props) {
    const {
        setShowModalLatoneria,
        showModalLatoneria,
        setShowModalLatoneriaActiva,
        showModalLatoneriaActiva,
        seleccionoUbicacionProducto,
        setSeleccionoUbicacionProducto,
        setShowModalDatosProducto,
        showModalDatosProducto,
        setShowDatosProductos,
        setSelecDatosProducto,
        setShowDatosProductosActiva,
        showDatosProductosActiva,
        tipoVehUno,
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [iconoAireacondicionado, setIconoAireacondicionado] = useState(
        iconoaireacondicionadoinicial
    );
    const [iconoArranque, setIconoArranque] = useState(iconoarranqueinicial);
    const [iconoCaja, setIconoCaja] = useState(iconocajainicial);
    const [iconoDireccion, setIconoDireccion] = useState(iconodireccioninicial);
    const [iconoEmbrague, setIconoEmbrague] = useState(iconoembragueinicial);
    const [iconoEscape, setIconoEscape] = useState(iconoescapeinicial);
    const [iconoFrenos, setIconoFrenos] = useState(iconofrenosinicial);
    const [iconoInyeccion, setIconoInyeccion] = useState(iconoinyeccioninicial);
    const [iconoMotor, setIconoMotor] = useState(iconomotorinicial);
    const [iconoParabrisas, setIconoParabrisas] = useState(
        iconoparabrisasinicial
    );
    const [iconoRefrigeracion, setIconoRefrigeracion] = useState(
        iconorefrigeracioninicial
    );
    const [iconoRefrigeracionCaja, setIconoRefrigeracionCaja] = useState(
        iconorefrigeracioncajainicial
    );
    const [iconoSistemElectrico, setIconoSistemElectrico] = useState(
        iconosistemaelectricoinicial
    );
    const [iconoSistemElectricoMotor, setIconoSistemElectricoMotor] = useState(
        iconosistemaelectricomotorinicial
    );
    const [iconoSuspension, setIconosuspension] = useState(
        iconosuspensioninicial
    );
    const [iconoTransmision, setIconoTransmision] = useState(
        iconotransmisioninicial
    );

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreUbicacionExterior, setnombreUbicacionExterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionInterior, setnombreUbicacionInterior] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionTrenMotriz, setnombreUbicacionTrenMotriz] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mt-2");

    const [nombreUbicacionIzquierda, setnombreUbicacionIzquierda] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionCentro, setnombreUbicacionCentro] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionDerecha, setnombreUbicacionDerecha] = useState(
        "botonpartesvehiculo"
    );
    const [nombreUbicacionIzquierdaInfo, setnombreUbicacionIzquierdaInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionCentroInfo, setnombreUbicacionCentroInfo] = useState(
        "botonpartesvehiculoinfo mt-2"
    );
    const [nombreUbicacionDerechaInfo, setnombreUbicacionDerechaInfo] =
        useState("botonpartesvehiculoinfo mt-2");

    const [seleccionoUbicacionConsola, setSeleccionoUbicacionConsola] =
        useState("botonpartesvehiculo");
    const [seleccionoUbicacionAsiento, setSeleccionoUbicacionAsiento] =
        useState("botonpartesvehiculo");
    const [seleccionoUbicacionTecho, setSeleccionoUbicacionTecho] = useState(
        "botonpartesvehiculo"
    );

    const [showImagenExterior, setShowImagenExterior] = useState(true);
    const [showImagenInterior, setShowImagenInterior] = useState(false);
    const [showImagenTrenMotriz, setShowImagenTrenMotriz] = useState(false);

    const [showExteriorBase, setShowExteriorBase] = useState(true);
    const [showImagenIzquierda, setShowImagenIzquierda] = useState(false);
    const [showImagenCentro, setShowImagenCentro] = useState(false);
    const [showImagenDerecha, setShowImagenDerecha] = useState(false);

    const [showConsolaBase, setShowConsolaBase] = useState(true);
    const [showImagenConsola, setShowImagenConsola] = useState(false);
    const [showImagenAsiento, setShowImagenAsiento] = useState(false);
    const [showImagenTecho, setShowImagenTecho] = useState(false);

    const [showImagenBaseMotorElectrico, setShowImagenBaseMotorElectrico] =
        useState(true);
    const [showImagenAireacondicionado, setShowImagenAireacondicionado] =
        useState(false);
    const [showImagenArranque, setShowImagenArranque] = useState(false);
    const [showImagenCaja, setShowImagenCaja] = useState(false);
    const [showImagenDireccion, setShowImagenDireccion] = useState(false);
    const [showImagenEmbrague, setShowImagenEmbrague] = useState(false);
    const [showImagenEscape, setShowImagenEscape] = useState(false);
    const [showImagenFrenos, setShowImagenFrenos] = useState(false);
    const [showImagenInyeccion, setShowImagenInyeccion] = useState(false);
    const [showImagenMotor, setShowImagenMotor] = useState(false);
    const [showImagenParabrisas, setShowImagenParabrisas] = useState(false);
    const [showImagenRefrigeracion, setShowImagenRefrigeracion] =
        useState(false);
    const [showImagenRefrigeracionCaja, setShowImagenRefrigeracionCaja] =
        useState(false);
    const [showImagenSistemElectrico, setShowImagenSistemElectrico] =
        useState(false);
    const [showImagenSistemElectricoMotor, setShowImagenSistemElectricoMotor] =
        useState(false);
    const [showImagenSuspension, setShowImagensuspension] = useState(false);
    const [showImagenTransmision, setShowImagenTransmision] = useState(false);

    const [
        mostrarModalComentariosHabitaculo,
        setMostrarModalComentariosHabitaculo,
    ] = useState(false);
    const [textoPosicionHabitaculo, setTextoPosicionHabitaculo] = useState(0);

    const [ubicarProducto, setUbicarProducto] = useState(0);

    const [ubicarProductoLatoneria, setUbicarProductoLatoneria] =
        useState(false);
    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [
        mostrarModalComentariosUbicacionProducto,
        setMostrarModalComentariosUbicacionProducto,
    ] = useState(false);
    const [textoPosicionUbicacionProducto, setTextoPosicionUbicacionProducto] =
        useState(0);
    const [
        showModalPosicionProductoLatoneria,
        setShowModalPosicionProductoLatoneria,
    ] = useState(false);
    const [posicionProductoIzquierdo, setPosicionProductoIzquierdo] =
        useState(false);
    const [posicionProductoCentro, setPosicionProductoCentro] = useState(false);
    const [posicionProductoDerecho, setPosicionProductoDerecho] =
        useState(false);
    const [
        showModalPosicionProductoHabitaculo,
        setShowModalPosicionProductoHabitaculo,
    ] = useState(false);
    const [posicionProductoConsola, setPosicionProductoConsola] =
        useState(false);
    const [posicionProductoAsiento, setPosicionProductoAsiento] =
        useState(false);
    const [posicionProductoTecho, setPosicionProductoTecho] = useState(false);
    const [showModalPosicionProductoMotor, setShowModalPosicionProductoMotor] =
        useState(false);

    const [sistemaMotorSeleccionado, setSistemaMotorSeleccionado] = useState(0);
    const [ubicacionProducto, setUbicacionProducto] = useState(0);
    const [posicionProducto, setPosicionProducto] = useState(0);
    const [habilitaSiguiente, setHabilitaSiguiente] = useState(true);
    const [habilitaSiguienteLatoneria, setHabilitaSiguienteLatoneria] =
        useState(true);
    const [habilitaSiguienteTrenMotriz, setHabilitaSiguienteTrenMotriz] =
        useState(true);
    const [textoUbicacionProducto, setTextoUbicacionProducto] = useState(
        "Ubicación del producto en tu vehículo"
    );

    const mostrarModalDatosProducto = () => {
        const newDet = [];
        let item = {
            ubicacionProducto: ubicacionProducto,
            posicionProducto: posicionProducto,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem(
            "ubicacionposicionproducto",
            JSON.stringify(newDet)
        );

        setShowModalLatoneria(true);
        setShowModalLatoneriaActiva(true);
        setSeleccionoUbicacionProducto(true);
        setAbrirCerarUbicarProducto(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoHabitaculo(false); ////ESTE PASAR A VERDADERo
        setUbicarProductoMotor(false);
        setShowDatosProductos(true);
        //setShowModalDatosProducto(false);
    };

    const abrirDatosUbicacionProucto = () => {
        if (tipoVehUno != 1) {
            setShowModalLatoneria(true);
            setShowModalLatoneriaActiva(true);
            setSeleccionoUbicacionProducto(true);
            setAbrirCerarUbicarProducto(false);

            if (ubicacionProducto == 1) setUbicarProductoLatoneria(true);

            if (ubicacionProducto == 2) setUbicarProductoHabitaculo(true);

            if (ubicacionProducto == 3) setUbicarProductoMotor(true);

            //setShowDatosProductos(false);
        } else {
            setShowModalLatoneria(true);
            setShowModalLatoneriaActiva(true);
            setSeleccionoUbicacionProducto(true);
            setAbrirCerarUbicarProducto(false);
            setUbicarProductoLatoneria(false);
            setUbicarProductoHabitaculo(false);
            setUbicarProductoMotor(false);
            //setShowDatosProductos(false);
        }
    };

    const mostrarComentariolatoneria = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(1);
    };

    const mostrarComentariohabitaculo = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(2);
    };

    const mostrarComentariomotor = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(3);
    };

    const SelecUbicarProductoLatoneria = () => {
        if (tipoVehUno != 1) {
            setUbicacionProducto(1);
            setUbicarProductoLatoneria(true);
            setUbicarProductoHabitaculo(false);
            setUbicarProductoMotor(false);
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
            setHabilitaSiguienteLatoneria(true);
            setHabilitaSiguiente(true);
            setHabilitaSiguienteTrenMotriz(true);
            setShowModalPosicionProductoLatoneria(true);
            setUbicarProducto(1);
            setShowModalDatosProducto(true);
        } else {
            mostrarModalDatosProducto();
            setShowModalDatosProducto(true);
            setPosicionProductoIzquierdo(false);
            setPosicionProductoCentro(false);
            setPosicionProductoDerecho(false);
            setHabilitaSiguienteLatoneria(true);
            setHabilitaSiguiente(true);
            setHabilitaSiguienteTrenMotriz(true);
            setTextoUbicacionProducto("Exterior");
        }

        setnombreUbicacionExterior("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionInterior("botonpartesvehiculo");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo");

        setnombreUbicacionExteriorInfo(
            "botonpartesvehiculoinfo mt-1 colorseleccionboton"
        );
        setnombreUbicacionInteriorInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionTrenMotrizInfo("botonpartesvehiculoinfo mt-1");
    };

    const SelecUbicarProductoHabitaculo = () => {
        setUbicacionProducto(2);
        setUbicarProductoHabitaculo(true);
        setUbicarProductoLatoneria(false);
        setUbicarProductoMotor(false);
        setShowImagenExterior(false);
        setShowConsolaBase(true);
        setShowImagenTrenMotriz(false);

        setHabilitaSiguienteLatoneria(true);
        setHabilitaSiguiente(true);
        setHabilitaSiguienteTrenMotriz(true);

        setShowModalPosicionProductoHabitaculo(true);
        setUbicarProducto(2);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo");
        setnombreUbicacionInterior("botonpartesvehiculo  colorseleccionboton");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo");

        setnombreUbicacionExteriorInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionInteriorInfo(
            "botonpartesvehiculoinfo mt-1  colorseleccionboton"
        );
        setnombreUbicacionTrenMotrizInfo("botonpartesvehiculoinfo mt-1");
    };

    const SelecUbicarProductoMotor = () => {
        if (tipoVehUno === 1) {
            setTextoUbicacionProducto("Tren Motriz");
        }
        setUbicacionProducto(3);
        setUbicarProductoMotor(true);
        setUbicarProductoHabitaculo(false);
        setUbicarProductoLatoneria(false);
        setShowImagenExterior(false);
        setShowImagenInterior(false);
        setShowImagenTrenMotriz(true);

        setHabilitaSiguienteLatoneria(true);
        setHabilitaSiguiente(true);
        setHabilitaSiguienteTrenMotriz(true);

        setShowModalPosicionProductoMotor(true);
        setUbicarProducto(3);
        setShowModalDatosProducto(true);

        setnombreUbicacionExterior("botonpartesvehiculo");
        setnombreUbicacionInterior("botonpartesvehiculo");
        setnombreUbicacionTrenMotriz("botonpartesvehiculo colorseleccionboton");

        setnombreUbicacionExteriorInfo("botonpartesvehiculoinfo mt-2");
        setnombreUbicacionInteriorInfo("botonpartesvehiculoinfo mt-2");
        setnombreUbicacionTrenMotrizInfo(
            "botonpartesvehiculoinfo mt-2 colorseleccionboton"
        );
    };

    const mostrarComentarioPosicionIzquierdo = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(4);
    };

    const mostrarComentarioPosicionCentro = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(5);
    };

    const mostrarComentarioPosicionDerecho = () => {
        setMostrarModalComentariosUbicacionProducto(true);
        setTextoPosicionUbicacionProducto(6);
    };

    const mostrarComentarioConsola = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(1);
    };

    const mostrarComentarioAsiento = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(2);
    };

    const mostrarComentarioTecho = () => {
        setMostrarModalComentariosHabitaculo(true);
        setTextoPosicionHabitaculo(3);
    };

    const SeleccionePosicionProductoIzquierdo = () => {
        setPosicionProducto(11);
        setPosicionProductoIzquierdo(true);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(false);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(true);
        setShowImagenCentro(false);
        setShowImagenDerecha(false);
        setTextoUbicacionProducto("Exterior - Izquierdo");
        setnombreUbicacionIzquierda("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionCentro("botonpartesvehiculo");
        setnombreUbicacionDerecha("botonpartesvehiculo");
        setnombreUbicacionIzquierdaInfo(
            "botonpartesvehiculoinfo mt-1 colorseleccionboton"
        );
        setnombreUbicacionCentroInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionDerechaInfo("botonpartesvehiculoinfo mt-1");
    };

    const SeleccionePosicionProductoCentro = () => {
        setPosicionProducto(12);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(true);
        setPosicionProductoDerecho(false);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(false);
        setShowImagenCentro(true);
        setShowImagenDerecha(false);
        setTextoUbicacionProducto("Exterior - Centro");

        setnombreUbicacionIzquierda("botonpartesvehiculo");
        setnombreUbicacionCentro("botonpartesvehiculo colorseleccionboton");
        setnombreUbicacionDerecha("botonpartesvehiculo");
        setnombreUbicacionIzquierdaInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionCentroInfo(
            "botonpartesvehiculoinfo mt-1 colorseleccionboton"
        );
        setnombreUbicacionDerechaInfo("botonpartesvehiculoinfo mt-1");
    };

    const SeleccionePosicionProductoDerecho = () => {
        setPosicionProducto(13);
        setPosicionProductoIzquierdo(false);
        setPosicionProductoCentro(false);
        setPosicionProductoDerecho(true);
        setHabilitaSiguienteLatoneria(false);
        setShowExteriorBase(false);
        setShowImagenIzquierda(false);
        setShowImagenCentro(false);
        setShowImagenDerecha(true);
        setTextoUbicacionProducto("Exterior - Derecha");

        setnombreUbicacionIzquierda("botonpartesvehiculo");
        setnombreUbicacionCentro("botonpartesvehiculo");
        setnombreUbicacionDerecha("botonpartesvehiculo  colorseleccionboton");
        setnombreUbicacionIzquierdaInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionCentroInfo("botonpartesvehiculoinfo mt-1");
        setnombreUbicacionDerechaInfo(
            "botonpartesvehiculoinfo mt-1  colorseleccionboton"
        );
    };

    const SeleccioneConsola = () => {
        setPosicionProducto(21);
        setPosicionProductoConsola(true);
        setPosicionProductoAsiento(false);
        setShowConsolaBase(false);
        setPosicionProductoTecho(false);
        setShowImagenConsola(true);
        setSeleccionoUbicacionConsola(
            "botonpartesvehiculo colorseleccionboton"
        );
        setSeleccionoUbicacionAsiento("botonpartesvehiculo");
        setSeleccionoUbicacionTecho("botonpartesvehiculo");
        setShowImagenAsiento(false);
        setShowImagenTecho(false);
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - Consola");
    };

    const SeleccioneAsiento = () => {
        setPosicionProducto(22);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(true);
        setPosicionProductoTecho(false);
        setShowConsolaBase(false);
        setShowImagenConsola(false);
        setShowImagenAsiento(true);
        setSeleccionoUbicacionAsiento(
            "botonpartesvehiculo colorseleccionboton"
        );
        setSeleccionoUbicacionConsola("botonpartesvehiculo");
        setSeleccionoUbicacionTecho("botonpartesvehiculo");
        setShowImagenTecho(false);
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - Asiento");
    };

    const SeleccioneTecho = () => {
        setPosicionProducto(23);
        setPosicionProductoConsola(false);
        setPosicionProductoAsiento(false);
        setPosicionProductoTecho(true);
        setShowImagenConsola(false);
        setShowConsolaBase(false);
        setShowImagenAsiento(false);
        setShowImagenTecho(true);
        setSeleccionoUbicacionTecho("botonpartesvehiculo colorseleccionboton");
        setSeleccionoUbicacionAsiento("botonpartesvehiculo");
        setSeleccionoUbicacionConsola("botonpartesvehiculo");
        setHabilitaSiguiente(false);
        setTextoUbicacionProducto("Interior - Techo");
    };

    const SeleccionBaseMotorElectrico = () => {
        setShowImagenBaseMotorElectrico(true);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        if (sistemaMotorSeleccionado == 0)
            setTextoUbicacionProducto("Motor Electrico - Base");
    };

    const SeleccionaAireAcondicionado = () => {
        setTextoUbicacionProducto("Motor Electrico - Aire Acondicionado");
        setSistemaMotorSeleccionado(1);
        setPosicionProducto(313);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(true);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);

        setIconoAireacondicionado(iconoaireacondicionadoseleccion);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const mouseAireAcondicionado = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(true);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaArranque = () => {
        setSistemaMotorSeleccionado(2);
        setPosicionProducto(314);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(true);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Arranque");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranqueseleccion);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseArranque = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(true);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaCaja = () => {
        setSistemaMotorSeleccionado(3);
        setPosicionProducto(310);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(true);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Caja");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajaseleccion);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseCaja = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(true);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaDireccion = () => {
        setSistemaMotorSeleccionado(4);
        setPosicionProducto(309);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(true);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Dirección");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodireccionseleccion);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseDireccion = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(true);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaEmbrague = () => {
        setSistemaMotorSeleccionado(5);
        setPosicionProducto(307);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(true);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Embrague");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembragueseleccion);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseEmbrague = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(true);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaEscape = () => {
        setSistemaMotorSeleccionado(6);
        setPosicionProducto(315);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(true);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Escape");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapeseleccion);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseEscape = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(true);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaFrenos = () => {
        setSistemaMotorSeleccionado(7);
        setPosicionProducto(305);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(true);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Frenos");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosseleccion);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseFrenos = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(true);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaInyeccion = () => {
        setSistemaMotorSeleccionado(8);
        setPosicionProducto(306);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(true);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Inyección");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyeccionseleccion);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseInyeccion = () => {
        setSistemaMotorSeleccionado(8);
        setPosicionProducto(306);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(true);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaMotor = () => {
        setSistemaMotorSeleccionado(9);
        setPosicionProducto(301);

        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(true);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Motor");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotorseleccion);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };

    const mouseMotor = () => {
        setShowImagenBaseMotorElectrico(false);

        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(true);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaParabrisas = () => {
        setSistemaMotorSeleccionado(10);
        setPosicionProducto(316);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(true);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Parabrisas");

        setIconoAireacondicionado(iconoaireacondicionadoseleccion);
        setIconoArranque(iconoarranqueseleccion);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasseleccion);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseParabrisas = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(true);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaRefrigeracion = () => {
        setSistemaMotorSeleccionado(11);
        setPosicionProducto(308);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(true);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Refrigeración");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeracionseleccion);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseRefrigeracion = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(true);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaRefrigeracionCaja = () => {
        setSistemaMotorSeleccionado(12);
        setPosicionProducto(311);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(true);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Caja");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajaseleccion);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseRefrigeracionCaja = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(true);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionasistemaElectrico = () => {
        setSistemaMotorSeleccionado(13);
        setPosicionProducto(304);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(true);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Sistema Eléctrico");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricoseleccion);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mousesistemaElectrico = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(true);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionasistemaElectricoMotor = () => {
        setSistemaMotorSeleccionado(14);
        setPosicionProducto(302);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(true);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Eléctrico Motor");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotorseleccion);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mousesistemaElectricoMotor = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(true);
        setShowImagensuspension(false);
        setShowImagenTransmision(false);
    };

    const SeleccionaSuspension = () => {
        setSistemaMotorSeleccionado(15);
        setPosicionProducto(303);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(true);
        setShowImagenTransmision(false);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Suspensión");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensionseleccion);
        setIconoTransmision(iconotransmisiondescarte);
    };
    const mouseSuspension = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(true);
        setShowImagenTransmision(false);
    };

    const SeleccionaTransmision = () => {
        setSistemaMotorSeleccionado(16);
        setPosicionProducto(312);
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(true);
        setHabilitaSiguienteTrenMotriz(false);
        setTextoUbicacionProducto("Motor Electrico - Transmisión");

        setIconoAireacondicionado(iconoaireacondicionadodescarte);
        setIconoArranque(iconoarranquedescarte);
        setIconoCaja(iconocajadescarte);
        setIconoDireccion(iconodirecciondescarte);
        setIconoEmbrague(iconoembraguedescarte);
        setIconoEscape(iconoescapedescarte);
        setIconoFrenos(iconofrenosdescarte);
        setIconoInyeccion(iconoinyecciondescarte);
        setIconoMotor(iconomotordescarte);
        setIconoParabrisas(iconoparabrisasdescarte);
        setIconoRefrigeracion(iconorefrigeraciondescarte);
        setIconoRefrigeracionCaja(iconorefrigeracioncajadescarte);
        setIconoSistemElectrico(iconosistemaelectricodescarte);
        setIconoSistemElectricoMotor(iconosistemaelectricomotordescarte);
        setIconosuspension(iconosuspensiondescarte);
        setIconoTransmision(iconotransmisionseleccion);
    };
    const mouseTransmision = () => {
        setShowImagenBaseMotorElectrico(false);
        setShowImagenAireacondicionado(false);
        setShowImagenArranque(false);
        setShowImagenCaja(false);
        setShowImagenDireccion(false);
        setShowImagenEmbrague(false);
        setShowImagenEscape(false);
        setShowImagenFrenos(false);
        setShowImagenInyeccion(false);
        setShowImagenMotor(false);
        setShowImagenParabrisas(false);
        setShowImagenRefrigeracion(false);
        setShowImagenRefrigeracionCaja(false);
        setShowImagenSistemElectrico(false);
        setShowImagenSistemElectricoMotor(false);
        setShowImagensuspension(false);
        setShowImagenTransmision(true);
    };

    const OnUbicacionExterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionExterior(
                "botonpartesvehiculo colorseleccionboton"
            );
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OffUbicacionExterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionExterior("botonpartesvehiculo");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnUbicacionInterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionInterior(
                "botonpartesvehiculo colorseleccionboton"
            );
            setShowImagenExterior(false);
            setShowImagenInterior(true);
            setShowImagenTrenMotriz(false);
        }
    };

    const OffUbicacionInterior = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionInterior("botonpartesvehiculo");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnTrenMotriz = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionTrenMotriz(
                "botonpartesvehiculo colorseleccionboton"
            );
            setShowImagenExterior(false);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(true);
        }
    };

    const OffOnTrenMotriz = () => {
        if (ubicacionProducto === 0) {
            setnombreUbicacionTrenMotriz("botonpartesvehiculo");
            setShowImagenExterior(true);
            setShowImagenInterior(false);
            setShowImagenTrenMotriz(false);
        }
    };

    const OnUbicacionIzquierda = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda(
                "botonpartesvehiculo colorseleccionboton"
            );
            setnombreUbicacionCentro("botonpartesvehiculo");
            setnombreUbicacionDerecha("botonpartesvehiculo");
            setShowImagenIzquierda(true);
            setShowImagenCentro(false);
            setShowImagenDerecha(false);
            setShowExteriorBase(false);
        }
    };

    const OffUbicacionTodos = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo");
            setnombreUbicacionCentro("botonpartesvehiculo");
            setnombreUbicacionDerecha("botonpartesvehiculo");
            setShowImagenIzquierda(false);
            setShowImagenCentro(false);
            setShowImagenDerecha(false);
            setShowExteriorBase(true);
        }
    };

    const OnUbicacionCentro = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo");
            setnombreUbicacionCentro(
                "botonpartesvehiculo  colorseleccionboton"
            );
            setnombreUbicacionDerecha("botonpartesvehiculo");
            setShowImagenIzquierda(false);
            setShowImagenCentro(true);
            setShowImagenDerecha(false);
            setShowExteriorBase(false);
        }
    };

    const OnUbicacionDerecha = () => {
        if (posicionProducto === 0) {
            setnombreUbicacionIzquierda("botonpartesvehiculo");
            setnombreUbicacionCentro("botonpartesvehiculo");
            setnombreUbicacionDerecha(
                "botonpartesvehiculo  colorseleccionboton"
            );
            setShowImagenIzquierda(false);
            setShowImagenCentro(false);
            setShowImagenDerecha(true);
            setShowExteriorBase(false);
        }
    };

    const OnUbicacionConsola = () => {
        console.log("VALOR POSICION : ", posicionProducto);
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola(
                "botonpartesvehiculo colorseleccionboton"
            );
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(false);
            setShowImagenConsola(true);
            setShowImagenAsiento(false);
            setShowImagenTecho(false);
        }
    };

    const OffUbicacionHabitaculoTodos = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(true);
            setShowImagenConsola(false);
            setShowImagenAsiento(false);
            setShowImagenTecho(false);
        }
    };

    const OnUbicacionAsiento = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento(
                "botonpartesvehiculo colorseleccionboton"
            );
            setSeleccionoUbicacionTecho("botonpartesvehiculo");
            setShowConsolaBase(false);
            setShowImagenConsola(false);
            setShowImagenAsiento(true);
            setShowImagenTecho(false);
        }
    };

    const OnUbicacionTecho = () => {
        if (posicionProducto === 0) {
            setSeleccionoUbicacionConsola("botonpartesvehiculo");
            setSeleccionoUbicacionAsiento("botonpartesvehiculo");
            setSeleccionoUbicacionTecho(
                "botonpartesvehiculo colorseleccionboton"
            );
            setShowConsolaBase(false);
            setShowImagenConsola(false);
            setShowImagenAsiento(false);
            setShowImagenTecho(true);
        }
    };

    return (
        <div className="mt-55">
            {showModalLatoneriaActiva ? (
                <div className="ps-page__header mtmenos60 ml-50 cajavehiculoscompatiblesproducto">
                    <div>
                        <ModalMensajes
                            shown={showModalMensajes}
                            close={setShowModalMensajes}
                            titulo={tituloMensajes}
                            mensaje={textoMensajes}
                            tipo="1"
                        />
                        <div>
                            <div className="ml-14 mb-20">
                                <h3 className="tituloadvertenciaproductosizquierda mb-15">
                                    Ubicación del producto en tu vehículo
                                </h3>
                            </div>
                            {!abrirCerarUbicarProducto ? (
                                <div className="ml-2">
                                    <div className="ml-10 mb-20">
                                        <h3 className="textotuproductoestaen">
                                            Tu producto está en:
                                        </h3>
                                    </div>
                                    <div className="ml-10">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        xs={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionExterior
                                                            }
                                                            onClick={
                                                                SelecUbicarProductoLatoneria
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionExterior()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionExterior()
                                                            }>
                                                            EXTERIOR
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        xs={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionExteriorInfo
                                                            }
                                                            onClick={
                                                                mostrarComentariolatoneria
                                                            }>
                                                            {!ubicarProductoLatoneria ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                {tipoVehUno != 1 ? (
                                                    <Row>
                                                        <Col
                                                            xl={8}
                                                            lg={8}
                                                            md={8}
                                                            xs={8}>
                                                            <Button
                                                                variant="outline-light"
                                                                className={
                                                                    nombreUbicacionInterior
                                                                }
                                                                onClick={
                                                                    SelecUbicarProductoHabitaculo
                                                                }
                                                                onMouseOver={() =>
                                                                    OnUbicacionInterior()
                                                                }
                                                                onMouseOut={() =>
                                                                    OffUbicacionInterior()
                                                                }>
                                                                INTERIOR
                                                            </Button>
                                                        </Col>
                                                        <Col
                                                            xl={1}
                                                            lg={1}
                                                            md={1}
                                                            xs={1}>
                                                            <Button
                                                                variant="outline-light"
                                                                className={
                                                                    nombreUbicacionInteriorInfo
                                                                }
                                                                onClick={
                                                                    mostrarComentariohabitaculo
                                                                }>
                                                                {!ubicarProductoHabitaculo ? (
                                                                    <i
                                                                        class="fa fa-info d-flex justify-content-center"
                                                                        aria-hidden="true"></i>
                                                                ) : (
                                                                    <i
                                                                        class="fa fa-check-square-o d-flex justify-content-center"
                                                                        aria-hidden="true"></i>
                                                                )}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        xs={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionTrenMotriz
                                                            }
                                                            onClick={
                                                                SelecUbicarProductoMotor
                                                            }
                                                            onMouseOver={() =>
                                                                OnTrenMotriz()
                                                            }
                                                            onMouseOut={() =>
                                                                OffOnTrenMotriz()
                                                            }>
                                                            TREN MOTRIZ
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        xl={1}
                                                        lg={1}
                                                        md={1}
                                                        xs={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionTrenMotrizInfo
                                                            }
                                                            onClick={
                                                                mostrarComentariomotor
                                                            }>
                                                            {!ubicarProductoMotor ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center mt-1"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {tipoVehUno != 1 ? (
                                                <Col
                                                    xl={6}
                                                    lg={6}
                                                    md={6}
                                                    xs={6}
                                                    className="ml-120 mtmenos20">
                                                    <Card.Body>
                                                        {showImagenExterior ? (
                                                            <Card.Img
                                                                width={60}
                                                                height={140}
                                                                className="ml-10"
                                                                src="/imgcarrusel/createproducto/exteriorbase.jpg"
                                                                alt="Card image"
                                                            />
                                                        ) : showImagenInterior ? (
                                                            <Card.Img
                                                                width={60}
                                                                height={180}
                                                                src="/imgcarrusel/createproducto/interior.jpg"
                                                                alt="Card image"
                                                            />
                                                        ) : showImagenTrenMotriz ? (
                                                            <Card.Img
                                                                width={60}
                                                                height={190}
                                                                className="mtmenos20"
                                                                src="/imgcarrusel/createproducto/trenmotrizbase.jpg"
                                                                alt="Card image"
                                                            />
                                                        ) : null}
                                                    </Card.Body>
                                                </Col>
                                            ) : (
                                                <Col
                                                    xl={5}
                                                    lg={5}
                                                    md={5}
                                                    xs={5}
                                                    className="ml-150 mtmenos35">
                                                    <Card.Body>
                                                        {showImagenExterior ? (
                                                            <Card.Img
                                                                src="/imgcarrusel/createproducto/motocicletas/basemotocicleta5.jpg"
                                                                alt="Card image"
                                                            />
                                                        ) : showImagenTrenMotriz ? (
                                                            <Card.Img
                                                                src="/imgcarrusel/createproducto/motocicletas/basemotocicleta3.jpg"
                                                                alt="Card image"
                                                            />
                                                        ) : null}
                                                    </Card.Body>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="App">
                            <ModalComentariosUbicacionProducto
                                shown={mostrarModalComentariosUbicacionProducto}
                                close={() => {
                                    setMostrarModalComentariosUbicacionProducto(
                                        false
                                    );
                                }}
                                texto={textoPosicionUbicacionProducto}
                            />
                        </div>

                        {showModalDatosProducto ? (
                            ubicarProductoLatoneria ? (
                                <div>
                                    <div className="ml-10 mt-20 mb-20">
                                        <Row>
                                            <Col xl={9} lg={9} md={9} sm={9}>
                                                <h3 className="ml-8 tituloadvertenciaproductosizquierda">
                                                    Escoge la posición en que se
                                                    encuentra tu producto:
                                                </h3>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="ml-14">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionIzquierda
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoIzquierdo
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionIzquierda()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            IZQUIERDO
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionIzquierdaInfo
                                                            }
                                                            onClick={
                                                                mostrarComentarioPosicionIzquierdo
                                                            }>
                                                            {!posicionProductoIzquierdo ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentro
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoCentro
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionCentro()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            CENTRO
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionCentroInfo
                                                            }
                                                            onClick={
                                                                mostrarComentarioPosicionCentro
                                                            }>
                                                            {!posicionProductoCentro ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        xl={8}
                                                        lg={8}
                                                        md={8}
                                                        sm={8}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionDerecha
                                                            }
                                                            onClick={
                                                                SeleccionePosicionProductoDerecho
                                                            }
                                                            onMouseOver={() =>
                                                                OnUbicacionDerecha()
                                                            }
                                                            onMouseOut={() =>
                                                                OffUbicacionTodos()
                                                            }>
                                                            DERECHA
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className={
                                                                nombreUbicacionDerechaInfo
                                                            }
                                                            onClick={
                                                                mostrarComentarioPosicionDerecho
                                                            }>
                                                            {!posicionProductoDerecho ? (
                                                                <i
                                                                    class="fa fa-info d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            ) : (
                                                                <i
                                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                                    aria-hidden="true"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col
                                                xl={6}
                                                lg={6}
                                                md={6}
                                                xs={6}
                                                className="ml-130 mtmenos10">
                                                <Card.Body>
                                                    {showExteriorBase ? (
                                                        <Card.Img
                                                            width={80}
                                                            height={140}
                                                            src="/imgcarrusel/createproducto/exteriorbase.jpg"
                                                            alt="Card image"
                                                        />
                                                    ) : showImagenIzquierda ? (
                                                        <Card.Img
                                                            width={60}
                                                            height={140}
                                                            src="/imgcarrusel/createproducto/izquierda.jpg"
                                                            alt="Card image"
                                                        />
                                                    ) : showImagenCentro ? (
                                                        <Card.Img
                                                            width={60}
                                                            height={140}
                                                            src="/imgcarrusel/createproducto/centro.jpg"
                                                            alt="Card image"
                                                        />
                                                    ) : showImagenDerecha ? (
                                                        <Card.Img
                                                            width={60}
                                                            height={140}
                                                            src="/imgcarrusel/createproducto/derecha.jpg"
                                                            alt="Card image"
                                                        />
                                                    ) : null}
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </div>
                                    <br />
                                    <div className="ml-605">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Button
                                                    className="ps-btn colorfonoazulbase"
                                                    disabled={
                                                        habilitaSiguienteLatoneria
                                                    }
                                                    onClick={() =>
                                                        mostrarModalDatosProducto()
                                                    }>
                                                    {" "}
                                                    Siguiente
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : ubicarProductoHabitaculo ? (
                                <div>
                                    <div>
                                        <Row>
                                            <Col
                                                xl={10}
                                                lg={10}
                                                md={10}
                                                sm={10}>
                                                <h3 className="ml-15 mt-15 mb-15 tituloadvertenciaproductosizquierda">
                                                    Escoge la posición en que se
                                                    encuentra tu producto:
                                                </h3>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <Col xl={4} lg={4} md={4} xs={4}>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionConsola
                                                        }
                                                        onClick={
                                                            SeleccioneConsola
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionConsola()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        CONSOLA
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <Button
                                                        variant="outline-light"
                                                        className="botonpartesvehiculoinfo mt-2"
                                                        onClick={
                                                            mostrarComentarioConsola
                                                        }>
                                                        {!posicionProductoConsola ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionAsiento
                                                        }
                                                        onClick={
                                                            SeleccioneAsiento
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionAsiento()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        ASIENTO
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <Button
                                                        variant="outline-light"
                                                        className="botonpartesvehiculoinfo mt-2"
                                                        onClick={
                                                            mostrarComentarioAsiento
                                                        }>
                                                        {!posicionProductoAsiento ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    lg={8}
                                                    xl={8}
                                                    xs={8}
                                                    md={8}>
                                                    <Button
                                                        variant="outline-light"
                                                        className={
                                                            seleccionoUbicacionTecho
                                                        }
                                                        onClick={
                                                            SeleccioneTecho
                                                        }
                                                        onMouseOver={() =>
                                                            OnUbicacionTecho()
                                                        }
                                                        onMouseOut={() =>
                                                            OffUbicacionHabitaculoTodos()
                                                        }>
                                                        TECHO
                                                    </Button>
                                                </Col>
                                                <Col
                                                    lg={1}
                                                    xl={1}
                                                    xs={1}
                                                    md={1}>
                                                    <Button
                                                        variant="outline-light"
                                                        className="botonpartesvehiculoinfo mt-2"
                                                        onClick={
                                                            mostrarComentarioTecho
                                                        }>
                                                        {!posicionProductoTecho ? (
                                                            <i
                                                                class="fa fa-info d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        ) : (
                                                            <i
                                                                class="fa fa-check-square-o d-flex justify-content-center"
                                                                aria-hidden="true"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col
                                            xl={6}
                                            lg={6}
                                            md={6}
                                            xs={6}
                                            className="mtmenos30 ml-120">
                                            <Card.Body>
                                                {showConsolaBase ? (
                                                    <Card.Img
                                                        width={70}
                                                        height={180}
                                                        src="/imgcarrusel/createproducto/interior.jpg"
                                                        alt="Card image"
                                                    />
                                                ) : showImagenConsola ? (
                                                    <Card.Img
                                                        width={60}
                                                        height={180}
                                                        src="/imgcarrusel/createproducto/consola.jpg"
                                                        alt="Card image"
                                                    />
                                                ) : showImagenAsiento ? (
                                                    <Card.Img
                                                        width={60}
                                                        height={180}
                                                        src="/imgcarrusel/createproducto/asientos.jpg"
                                                        alt="Card image"
                                                    />
                                                ) : showImagenTecho ? (
                                                    <Card.Img
                                                        width={60}
                                                        height={180}
                                                        src="/imgcarrusel/createproducto/techo.jpg"
                                                        alt="Card image"
                                                    />
                                                ) : null}
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                    <br />
                                    <hr />
                                    <div className="ml-615">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Button
                                                    className="ps-btn colorfonoazulbase"
                                                    disabled={habilitaSiguiente}
                                                    onClick={() =>
                                                        mostrarModalDatosProducto()
                                                    }>
                                                    {" "}
                                                    Siguiente
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : ubicarProductoMotor ? (
                                <div className="ml-55">
                                    {tipoVehUno != 1 ? (
                                        <div>
                                            <Row>
                                                <Col
                                                    xl={11}
                                                    lg={11}
                                                    md={11}
                                                    sm={11}>
                                                    <h3 className="tituloadvertenciaproductosizquierda mlmenos40 mt-20 mb-20">
                                                        Escoge el sistema en que
                                                        se encuentra tu
                                                        producto:
                                                    </h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Row>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaMotor
                                                            }
                                                            onMouseOver={() =>
                                                                mouseMotor()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoMotor.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaDireccion
                                                            }
                                                            onMouseOver={() =>
                                                                mouseDireccion()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoDireccion.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionasistemaElectricoMotor
                                                            }
                                                            onMouseOver={() =>
                                                                mousesistemaElectricoMotor()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoSistemElectricoMotor.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaCaja
                                                            }
                                                            onMouseOver={() =>
                                                                mouseCaja()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoCaja.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaSuspension
                                                            }
                                                            onMouseOver={() =>
                                                                mouseSuspension()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoSuspension.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracionCaja
                                                            }
                                                            onMouseOver={() =>
                                                                mouseRefrigeracionCaja()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoRefrigeracionCaja.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionasistemaElectrico
                                                            }
                                                            onMouseOver={() =>
                                                                mousesistemaElectrico()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoSistemElectrico.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaTransmision
                                                            }
                                                            onMouseOver={() =>
                                                                mouseTransmision()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoTransmision.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaFrenos
                                                            }
                                                            onMouseOver={() =>
                                                                mouseFrenos()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoFrenos.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaAireAcondicionado
                                                            }
                                                            onMouseOver={() =>
                                                                mouseAireAcondicionado()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoAireacondicionado.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaInyeccion
                                                            }
                                                            onMouseOver={() =>
                                                                mouseInyeccion()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoInyeccion.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaArranque
                                                            }
                                                            onMouseOver={() =>
                                                                mouseArranque()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoArranque.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaEmbrague
                                                            }
                                                            onMouseOver={() =>
                                                                mouseEmbrague()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoEmbrague.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaEscape
                                                            }
                                                            onMouseOver={() =>
                                                                mouseEscape()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src={
                                                                    iconoEscape.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracion
                                                            }
                                                            onMouseOver={() =>
                                                                mouseRefrigeracion()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoRefrigeracion.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="ml-20 iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaParabrisas
                                                            }
                                                            onMouseOver={() =>
                                                                mouseParabrisas()
                                                            }
                                                            onMouseOut={() =>
                                                                SeleccionBaseMotorElectrico()
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src={
                                                                    iconoParabrisas.src
                                                                }
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                                <Col
                                                    xl={10}
                                                    lg={10}
                                                    md={10}
                                                    xs={10}>
                                                    <Card.Body className="ml-45 mtmenos500">
                                                        {showImagenBaseMotorElectrico ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistemas
                                                                    Motor
                                                                    Eléctrico
                                                                </h3>
                                                                <Card.Img
                                                                    width="120px"
                                                                    height="290px"
                                                                    src="/static/img/createproducts/motorgeneral1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenAireacondicionado ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    acondicionado
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenArranque ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    arranque
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenCaja ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    caja
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenDireccion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    dirección
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenEmbrague ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    embrague
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenEscape ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    escape
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenFrenos ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    frenos
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenInyeccion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    inyeccion
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenMotor ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    motor
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenParabrisas ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    parabrisas
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenRefrigeracion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    refrigeración
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenRefrigeracionCaja ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    refrigeración
                                                                    caja
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSistemElectrico ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    Eléctrico
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSistemElectricoMotor ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    eléctrico
                                                                    motor
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSuspension ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    suspensión
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/uno1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenTransmision ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistemas de
                                                                    Transmisión
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/dos1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div>
                                            <Row>
                                                <Col
                                                    xl={10}
                                                    lg={10}
                                                    md={10}
                                                    sm={10}>
                                                    <h3 className="tituloadvertenciaproductosizquierda mt-10 mb-20">
                                                        Escoge el sistema en que
                                                        se encuentra tu
                                                        producto:
                                                    </h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Row>
                                                    <Col
                                                        lg={6}
                                                        xl={6}
                                                        xs={6}
                                                        md={6}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaMotor
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={65}
                                                                src="/imgcarrusel/createproducto/IconosInicial/motor.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={6}
                                                        xl={6}
                                                        xs={6}
                                                        md={6}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaCaja
                                                            }>
                                                            <img
                                                                className="ml-260"
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/caja.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>

                                                    <Col
                                                        lg={6}
                                                        xl={6}
                                                        xs={6}
                                                        md={6}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaSuspension
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/suspension.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={6}
                                                        xl={6}
                                                        xs={6}
                                                        md={6}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionasistemaElectrico
                                                            }>
                                                            <img
                                                                className="ml-260"
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/sistemaelectrico.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={6}
                                                        xl={6}
                                                        xs={6}
                                                        md={6}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaTransmision
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/transmision.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={1}
                                                        xl={1}
                                                        xs={1}
                                                        md={1}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaFrenos
                                                            }>
                                                            <img
                                                                className="ml-260"
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/frenos.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaInyeccion
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/inyeccion.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaArranque
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/arranque.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaEmbrague
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/embrague.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaEscape
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/escape.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracion
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/refrigeracion.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracion
                                                            }>
                                                            <img
                                                                width={60}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/sistemaelectricomotor.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>

                                                    <Col
                                                        lg={9}
                                                        xl={9}
                                                        xs={9}
                                                        md={9}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracion
                                                            }>
                                                            <img
                                                                width={70}
                                                                height={55}
                                                                src="/imgcarrusel/createproducto/IconosInicial/direccion.png"
                                                                alt="First slide"
                                                            />
                                                        </Button>
                                                    </Col>
                                                    <Col
                                                        lg={3}
                                                        xl={3}
                                                        xs={3}
                                                        md={3}>
                                                        <Button
                                                            variant="outline-light"
                                                            className="iconomotorelectricocrearproducto"
                                                            onClick={
                                                                SeleccionaRefrigeracion
                                                            }></Button>
                                                    </Col>
                                                </Row>

                                                <Col
                                                    xl={9}
                                                    lg={9}
                                                    md={9}
                                                    xs={9}
                                                    className="ml-20">
                                                    <Card.Body className="ml-60 mtmenos500">
                                                        {showImagenBaseMotorElectrico ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistemas
                                                                    Motor
                                                                    Eléctrico
                                                                </h3>
                                                                <Card.Img
                                                                    width="100px"
                                                                    height="220px"
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta6.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenArranque ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    arranque
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenCaja ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    caja
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenDireccion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    dirección
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenEmbrague ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    embrague
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenEscape ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    escape
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenFrenos ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    frenos
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenInyeccion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    inyeccion
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenMotor ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    motor
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenRefrigeracion ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    refrigeración
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSistemElectrico ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    Eléctrico
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSistemElectricoMotor ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema
                                                                    eléctrico
                                                                    motor
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenSuspension ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistema de
                                                                    suspensión
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta1.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : showImagenTransmision ? (
                                                            <div>
                                                                <h3 className="ml-60 seccionesvehiculotext">
                                                                    Sistemas de
                                                                    Transmisión
                                                                </h3>
                                                                <Card.Img
                                                                    src="/imgcarrusel/createproducto/motocicletas/basemotocicleta2.jpg"
                                                                    alt="Card image"
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </Card.Body>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                    <br />
                                    <hr />
                                    <div className="ml-530">
                                        <Row>
                                            <Col xl={4} lg={4} md={4} xs={4}>
                                                <Button
                                                    className="ps-btn colorfonoazulbase"
                                                    disabled={
                                                        habilitaSiguienteTrenMotriz
                                                    }
                                                    onClick={() =>
                                                        mostrarModalDatosProducto()
                                                    }>
                                                    {" "}
                                                    Siguiente
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : abrirCerarUbicarProducto ? (
                                <div className="ml-13">
                                    <Row>
                                        <Col xl={7} lg={7} md={7} xs={7}>
                                            <div
                                                className="ml-1 mt-1 datoscerrados"
                                                disabled={true}>
                                                <h3 className="textoubicacionproductomotos">
                                                    {textoUbicacionProducto}
                                                </h3>
                                            </div>
                                        </Col>
                                        <Col
                                            xl={1}
                                            lg={1}
                                            md={1}
                                            xs={1}
                                            className="ml-125 mtmenos2">
                                            <div className="showcerrarabrir">
                                                <i
                                                    class="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                                    onClick={
                                                        abrirDatosUbicacionProucto
                                                    }
                                                    aria-hidden="true"
                                                    ref={targetshow}
                                                    onMouseOver={() =>
                                                        setShowEdit(true)
                                                    }
                                                    onMouseOut={() =>
                                                        setShowEdit(false)
                                                    }></i>
                                            </div>

                                            <Overlay
                                                className=""
                                                target={targetshow.current}
                                                show={showEdit}
                                                placement="top">
                                                {(props) => (
                                                    <Tooltip
                                                        className="ubicartooltipproducto"
                                                        id="overlay-example"
                                                        {...props}>
                                                        <h3 className="tamañotextotooltipproducto">
                                                            {" "}
                                                            Ubicación de
                                                            producto{" "}
                                                        </h3>
                                                    </Tooltip>
                                                )}
                                            </Overlay>
                                        </Col>
                                    </Row>
                                </div>
                            ) : null
                        ) : null}

                        <div className="App">
                            <ModalComentariosHabitaculo
                                shown={mostrarModalComentariosHabitaculo}
                                close={() => {
                                    setMostrarModalComentariosHabitaculo(false);
                                }}
                                texto={textoPosicionHabitaculo}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function DatosProductos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        setShowDatosProductosActiva,
        showDatosProductosActiva,
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        generico,
        tituloInformacionProducto,
        setTituloInformacionProducto,
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [classPosicionCaja, setClassPosicionCaja] = useState("ml-250 mt-20");
    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const caracteristicasVeh = useSelector(
        (state) => state.vehiculoseleccionado.vehiculoseleccionado
    );

    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const [informacionProducto, setInformacionProducto] = useState(true);
    const [calificacionEstadoProducto, setCalificacionEstadoProducto] =
        useState(false);
    const [estadoUno, setEstadoUno] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoDos, setEstadoDos] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoTres, setEstadoTres] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCuatro, setEstadoCuatro] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [estadoCinco, setEstadoCinco] = useState(
        "ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog"
    );
    const [contarLetrasTitulo, setcontarLetrasTitulo] = useState(0);

    const [inputTituloProducto, setInputTituloProducto] = useState(
        "form-control ps-form__input baseinput sinborder"
    );
    const [inputMarcaProducto, setInputMarcaProducto] = useState(
        "form-control ps-form__input baseinput sinborder"
    );
    const [inputCondicionProducto, setInputCondicionProducto] = useState(
        "form-control ps-form__input"
    );
    const [inputNumParteProducto, setInputNumParteProducto] = useState(
        "form-control ps-form__input baseinput sinborder"
    );
    const [inputVenParteProducto, setInputVenParteProducto] = useState(
        "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
    );
    const [inputFuncionalidadProducto, setInputFuncionalidadProducto] =
        useState("form-control ps-form__input");
    const [inputEstadoProducto, setInputEstadoProducto] = useState("");
    const [classInformacionProducto, setClassInformacionProducto] = useState(
        "cajavehiculoscompatiblesproducto"
    );

    const [tituloEditar, setTituloEditar] = useState("");
    const [marcaEditar, setMarcaEditar] = useState("");
    const [condicionEditar, setCondicionEditar] = useState("");
    const [numeroparteEditar, setNumeroParteEditar] = useState("");
    const [vendeparteEditar, setVendeParteEditar] = useState("");
    const [funcionalidadEditar, setFuncionalidadEditar] = useState("");
    const [estadoEditar, setEstadoEditar] = useState("");

    useEffect(() => {
        if (generico == "No") {
            setClassPosicionCaja("ml-200");
            setClassInformacionProducto(
                "mt-20 cajavehiculoscompatiblesproducto"
            );
        } else {
            setClassPosicionCaja("ml-200 mtmenos55");
            setClassInformacionProducto(
                "mt-82 cajavehiculoscompatiblesproducto"
            );
        }
    }, []);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tituloOnChange = (e) => {
        //console.log("LONGITUD TITULO NOMBRE : ", e);
        var strLength = e.length;
        //console.log("LONGITUD : ", strLength);
        setcontarLetrasTitulo(strLength);

        if (strLength > 70) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 70 permitido!"
            );
            return;
        }
    };

    const calificacionproducto = [
        { label: "Baja", value: 1 },
        { label: "Regular", value: 2 },
        { label: "Buena", value: 3 },
        { label: "Excelente", value: 4 },
    ];

    const condicionproducto = [
        { label: "Nuevo", value: 1 },
        { label: "Usado", value: 2 },
    ];

    const porpartes = [
        { label: "Si se vende por partes", value: 1 },
        { label: "No, producto se vende completo", value: 2 },
    ];

    const iniciarTituloProducto = (e) => {
        setInputTituloProducto(
            "form-control ps-form__input baseinput sinborder"
        );
    };

    const marcaOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        //setContadorLetrasDescripcion(strLength);

        if (strLength > 30) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres de la marca supera el maximo de 30 permitido!"
            );
            return;
        }
    };

    const iniciarMarca = (e) => {
        setInputMarcaProducto(
            "form-control ps-form__input baseinput sinborder"
        );
    };

    const iniciarCondicion = (e) => {
        setInputCondicionProducto("form-control ps-form__input");
    };

    const iniciarNumParte = (e) => {
        setInputNumParteProducto(
            "form-control ps-form__input baseinput sinborder"
        );
    };

    const iniciarVendParte = (e) => {
        setInputVenParteProducto(
            "form-control ps-form__input tamañoinputdatosproducto mlmenos20"
        );
    };

    const iniciarFuncionalidad = (e) => {
        setInputFuncionalidadProducto("form-control ps-form__input");
    };

    const iniciarEstado = (e) => {
        setInputEstadoProducto("");
    };

    //setInputEstadoProducto("ps-form__group tamañoinputdatosproducto");

    const grabardatosadicionales = async (e) => {
        e.preventDefault();

        let valores = JSON.parse(localStorage.getItem("informacionproducto"));

        let funcionalidad = null;
        let condicion = null;
        let marcarepuesto = null;
        let numerodeparte = null;
        let titulonombre = null;
        let vendeporpartes = null;
        let estadoproducto = null;

        if (valores.length > 0 && !formData.titulonombre) {
            funcionalidad = valores[0].funcionalidad;
            condicion = valores[0].condicion;
            marcarepuesto = valores[0].marcarepuesto;
            numerodeparte = valores[0].numerodeparte;
            titulonombre = valores[0].titulonombre;
            vendeporpartes = valores[0].vendeporpartes;
            estadoproducto = valores[0].estadoproducto;
        } else {
            funcionalidad = formData.funcionalidad;
            condicion = formData.condicion;
            marcarepuesto = formData.marcarepuesto;
            numerodeparte = formData.numerodeparte;
            titulonombre = formData.titulonombre;
            vendeporpartes = formData.vendeporpartes;
            estadoproducto = calificacionEstadoProducto;
        }

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!titulonombre) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el titulo de la publicación!");
            setInputTituloProducto(
                "form-control ps-form__input baseinput alertboton"
            );
            errors.titulonombre = true;
            formOk = false;
        }

        if (!numerodeparte) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el numero de parte del producto!");
            setInputNumParteProducto(
                "form-control ps-form__input baseinput alertboton"
            );
            errors.titulonombre = true;
            formOk = false;
        }

        if (!marcarepuesto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Marca del Repuesto!");
            setInputMarcaProducto(
                "form-control ps-form__input baseinput  alertboton"
            );
            errors.marcarepuesto = true;
            formOk = false;
        }

        if (!vendeporpartes) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debe ingresar si el producto se vende por partes Si o No!"
            );
            setInputVenParteProducto(
                "form-control ps-form__input tamañoinputdatosproducto mlmenos20  alertboton"
            );
            errors.condicion = true;
            formOk = false;
        }

        if (!condicion) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Debe ingresar en que Condición esta el Producto!"
            );
            setInputCondicionProducto(
                "form-control ps-form__input  alertboton"
            );
            errors.condicion = true;
            formOk = false;
        }

        if (!calificacionproducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Calificación del producto!");
            setInputFuncionalidadProducto(
                "form-control ps-form__input  alertboton"
            );
            errors.calificacionproducto = true;
            formOk = false;
        }

        if (!calificacionEstadoProducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Estado del producto!");
            setInputEstadoProducto("alertbotonestadoproducto");
            errors.calificacionproducto = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk && valores.length == 0) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe Ingresar todos los datos del Producto!");
            return;
        }

        const newDet = [];
        let item = {
            funcionalidad: funcionalidad,
            condicion: condicion,
            marcarepuesto: marcarepuesto,
            numerodeparte: numerodeparte,
            titulonombre: titulonombre,
            vendeporpartes: vendeporpartes,
            estadoproducto: estadoproducto,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem("informacionproducto", JSON.stringify(newDet));

        //console.log("INFORMACION PRODUCTO : ", formData)
        onCloseModaDatosProductos();
    };

    const onCloseModaDatosProductos = () => {
        setShowDatosProductosAdicionales(true);
        //setShowDatosProductosActiva(false)
        setInformacionProducto(false);
    };

    const onChangeCondicion = (event) => {
        setCondicionEditar(event);
    };

    const onChangeFuncionalidad = (event) => {
        setFuncionalidadEditar(event);
    };

    const onChangeEstado = (event) => {
        setEstadoEditar(event);
    };

    const onChangeVendePartes = (event) => {
        setVendeParteEditar(event);
    };

    const onOpenModaDatosProductos = () => {
        //setShowDatosProductosAdicionales(false);
        let valores = null;
        valores = JSON.parse(localStorage.getItem("informacionproducto"));

        if (valores) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
            setInformacionProducto(true);
        }
    };

    useEffect(() => {
        let valores = JSON.parse(localStorage.getItem("informacionproducto"));
        console.log("VALORES : ", valores);

        if (valores.length > 0) {
            setTituloEditar(valores[0].titulonombre);
            setMarcaEditar(valores[0].marcarepuesto);
            setCondicionEditar(valores[0].condicion);
            setNumeroParteEditar(valores[0].numerodeparte);
            setVendeParteEditar(valores[0].vendeporpartes);
            setFuncionalidadEditar(valores[0].funcionalidad);
            setEstadoEditar(valores[0].estadoproducto);
        }
    }, [marcaEditar]);

    const offCalificacionEstado = () => {
        if (!calificacionEstadoProducto) {
            setEstadoUno("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
            setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        }
    };

    const OncalificacionEstadoUno = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoDos = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoTres = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCuatro = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const OncalificacionEstadoCinco = () => {
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    const calificacionEstadoUno = () => {
        setCalificacionEstadoProducto(1);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoDos = () => {
        setCalificacionEstadoProducto(2);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoTres = () => {
        setCalificacionEstadoProducto(3);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCuatro = () => {
        setCalificacionEstadoProducto(4);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 tamañoiconoestadoproducto fa fa-cog");
    };

    const calificacionEstadoCinco = () => {
        setCalificacionEstadoProducto(5);
        setEstadoUno("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoDos("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoTres("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCuatro("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
        setEstadoCinco("ml-3 mt-2 selecticonoestadoproducto fa fa-cog");
    };

    return (
        <div className={classPosicionCaja}>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            {informacionProducto ? (
                <div className={classInformacionProducto}>
                    <h3 className={tituloInformacionProducto}>
                        Información sobre tu producto.
                    </h3>
                    <form onChange={onChange}>
                        <div className="ml-8 ps-form--review">
                            <Row>
                                <Col xl={12} lg={12} md={12} xs={12}>
                                    <div className="ps-form__group inputdatosproducto">
                                        <label className="ps-form__label">
                                            * Titulo publicación
                                        </label>
                                        <input
                                            className={inputTituloProducto}
                                            placeholder="Escribre el nombre del producto y las características más relevantes"
                                            name="titulonombre"
                                            defaultValue={tituloEditar}
                                            onClick={(e) =>
                                                iniciarTituloProducto()
                                            }
                                            onChange={(e) =>
                                                tituloOnChange(e.target.value)
                                            }
                                            type="text"
                                        />
                                        <h4 className="ml-650 mt-1">
                                            {contarLetrasTitulo} {"/"} 70
                                        </h4>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mtmenos20">
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <div
                                        className={
                                            "ps-form__group tamañoinputdatosproducto ml-3"
                                        }>
                                        <label className="ps-form__label">
                                            * Marca del Repuesto
                                        </label>
                                        <input
                                            className={inputMarcaProducto}
                                            defaultValue={marcaEditar}
                                            onChange={(e) =>
                                                marcaOnChange(e.target.value)
                                            }
                                            onClick={(e) => iniciarMarca()}
                                            placeholder="Ingresa la marca del producto"
                                            name="marcarepuesto"
                                            type="text"
                                        />
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={4} xs={4}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-110">
                                        <label className="ps-form__label">
                                            * Condición
                                        </label>
                                        <div className={inputCondicionProducto}>
                                            <select
                                                className="custom-select ps-form__labelselect colortextoselect"
                                                value={condicionEditar}
                                                onChange={(e) =>
                                                    onChangeCondicion(
                                                        e.target.value
                                                    )
                                                }
                                                onClick={(e) =>
                                                    iniciarCondicion()
                                                }
                                                name="condicion">
                                                <option
                                                    selected
                                                    className="select-fontsize ps-form__label">
                                                    Selecciona la condición de
                                                    tu producto
                                                </option>
                                                {condicionproducto &&
                                                    condicionproducto.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            Número de Parte
                                        </label>
                                        <input
                                            className={inputNumParteProducto}
                                            name="numerodeparte"
                                            defaultValue={numeroparteEditar}
                                            onClick={(e) => iniciarNumParte()}
                                            placeholder="Ingresa número de parte del producto"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                inputComponent:
                                                    NumberFormatCelular,
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <label className="mlmenos15 ps-form__label">
                                        Vende por partes
                                    </label>
                                    <div className={inputVenParteProducto}>
                                        <select
                                            className="custom-select ps-form__labelselect colortextoselect"
                                            onClick={(e) => iniciarVendParte()}
                                            value={vendeparteEditar}
                                            onChange={(e) =>
                                                onChangeVendePartes(
                                                    e.target.value
                                                )
                                            }
                                            name="vendeporpartes">
                                            <option
                                                selected
                                                className="select-fontsize ps-form__label">
                                                Por partes Si o No
                                            </option>
                                            {porpartes &&
                                                porpartes.map((itemselect) => {
                                                    return (
                                                        <option
                                                            value={
                                                                itemselect.value
                                                            }>
                                                            {itemselect.label}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div className="ps-form__group tamañoinputdatosproducto ml-3">
                                        <label className="ps-form__label">
                                            Escala de funcionalidad
                                        </label>
                                        <div
                                            className={
                                                inputFuncionalidadProducto
                                            }>
                                            <select
                                                className="colortextoselect custom-select ps-form__labelselect"
                                                onClick={(e) =>
                                                    iniciarFuncionalidad()
                                                }
                                                value={funcionalidadEditar}
                                                onChange={(e) =>
                                                    onChangeFuncionalidad(
                                                        e.target.value
                                                    )
                                                }
                                                name="funcionalidad">
                                                <option
                                                    selected
                                                    className="select-fontsize ps-form__label">
                                                    Selecciona
                                                </option>
                                                {calificacionproducto &&
                                                    calificacionproducto.map(
                                                        (itemselect) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        itemselect.value
                                                                    }>
                                                                    {
                                                                        itemselect.label
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className={
                                            "ps-form__group mlmenos20 tamañoinputestadoproducto alertboton"
                                        }>
                                        <label className="ps-form__label">
                                            Estado del producto
                                        </label>
                                        <div
                                            className={inputEstadoProducto}
                                            value={estadoEditar}
                                            onChange={(e) =>
                                                onChangeEstado(e.target.value)
                                            }
                                            onClick={(e) => iniciarEstado()}>
                                            <div className="ml-20">
                                                <Row>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            class={estadoUno}
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoUno()
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoUno()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            class={estadoDos}
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoDos(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoDos()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            class={estadoTres}
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoTres(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoTres()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            class={estadoCuatro}
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoCuatro(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCuatro()
                                                            }></i>
                                                    </Col>
                                                    <Col
                                                        xl={2}
                                                        lg={2}
                                                        md={2}
                                                        xs={2}>
                                                        <i
                                                            class={estadoCinco}
                                                            onMouseOver={() =>
                                                                OncalificacionEstadoCinco(
                                                                    true
                                                                )
                                                            }
                                                            onMouseOut={() =>
                                                                offCalificacionEstado()
                                                            }
                                                            onClick={() =>
                                                                calificacionEstadoCinco()
                                                            }></i>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            {caracteristicasVeh.productogenerico === "Si" ? (
                                <div className="ps-form__group">
                                    <label className="ps-form__label">
                                        Con que Vehiculos es Compatible
                                    </label>
                                    <input
                                        className="form-control ps-form__input"
                                        name="compatible"
                                        type="text"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </form>

                    <div className="botongrabarproducto mtmenos10">
                        <Row>
                            <Col xl={9} lg={9} md={9} xs={9}>
                                <div>
                                    <p className="ml-10 ps-form__text ">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={2} lg={2} md={2} xs={2}>
                                <div
                                    className="ml-18 ps-btn"
                                    onClick={grabardatosadicionales}>
                                    Siguiente
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={classInformacionProducto}>
                        <h3 className="ml-15 tituloadvertenciaproductosizquierda">
                            Información sobre el producto
                        </h3>
                        <div className="ml-14">
                            <Row>
                                <Col xl={6} lg={6} md={6} xs={6}>
                                    <div
                                        className="mt-1 datoscerrados"
                                        disabled={true}>
                                        <h3 className="textoubicacionproductodos">
                                            {formData.titulonombre
                                                ? formData.titulonombre
                                                : tituloEditar
                                                ? tituloEditar
                                                : null}
                                        </h3>
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="ml-190 mtmenos2">
                                    <div className="showcerrarabrir">
                                        <i
                                            class="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                            onClick={onOpenModaDatosProductos}
                                            aria-hidden="true"
                                            ref={targetshow}
                                            onMouseOver={() =>
                                                setShowEdit(true)
                                            }
                                            onMouseOut={() =>
                                                setShowEdit(false)
                                            }></i>
                                    </div>

                                    <Overlay
                                        className=""
                                        target={targetshow.current}
                                        show={showEdit}
                                        placement="top">
                                        {(props) => (
                                            <Tooltip
                                                className="ubicartooltipproducto"
                                                id="overlay-example"
                                                {...props}>
                                                <h3 className="tamañotextotooltipproducto">
                                                    {" "}
                                                    Información del producto{" "}
                                                </h3>
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DatosProductosAdicionales(props) {
    const {
        SelecDatosProducto,
        setSelecDatosProducto,
        showDatosProductosAdicionales,
        setShowDatosProductosAdicionales,
        showIngresoFotos,
        setShowIngresoFotos,
        categoria,
        setCategoria,
        quantity,
        setQuantity,
    } = props;

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);
    const [datosPublicacion, setDatosPublicacion] = useState(true);
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const [inputDescripcionProducto, setInputDescripcionProducto] = useState(
        "form-control ps-form__input descripcionproducto"
    );
    const [inputNumeroUnidades, setInputNumeroUnidades] = useState(
        "form-control ps-form__input tamañoinputpublicacion ml-10"
    );
    const [inputPrecio, setInputPrecio] = useState(
        "form-control ps-form__input tamañoinputpublicacion eliminarborde mlmenos15"
    );
    const [inputPeso, setInputPeso] = useState(
        "form-control ps-form__input tamañoinputpublicacion eliminarborde"
    );
    const [inputLargo, setInputLargo] = useState(
        "form-control ps-form__input tamañoinputpublicacion eliminarborde"
    );
    const [inputAncho, setInputAncho] = useState(
        "form-control ps-form__input tamañoinputpublicacion eliminarborde"
    );
    const [inputAltura, setInputAltura] = useState(
        "form-control ps-form__input tamañoinputpublicacion mlmenos10 eliminarborde"
    );

    const [textoDescripcion, setTextoDescripcion] = useState("");
    const [entre, setEntre] = useState(true);
    const [ingresaPrecio, setIngresaPrecio] = useState(0);
    const [contadorLetrasDescripcion, setContadorLetrasDescripcion] =
        useState(0);

    const [descripcionEditar, setDescripcionEditar] = useState("");
    const [unidadesEditar, setUnidadesEditar] = useState("");
    const [precioEditar, setPrecioEditar] = useState("");
    const [pesoEditar, setPesoEditar] = useState("");
    const [largoEditar, setLargoEditar] = useState("");
    const [anchoEditar, setAnchoEditar] = useState("");
    const [alturaEditar, setAlturaEditar] = useState("");

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        //console.log("CATEGORIA : 0, categoria")
        if (categoria === 1) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir para que sirve tu producto"
            );
        } else if (categoria === 2) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 3) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir el material de tu producto, disponibilidad de colores, y medidas."
            );
        } else if (categoria === 4) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la potencia y especificaciones técnicas del producto."
            );
        } else if (categoria === 5) {
            setTextoDescripcion(
                "Aquí puedes escribir el voltaje, amperaje, lúmenes, referencia, entre otros elementos que consideres relevantes."
            );
        } else if (categoria === 6) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir la referencia del producto, como son: 5W30, 20W50, 15W40, 25W60, dot4, entre otros."
            );
        } else if (categoria === 7) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el ancho (mm), alto (mm-%), rin, índice de carga, indice de velocidad."
            );
        } else if (categoria === 8) {
            setTextoDescripcion(
                "Sugerencia: Puedes escribir el amperaje, ancho, alto, y largo, y el tipo de vehículo para el cual sirve"
            );
        } else if (categoria === 9) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes escribir la longitud de las plumillas en pulgadas"
            );
        } else if (categoria === 10) {
            setTextoDescripcion(
                "Sugerencia: Aquí puedes describir el contenido del kit, las características o materiales del producto."
            );
        } else
            setTextoDescripcion(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    const datosAdicionalesProducto = async (e) => {
        e.preventDefault();
        //console.log("FORM DATA : ", formData);

        setFormError({});
        let errors = {};
        let formOk = true;

        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        let alto = null;
        let ancho = null;
        let descripcionproducto = null;
        let largo = null;
        let numerodeunidades = null;
        let peso = null;
        let precio = null;

        if (valores.length > 0 && !formData.descripcionproducto) {
            alto = valores[0].alto;
            ancho = valores[0].ancho;
            descripcionproducto = valores[0].descripcionproducto;
            largo = valores[0].largo;
            numerodeunidades = valores[0].numerodeunidades;
            peso = valores[0].peso;
            precio = valores[0].precio;
        } else {
            alto = formData.alto;
            ancho = formData.ancho;
            descripcionproducto = formData.descripcionproducto;
            largo = formData.largo;
            numerodeunidades = formData.numerodeunidades;
            peso = formData.peso;
            precio = formData.precio;
        }

        if (numerodeunidades == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar Número de Unidades del producto!");
            setInputNumeroUnidades(
                "form-control ps-form__input tamañoinputpublicacion ml-10 alertboton"
            );
            errors.numerodeunidades = true;
            formOk = false;
        }

        if (!precio || precio == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el precio del producto!");
            setInputPrecio(
                "form-control ps-form__input tamañoinputpublicacion alertboton lmenos15"
            );
            errors.precio = true;
            formOk = false;
        }

        let validavalor = formData.precio;

        if (!descripcionproducto) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la Descripción del producto!");
            setInputDescripcionProducto(
                "form-control ps-form__input descripcionproducto alertboton"
            );
            errors.descripcionproducto = true;
            formOk = false;
        }

        if (!peso || peso == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el peso del producto!");
            setInputPeso(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.peso = true;
            formOk = false;
        }

        if (!largo || largo == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar longitud del producto");
            setInputLargo(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.largo = true;
            formOk = false;
        }

        if (!alto || alto == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar la altura del producto");
            setInputAltura(
                "form-control ps-form__input tamañoinputpublicacion mlmenos10 alertboton"
            );
            errors.alto = true;
            formOk = false;
        }

        if (!ancho || ancho == 0) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Debe ingresar el ancho del producto");
            setInputAncho(
                "form-control ps-form__input tamañoinputpublicacion alertboton"
            );
            errors.ancho = true;
            formOk = false;
        }

        setFormError(errors);
        //console.log("FORM OK : ", formOk)

        if (!formOk) {
            setLoading(true);
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Para lograr mayor visibilidad debes ingresar los datos del producto !"
            );
            return;
        }

        //console.log("DATOS PUBLICACION : ", formData);
        const newDet = [];
        let item = {
            alto: alto,
            ancho: ancho,
            descripcionproducto: descripcionproducto,
            largo: largo,
            numerodeunidades: numerodeunidades,
            peso: peso,
            precio: precio,
        };
        newDet.push(item);
        //setSistemaMotorSeleccionado(1);
        localStorage.setItem(
            "datospublicacionproducto",
            JSON.stringify(newDet)
        );

        onCloseModalDatosPublicacion();
    };

    const onCloseModalDatosPublicacion = () => {
        setShowIngresoFotos(true);
        setDatosPublicacion(false);
    };

    const onOpenModalDatosPublicacion = () => {
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );
        setDescripcionEditar(valores[0].descripcionproducto);
        setUnidadesEditar(valores[0].numerodeunidades);
        setPrecioEditar(valores[0].precio);
        setPesoEditar(valores[0].peso);
        setLargoEditar(valores[0].largo);
        setAnchoEditar(valores[0].ancho);
        setAlturaEditar(valores[0].alto);

        //setShowIngresoFotos(false);
        setDatosPublicacion(true);
    };

    useEffect(() => {
        let valores = JSON.parse(
            localStorage.getItem("datospublicacionproducto")
        );

        if (valores.length > 0) {
            setDescripcionEditar(valores[0].descripcionproducto);
            setUnidadesEditar(valores[0].numerodeunidades);
            setPrecioEditar(valores[0].precio);
            setPesoEditar(valores[0].peso);
            setLargoEditar(valores[0].largo);
            setAnchoEditar(valores[0].ancho);
            setAlturaEditar(valores[0].alto);
        }
    }, [precioEditar]);

    const iniciarInputUnidades = (e) => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
    };

    const iniciarInputPrecio = (e) => {
        setInputPrecio(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde lmenos15"
        );
    };

    const iniciarInputPeso = (e) => {
        setInputPeso(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };

    const iniciarInputLargo = (e) => {
        setInputLargo(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };
    const iniciarInputAncho = (e) => {
        setInputAncho(
            "form-control ps-form__input tamañoinputpublicacion eliminarborde"
        );
    };
    const iniciarInputAltura = (e) => {
        setInputAltura(
            "form-control ps-form__input tamañoinputpublicacion mlmenos10 eliminarborde"
        );
    };

    const IncrementItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
        let contador = quantity + 1;
        //console.log("VALOR : ", contador)
        setQuantity(contador);

        setFormData({
            ...formData,
            [formData.numerodeunidades]: contador,
        });
    };

    const DecreaseItem = () => {
        setInputNumeroUnidades(
            "form-control ps-form__input tamañoinputpublicacion ml-10"
        );
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (event) => {
        //console.log("VALOR : ", variable);

        if (isNaN(parseInt(event))) {
            setQuantity(0);
        } else setQuantity(parseInt(event));
    };

    const iniciarDescripcionproducto = (e) => {
        setInputDescripcionProducto(
            "form-control ps-form__input descripcionproducto"
        );
    };

    const descripcionOnChange = (e) => {
        //console.log("LONGITUD DESCRIPCION : ", e);
        var strLength = e.length;
        //console.log("DESCRIPCION : ", strLength);
        setContadorLetrasDescripcion(strLength);

        if (strLength > 180) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de caracteres supera el maximo de 180 permitido!"
            );
            return;
        }
    };

    const validaPrecio = (precio) => {
        //console.log("Precio : ", formData.precio);
        //setInputControlTelefono("form-control ps-form__input");
        setIngresaPrecio(formData.precio);

        let validavalor = formData.precio;

        let validarprecio;
        let haycaracterid = false;
        for (var i = 0; i < validavalor.length; i++) {
            validarprecio = validavalor.substr(i, 1);
            if (
                validarprecio != 0 &&
                validarprecio != 1 &&
                validarprecio != 2 &&
                validarprecio != 3 &&
                validarprecio != 4 &&
                validarprecio != 5 &&
                validarprecio != 6 &&
                validarprecio != 7 &&
                validarprecio != 8 &&
                validarprecio != 9
            ) {
                haycaracterid = true;
                console.log("CARACTER", i, validarprecio);
            } else console.log("ES UN NUMERO ", i, validarprecio);
        }

        if (haycaracterid) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Por favor ingresa el precio, sin separadores o caracteres especiales!"
            );
            return;
        }
    };

    const precioSinFormato = () => {
        setEntre(false);
    };

    return (
        <div className="ps-page__header ml-250 mt-25">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            {datosPublicacion ? (
                <div className="mlmenos60 cajavehiculoscompatiblesproducto">
                    <div>
                        <h3 className="ml-16 tituloadvertenciaproductosizquierda">
                            Datos de la publicación.
                        </h3>
                    </div>
                    <form onChange={onChange}>
                        <div className="ps-form--review">
                            <div className="ps-form__group inputdatosproductoadicional">
                                <Row>
                                    <Col lg={12} xl={12} md={12} xs={12}>
                                        <div className="ps-form__group inputdatosproductoadicional mt-10">
                                            <label className="mlmenos3 ps-form__label">
                                                Descripción del producto
                                            </label>
                                            <textarea
                                                className={
                                                    inputDescripcionProducto
                                                }
                                                placeholder={textoDescripcion}
                                                defaultValue={descripcionEditar}
                                                name="descripcionproducto"
                                                onClick={(e) =>
                                                    iniciarDescripcionproducto()
                                                }
                                                onChange={(e) =>
                                                    descripcionOnChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                            />
                                            <h4 className="ml-650 mt-1">
                                                {contadorLetrasDescripcion}{" "}
                                                {"/"} 180
                                            </h4>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className="mtmenos10">
                                    <Col lg={6} xl={6} md={6} xs={6}>
                                        <label className="ml-12 ps-form__label">
                                            Número de Unidades
                                        </label>
                                        <div className={inputNumeroUnidades}>
                                            <button
                                                className="eliminarborde baseinput"
                                                type="button"
                                                onClick={DecreaseItem}>
                                                <i className="fa fa-minus"></i>
                                            </button>

                                            <NumberFormat
                                                className="ml-50 eliminarborde colordelfondo"
                                                name="numerodeunidades"
                                                defaultValue={unidadesEditar}
                                                value={quantity}
                                                onChange={(e) =>
                                                    handleChange(e.target.value)
                                                }
                                                onClick={() =>
                                                    iniciarInputUnidades()
                                                }
                                                placeholder="Ingrese número de unidades"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />

                                            <button
                                                className="ml-40 eliminarborde baseinput"
                                                type="button"
                                                onClick={IncrementItem}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </Col>
                                    {entre ? (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <label className="mlmenos5 ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                //variant="outline-light"
                                                className={inputPrecio}
                                                onMouseOut={precioSinFormato}
                                                defaultValue={precioEditar}
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                name="precio"
                                                onBlur={(e) =>
                                                    validaPrecio(e.target.value)
                                                }
                                                placeholder="Ingrese precio del producto"
                                                //thousandSeparator={true}
                                                //prefix={"$"}
                                            />
                                        </Col>
                                    ) : (
                                        <Col lg={6} xl={6} md={6} xs={6}>
                                            <label className="mlmenos5 ps-form__label">
                                                Precio del producto
                                            </label>
                                            <NumberFormat
                                                defaultValue={precioEditar}
                                                className={inputPrecio}
                                                onClick={() =>
                                                    iniciarInputPrecio()
                                                }
                                                //onMouseClick={precioConFormato}
                                                //onMouseOver={precioConFormato}
                                                name="precio"
                                                placeholder="Ingrese precio del producto"
                                                thousandSeparator={true}
                                                //prefix={"$"}
                                            />
                                        </Col>
                                    )}
                                </Row>

                                <div className="ps-form__group inputdatosproductoadicional mt-10">
                                    <Row>
                                        <Col lg={5} xl={5} md={5} xs={5}>
                                            <label className="ps-form__label">
                                                Peso del producto
                                            </label>
                                            <NumberFormat
                                                className={inputPeso}
                                                defaultValue={pesoEditar}
                                                onClick={() =>
                                                    iniciarInputPeso()
                                                }
                                                name="peso"
                                                placeholder="Ingrese peso del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34 baseinput">
                                            <h3 className="ml-15 textomedidas">
                                                Kg
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-2">
                                            <label className="ml-10 ps-form__label">
                                                Largo del producto
                                            </label>
                                            <NumberFormat
                                                className={inputLargo}
                                                defaultValue={largoEditar}
                                                name="largo"
                                                onClick={() =>
                                                    iniciarInputLargo()
                                                }
                                                placeholder="Longitud del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-34 baseinput">
                                            <h3 className="ml-70 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={5}
                                            xl={5}
                                            md={5}
                                            xs={5}
                                            className="mt-20">
                                            <label className="ps-form__label">
                                                Ancho del producto
                                            </label>
                                            <NumberFormat
                                                className={inputAncho}
                                                defaultValue={anchoEditar}
                                                name="ancho"
                                                onClick={() =>
                                                    iniciarInputAncho()
                                                }
                                                placeholder="Ancho del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mlmenos5 mt-53 baseinput">
                                            <h3 className="ml-12 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                        <Col
                                            lg={4}
                                            xl={4}
                                            md={4}
                                            xs={4}
                                            className="ml-16 mt-20">
                                            <label className="ps-form__label">
                                                Altura del producto
                                            </label>
                                            <NumberFormat
                                                className={inputAltura}
                                                defaultValue={alturaEditar}
                                                name="alto"
                                                onClick={() =>
                                                    iniciarInputAltura()
                                                }
                                                placeholder="Altura del producto en"
                                                thousandSeparator={true}
                                                prefix={""}
                                            />
                                        </Col>
                                        <Col
                                            lg={1}
                                            xl={1}
                                            md={1}
                                            xs={1}
                                            className="medidastipounidad mt-53 ml-45 baseinput">
                                            <h3 className="ml-60 textomedidas">
                                                Cm
                                            </h3>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="botongrabaradicionalproducto">
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <div>
                                    <p className="ps-form__text">
                                        * Datos Requeridos.
                                    </p>
                                </div>
                            </Col>
                            <Col xl={8} lg={8} md={8} xs={8}>
                                <div
                                    className="ps-btn tamañoinputpublicacion ml-100"
                                    onClick={datosAdicionalesProducto}>
                                    Vamos al ingreso de fotos del producto
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div className="mlmenos60 mt-25 cajainformacionprouctos">
                    <h3 className="ml-15 tituloadvertenciaproductosizquierda">
                        Datos publicación.
                    </h3>
                    <div>
                        <Row>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div
                                    className="ml-15 mt-1 datoscerrados"
                                    disabled={true}>
                                    <h3 className="textoubicacionproducto">
                                        Precio del producto $ {formData.precio}
                                    </h3>
                                </div>
                            </Col>
                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                xs={1}
                                className="mtmenos2 ml-197">
                                <div className="showcerrarabrir">
                                    <i
                                        class="colortextoselect mt-2 fa fa-angle-down d-flex justify-content-center"
                                        onClick={onOpenModalDatosPublicacion}
                                        aria-hidden="true"
                                        ref={targetshow}
                                        onMouseOver={() => setShowEdit(true)}
                                        onMouseOut={() =>
                                            setShowEdit(false)
                                        }></i>
                                </div>

                                <Overlay
                                    className=""
                                    target={targetshow.current}
                                    show={showEdit}
                                    placement="top">
                                    {(props) => (
                                        <Tooltip
                                            className="ubicartooltipproducto"
                                            id="overlay-example"
                                            {...props}>
                                            <h3 className="tamañotextotooltipproducto">
                                                {" "}
                                                Datos publicación{" "}
                                            </h3>
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </div>
    );
}

function defaultValueForm() {
    return {
        id: null,
        productogenerico: null,
        tipoVeh: null,
        carroceria: null,
        marca: null,
        anno: null,
        modelo: null,
        cilindrajemotor: null,
        tipocombustible: null,
        transmision: null,
        partedelVeh: null,
        posicionproducto: null,
        titulonombre: null,
        marcarepuesto: null,
        condicion: null,
        funcionalidad: null,
        estadoproducto: null,
        numerodeunidades: null,
        precio: null,
        numerodeparte: null,
        compatible: null,
        descripcionproducto: null,
        vendeporpartes: null,
        peso: null,
        largo: null,
        ancho: null,
        alto: null,
        tipotraccion: null,
        turbocompresor: null,
        descuento: null,
        usuario: null,
        moneda: null,
        estado: null,
        numerodeimagenes: null,
        nombreimagen1: null,
        nombreimagen2: null,
        nombreimagen3: null,
        nombreimagen4: null,
        nombreimagen5: null,
        nombreimagen6: null,
        nombreimagen7: null,
        nombreimagen8: null,
        nombreimagen9: null,
        nombreimagen10: null,
    };
}

export default CreateProduct;
