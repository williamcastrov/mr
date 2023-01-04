import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
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
import InfoIcon from "@material-ui/icons/Info";
import ModalComentariosCategorias from "./ModalComentariosCategorias";

function CategoriasProductosGenericos(props) {
    const {
        setShowDatosProductos,
        showDatosProductos,
        abrirCerrarCategoriasGenerico,
        setAbrirCerrarCategoriasGenerico,
        categoria,
        setCategoria,
    } = props;
    const router = useRouter();
    const [showEdit, setShowEdit] = useState(false);
    const targetshow = useRef(null);

    const [nombreEstetico, setnombreEstetico] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreInterior, setnombreInterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreExterior, setnombreExterior] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreSonido, setnombreSonido] = useState("botoncategoriasgenerico");
    const [nombreIluminacion, setnombreIluminacion] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLubricantes, setnombreLubricantes] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreLlantas, setnombreLlantas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreBaterias, setnombreBaterias] = useState(
        "botoncategoriasgenerico"
    );
    const [nombrePlumillas, setnombrePlumillas] = useState(
        "botoncategoriasgenerico"
    );
    const [nombreKit, setnombreKit] = useState("botoncategoriasgenerico");

    const [nombreUbicacionExteriorInfo, setnombreUbicacionExteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionInteriorInfo, setnombreUbicacionInteriorInfo] =
        useState("botonpartesvehiculoinfo mt-2");
    const [nombreUbicacionTrenMotrizInfo, setnombreUbicacionTrenMotrizInfo] =
        useState("botonpartesvehiculoinfo mt-2");

    const [modalLubricantesFluidos, setmodalLubricantesFluidos] =
        useState(false);
    const [modalEsteticos, setmodalEsteticos] = useState(false);
    const [modalLlantasRines, setmodalLlantasRines] = useState(false);
    const [modalIluminacion, setmodalIluminacion] = useState(false);
    const [modalKitCarretera, setmodalKitCarretera] = useState(false);
    const [modalBaterias, setmodalBaterias] = useState(false);
    const [modalPlumillas, setmodalPlumillas] = useState(false);
    const [modalInterior, setmodalInterior] = useState(false);
    const [modalExterior, setmodalExterior] = useState(false);
    const [modalSonido, setmodalSonido] = useState(false);
    const [habilitaSiguiente, setHabilitaSiguiente] = useState(true);
    const [classHabilitaSiguiente, setClassHabilitaSiguiente] = useState(
        "ps-btn baseinput colortextoselect"
    );

    const [lubricantesFluidos, setLubricantesFluidos] = useState(false);

    const [ubicarProductoHabitaculo, setUbicarProductoHabitaculo] =
        useState(false);
    const [ubicarProductoMotor, setUbicarProductoMotor] = useState(false);
    const [abrirCerarUbicarProducto, setAbrirCerarUbicarProducto] =
        useState(false);
    const [showModalComentariosCategoria, setShowModalComentariosCategoria] =
        useState(false);

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [classInfoEstetico, setClassInfoEstetico] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoExterior, setClassInfoExterior] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoInterior, setClassInfoInterior] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoSonido, setClassInfoSonido] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoIluminacion, setClassInfoIluminacion] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoLubricantes, setClassInfoLubricantes] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoLlantas, setClassInfoLlantas] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoBaterias, setClassInfoBaterias] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoPlumillas, setClassInfoPlumillas] = useState(
        "iconoinfomaterialproducto"
    );
    const [classInfoKit, setClassInfoKit] = useState(
        "iconoinfomaterialproducto"
    );

    useEffect(() => {
        if (categoria == 1) {
            setCategoriaSeleccionada("Estéticos y cuidados del vehículo");
        } else if (categoria == 2) {
            setCategoriaSeleccionada("Accesorios interior ");
        } else if (categoria == 3) {
            setCategoriaSeleccionada("Accesorios exterior");
        } else if (categoria == 4) {
            setCategoriaSeleccionada("Sistemas de sonido y entretenimiento");
        } else if (categoria == 5) {
            setCategoriaSeleccionada("Herramientas y kit de carreteras");
        } else if (categoria == 6) {
            setCategoriaSeleccionada("Lubricantes y fluidos");
        } else if (categoria == 7) {
            setCategoriaSeleccionada("Llantas y rines");
        } else if (categoria == 8) {
            setCategoriaSeleccionada("Baterías");
        } else if (categoria == 9) {
            setCategoriaSeleccionada("Plumillas");
        } else if (categoria == 10) {
            setCategoriaSeleccionada(
                "Iluminación, exploradoras y partes eléctricas"
            );
        } else
            setCategoriaSeleccionada(
                "Suegerencia: Aquí puedes ingresar información relacionada con tu producto."
            );
    }, [categoria]);

    useEffect(() => {
        router.push("/CreateProduct/createproduct#categorias");
    }, []);

    const comentarioEsteticos = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada("Estéticos y cuidados del vehículo");
        setCategoria(1);
    };

    const onEsteticos = () => {
        setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(1);

        setClassInfoEstetico("iconoinfomaterialproductoselect");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioInterior = () => {
        setShowModalComentariosCategoria(true);
        setCategoriaSeleccionada("Accesorios interior ");
        setCategoria(2);
    };

    const onInterior = () => {
        setnombreInterior("botoncategoriasgenerico colorseleccionboton");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(2);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproductoselect");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioExterior = () => {
        setCategoriaSeleccionada("Accesorios exterior");
        setShowModalComentariosCategoria(true);
        setCategoria(3);
    };

    const onExterior = () => {
        setnombreExterior("botoncategoriasgenerico colorseleccionboton");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(3);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproductoselect");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioSonido = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(4);
        setCategoriaSeleccionada("Sistemas de sonido y entretenimiento");
    };

    const onSonido = () => {
        setnombreSonido("botoncategoriasgenerico colorseleccionboton");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(4);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproductoselect");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioIluminacion = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(5);
        setCategoriaSeleccionada(
            "Iluminación, exploradoras y partes eléctricas"
        );
    };

    const onIluminacion = () => {
        setnombreIluminacion("botoncategoriasgenerico colorseleccionboton");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(5);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproductoselect");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioLubricantesFluidos = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(6);
        setCategoriaSeleccionada("Lubricantes y fluidos");
    };

    const onLubricantesFluidos = () => {
        setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(6);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproductoselect");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioLlantasRines = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(7);
        setCategoriaSeleccionada("Llantas y rines");
    };

    const onLlantasRines = () => {
        setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(7);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproductoselect");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioBaterias = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(8);
        setCategoriaSeleccionada("Baterías");
    };

    const onBaterias = () => {
        setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(8);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproductoselect");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioPlumillas = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(9);
        setCategoriaSeleccionada("Plumillas");
    };

    const onPlumillas = () => {
        setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setnombreKit("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(9);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproductoselect");
        setClassInfoKit("iconoinfomaterialproducto");
    };

    const comentarioKitCarretera = () => {
        setShowModalComentariosCategoria(true);
        setCategoria(10);
        setCategoriaSeleccionada("Herramientas y kit de carreteras");
    };

    const Out = () => {
        if (!categoria) {
            setnombreKit("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
        }
    };

    const onKitCarretera = () => {
        setnombreKit("botoncategoriasgenerico colorseleccionboton");
        setnombrePlumillas("botoncategoriasgenerico");
        setnombreBaterias("botoncategoriasgenerico");
        setnombreLlantas("botoncategoriasgenerico");
        setnombreLubricantes("botoncategoriasgenerico");
        setnombreIluminacion("botoncategoriasgenerico");
        setnombreSonido("botoncategoriasgenerico");
        setnombreExterior("botoncategoriasgenerico");
        setnombreInterior("botoncategoriasgenerico");
        setnombreEstetico("botoncategoriasgenerico");
        setHabilitaSiguiente(false);
        setClassHabilitaSiguiente("ps-btn");
        setCategoria(10);

        setClassInfoEstetico("iconoinfomaterialproducto");
        setClassInfoExterior("iconoinfomaterialproducto");
        setClassInfoInterior("iconoinfomaterialproducto");
        setClassInfoSonido("iconoinfomaterialproducto");
        setClassInfoIluminacion("iconoinfomaterialproducto");
        setClassInfoLubricantes("iconoinfomaterialproducto");
        setClassInfoLlantas("iconoinfomaterialproducto");
        setClassInfoBaterias("iconoinfomaterialproducto");
        setClassInfoPlumillas("iconoinfomaterialproducto");
        setClassInfoKit("iconoinfomaterialproductoselect");
    };

    const mostrarModalDatosProducto = () => {
        setShowDatosProductos(true);
        setAbrirCerrarCategoriasGenerico(!abrirCerrarCategoriasGenerico);
    };

    const mostrarModalDatosProductoEditar = () => {
        //setShowDatosProductos(!showDatosProductos);
        setAbrirCerrarCategoriasGenerico(!abrirCerrarCategoriasGenerico);
    };

    const onEsteticosOver = () => {
        if (!categoria) {
            setnombreEstetico("botoncategoriasgenerico colorseleccionboton");
            setnombreInterior("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onInteriorOver = () => {
        if (!categoria) {
            setnombreInterior("botoncategoriasgenerico colorseleccionboton");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onExteriorOver = () => {
        if (!categoria) {
            setnombreExterior("botoncategoriasgenerico colorseleccionboton");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onSonidoOver = () => {
        if (!categoria) {
            setnombreSonido("botoncategoriasgenerico   colorseleccionboton");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onIluminacionOver = () => {
        if (!categoria) {
            setnombreIluminacion(
                "botoncategoriasgenerico  colorseleccionboton"
            );
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onLubricantesFluidosOver = () => {
        if (!categoria) {
            setnombreLubricantes("botoncategoriasgenerico colorseleccionboton");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onLlantasRinesOver = () => {
        if (!categoria) {
            setnombreLlantas("botoncategoriasgenerico colorseleccionboton");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onBateriasOver = () => {
        if (!categoria) {
            setnombreBaterias("botoncategoriasgenerico colorseleccionboton");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onPlumillasOver = () => {
        if (!categoria) {
            setnombrePlumillas("botoncategoriasgenerico colorseleccionboton");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
            setnombreKit("botoncategoriasgenerico");
        }
    };

    const onKitCarreteraOver = () => {
        if (!categoria) {
            setnombreKit("botoncategoriasgenerico colorseleccionboton");
            setnombrePlumillas("botoncategoriasgenerico");
            setnombreBaterias("botoncategoriasgenerico");
            setnombreLlantas("botoncategoriasgenerico");
            setnombreLubricantes("botoncategoriasgenerico");
            setnombreIluminacion("botoncategoriasgenerico");
            setnombreSonido("botoncategoriasgenerico");
            setnombreExterior("botoncategoriasgenerico");
            setnombreInterior("botoncategoriasgenerico");
            setnombreEstetico("botoncategoriasgenerico");
        }
    };

    return (
        <div id="categorias">
            {abrirCerrarCategoriasGenerico ? (
                <div>
                    <h3 className="ml-10 tituloadvertenciaproductos">
                        Escoge la categoría
                    </h3>
                    <div className="ml-19 mt-4">
                        <Row>
                            <Col xl={12} lg={12} md={12} xs={12}>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreEstetico}
                                            onClick={() => onEsteticos()}
                                            onMouseOver={onEsteticosOver}
                                            onMouseOut={Out}>
                                            Estéticos y cuidados del vehículo
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioEsteticos}>
                                            {!modalEsteticos ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoEstetico
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreInterior}
                                            onClick={onInterior}
                                            onMouseOver={onInteriorOver}
                                            onMouseOut={Out}>
                                            Accesorios interior
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioInterior}>
                                            {!modalInterior ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoInterior
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreExterior}
                                            onClick={onExterior}
                                            onMouseOver={onExteriorOver}
                                            onMouseOut={Out}>
                                            Accesorios exterior
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioExterior}>
                                            {!modalExterior ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoExterior
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreSonido}
                                            onClick={onSonido}
                                            onMouseOver={onSonidoOver}
                                            onMouseOut={Out}>
                                            Sistemas de sonido y entretenimiento
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioSonido}>
                                            {!modalSonido ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={classInfoSonido}
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreLubricantes}
                                            onClick={onLubricantesFluidos}
                                            onMouseOver={
                                                onLubricantesFluidosOver
                                            }
                                            onMouseOut={Out}>
                                            Lubricantes y fluidos
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={
                                                comentarioLubricantesFluidos
                                            }>
                                            {!modalLubricantesFluidos ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoLubricantes
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreLlantas}
                                            onClick={onLlantasRines}
                                            onMouseOver={onLlantasRinesOver}
                                            onMouseOut={Out}>
                                            Llantas y rines
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioLlantasRines}>
                                            {!modalLlantasRines ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={classInfoLlantas}
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreBaterias}
                                            onClick={onBaterias}
                                            onMouseOver={onBateriasOver}
                                            onMouseOut={Out}>
                                            Baterías
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioBaterias}>
                                            {!modalBaterias ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoBaterias
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombrePlumillas}
                                            onClick={onPlumillas}
                                            onMouseOver={onPlumillasOver}
                                            onMouseOut={Out}>
                                            Plumillas
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioPlumillas}>
                                            {!modalPlumillas ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoPlumillas
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreKit}
                                            onClick={onKitCarretera}
                                            onMouseOver={onKitCarreteraOver}
                                            onMouseOut={Out}>
                                            Herramientas y kit de carreteras
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioKitCarretera}>
                                            {!modalKitCarretera ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={classInfoKit}
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={9} lg={9} md={9} xs={9}>
                                        <Button
                                            variant="outline-light"
                                            className={nombreIluminacion}
                                            onClick={onIluminacion}
                                            onMouseOver={onIluminacionOver}
                                            onMouseOut={Out}>
                                            Iluminación, exploradoras y partes
                                            eléctricas genéricas
                                        </Button>
                                    </Col>
                                    <Col xl={1} lg={1} md={1} xs={1}>
                                        <div
                                            className="fondodivinfomaterial"
                                            onClick={comentarioIluminacion}>
                                            {!modalIluminacion ? (
                                                <InfoIcon
                                                    style={{ fontSize: 30 }}
                                                    className={
                                                        classInfoIluminacion
                                                    }
                                                />
                                            ) : (
                                                <i
                                                    class="fa fa-check-square-o d-flex justify-content-center"
                                                    aria-hidden="true"></i>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="mt-20 ml-605">
                        <Row>
                            <Col xl={4} lg={4} md={4} xs={4}>
                                <Button
                                    variant="outline-light"
                                    className={classHabilitaSiguiente}
                                    disabled={habilitaSiguiente}
                                    onClick={() => mostrarModalDatosProducto()}>
                                    {" "}
                                    Siguiente
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="ml-10">
                        <h3 className="ml-2 tituloadvertenciaproductosizquierda">
                            Categoría seleccionada
                        </h3>
                    </div>
                    <Row>
                        <Col xl={6} lg={6} md={6} xs={6}>
                            <div
                                className="ml-18 mt-1 datoscerradosgenericos"
                                disabled={true}>
                                <h3 className="textoubicacionproducto">
                                    {categoriaSeleccionada}
                                </h3>
                            </div>
                        </Col>
                        <Col
                            xl={1}
                            lg={1}
                            md={1}
                            xs={1}
                            className="ml-200 mtmenos2">
                            <div className="showcerrarabrir">
                                <i
                                    class="mt-2 fa fa-angle-down d-flex justify-content-center"
                                    onClick={() =>
                                        mostrarModalDatosProductoEditar()
                                    }
                                    aria-hidden="true"
                                    ref={targetshow}
                                    onMouseOver={() => setShowEdit(true)}
                                    onMouseOut={() => setShowEdit(false)}></i>
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
                                            Ubicación de producto{" "}
                                        </h3>
                                    </Tooltip>
                                )}
                            </Overlay>
                        </Col>
                    </Row>
                </div>
            )}

            {
                //console.log("CATEGORIA : ", categoria)
            }

            <div className="App">
                <ModalComentariosCategorias
                    shown={showModalComentariosCategoria}
                    close={() => {
                        setShowModalComentariosCategoria(false);
                    }}
                    categoria={categoria}
                />
            </div>
        </div>
    );
}

export default CategoriasProductosGenericos;
