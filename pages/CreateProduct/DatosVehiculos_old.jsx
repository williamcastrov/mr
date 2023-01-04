import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form, Input } from "react-bootstrap";
import Loading from "~/components/elements/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import shortid from "shortid";
import ModalMensajes from "../mensajes/ModalMensajes";
import ModalMensajesValidar from "../mensajes/ModalMensajesValidar";
import ReactTooltip from "react-tooltip";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}>
        {children}
        &#x25bc;
    </a>
));

const people = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin",
];

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
        const [value, setValue] = useState("");

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}>
                <Form.Control
                    autoFocus
                    className="my-2 tamañocajaoptionsitemssearchdos"
                    placeholder="Buscar"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value ||
                            child.props.children
                                .toString()
                                .toLowerCase()
                                .startsWith(value) ||
                            child.props.children.toString().startsWith(value)
                    )}
                </ul>
            </div>
        );
    }
);

function DatosVehiculos(props) {
    const [searchTerm, setSearchTerm] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const {
        vehiculoUnoCrear,
        setVehiculoUnoCrear,
        vehiculoUnoEditar,
        setVehiculoUnoEditar,
        vehiculoUnoDuplicar,
        setVehiculoUnoDuplicar,
        vehiculoUnoSelecc,
        setVehiculoUnoSelecc,
        agregarVehiculo,
        setAgregarVehiculo,
        setAgregarDatos,
        agregarDatos,
        setDuplicar,
        duplicar,
        vehiculoUnoUbicar,
        setVehiculoUnoUbicar,
        setTipoVehUno,
        setMarcaVehUno,
        setAnnoVehUno,
        setModeloVehUno,
        setCarroceriaVehUno,
        setcilindrajeVehUno,
        settransmisionVehUno,
        setcombustibleVehUno,
        settraccionVehUno,
        tipoVehUno,
        showTraccion,
        setShowTraccion,
        showTransmision,
        setShowTransmision,
        controlAgregarVehiculo,
        setControlAgregarVehiculo,
        vehiculosSeleccionados,
        setVehiculosSeleccionados,
        vehiculoBorrar,
        setVehiculoBorrar,
        setEliminoDatos,
        eliminoDatos,
        controlAccion,
        setControlAccion,
        contador,
        setContador,
        controlDuplicar,
        setControlDuplicar,
        dataannos,
        tipoVehiculoSeleccionado,
        settipoVehiculoSeleccionado,
        marcaVehUno,
        annoVehUno,
        modeloVehUno,
        carroceriaVehUno,
        cilindrajeVehUno,
        transmisionVehUno,
        combustibleVehUno,
        traccionVehUno,
        nuevoVehiculo,
        setNuevoVehiculo,
    } = props;

    // Asignar nombreUno de las opciones seleccionadas en lo vehiculos
    const [vehiculos, setVehiculos] = useState([]);
    const [annos, setAnnos] = useState([]);
    const [listMarcas, setListMarcas] = useState([]);
    const [listCarrocerias, setListCarrocerias] = useState([]);
    const [listModelos, setListModelos] = useState([]);
    const [listCilindrajes, setListCilindrajes] = useState([]);

    const [selectTipo, setSelectTipo] = useState("Tipo Vehículo");
    const [selectCarroceria, setSelectCarroceria] = useState("Carroceria");
    const [selectMarca, setSelectMarca] = useState("Marca");
    const [selectAnno, setSelectAnno] = useState("Año");
    const [selectModelo, setSelectModelo] = useState("Modelo");
    const [continuarRegistro, setContinuarRegistro] = useState(false);
    const [abandonarRegistro, setAbandonarRegistro] = useState(false);
    const [selectCilindraje, setSelectCilindraje] = useState("Cilindraje");
    const [selectTransmision, setSelectTransmision] = useState("Transmisión");
    const [selectCombustible, setSelectCombustible] = useState("Combustible");
    const [selectTraccion, setSelectTraccion] = useState("Tracción");

    const [alertTipo, setAlertTipo] = useState("ml-2 alinearizquierda");
    const [alertCarroceria, setAlertCarroceria] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertMarca, setAlertMarca] = useState("ml-2 alinearizquierda");
    const [alertAnno, setAlertAnno] = useState("tamañocajaoptionsitemssearch");
    const [alertModelo, setAlertModelo] = useState("ml-2 alinearizquierda");
    const [alertCilindraje, setAlertCilindraje] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertTransmision, setAlertTransmision] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertCombustible, setAlertCombustible] = useState(
        "ml-2 alinearizquierda"
    );
    const [alertTraccion, setAlertTraccion] = useState("ml-2 alinearizquierda");

    // Caracteristicas seleccionadas por vehiculo
    const [tipoVeh, setTipoVeh] = useState(null);
    const [marcaVeh, setMarcaVeh] = useState(null);
    const [annoVeh, setAnnoVeh] = useState(null);
    const [modeloVeh, setModeloVeh] = useState(null);
    const [cilindrajesVeh, setCilindrajesVeh] = useState(null);
    const [carroceriaVeh, setCarroceriaVeh] = useState(null);
    const [transmisionVeh, setTransmisionVeh] = useState(null);
    const [combustibleVeh, setCombustibleVeh] = useState(null);
    const [traccionVeh, setTraccionVeh] = useState(null);

    //Validar que se ingresen todas las caracteristicas de los veh
    const [controlGrabar, setcontrolGrabar] = useState(false);

    // Caracteristicas seleccionadas por vehiculo
    const [editarTipo, setEditarTipo] = useState(false);
    const [editarCarroceria, setEditarCarroceria] = useState(false);
    const [editarMarca, setEditarMarca] = useState(false);
    const [editarModelo, setEditarModelo] = useState(false);

    const [editarVehiculo, setEditarVehiculo] = useState(false);

    const [editarTipoVeh, setEditarTipoVeh] = useState([]);
    const [editarMarcaVeh, setEditarMarcaVeh] = useState([]);
    const [editarAnnoVeh, setEditarAnnoVeh] = useState([]);
    const [editarModeloVeh, setEditarModeloVeh] = useState([]);
    const [editarCilindrajesVeh, setEditarCilindrajesVeh] = useState([]);
    const [editarCarroceriaVeh, setEditarCarroceriaVeh] = useState([]);
    const [editarTransmisionVeh, setEditarTransmisionVeh] = useState([]);
    const [editarCombustibleVeh, setEditarCombustibleVeh] = useState([]);
    const [editarTraccionVeh, setEditarTraccionVeh] = useState([]);

    // En la eidición del vehículo controlar el cambio de las caracteristicas
    const [editarCambioCarroceria, setEditarCambioCarroceria] = useState(0);
    const [editarCambioMarca, setEditarCambioMarca] = useState(0);
    const [editarCambioModelo, setEditarCambioModelo] = useState(0);
    const [editarCambioCilindraje, setEditarCambioCilindraje] = useState(0);
    const [editarCambioAnno, setEditarCambioAnno] = useState(0);
    const [editarCambioTransmision, setEditarCambioTransmision] = useState(0);

    const [editarControlCarroceria, setEditarControlCarroceria] = useState(0);
    const [editarControlMarca, setEditarControlMarca] = useState(0);
    const [editarControlModelo, setEditarControlModelo] = useState(0);
    const [editarControlCilindraje, setEditarControlCilindraje] = useState(0);
    const [editarControlAnno, setEditarControlAnno] = useState(0);
    const [editarControlCombustible, setEditarControlCombustible] = useState(0);
    const [editarControlTransmision, setEditarControlTransmision] = useState(0);
    const [editarControlTraccion, setEditarControlTraccion] = useState(0);

    // Caracteristicas seleccionadas por vehiculo
    const [nombreTipoVeh, setNombreTipoVeh] = useState(null);
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState(null);
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState(null);
    const [nombreModeloVeh, setNombreModeloVeh] = useState(null);
    const [nombreCilindrajesVeh, setNombreCilindrajesVeh] = useState(null);
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState(null);
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState(null);
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState(null);
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState(null);

    //Control si cambio algun valor del vehiculo duplicado
    const [tipoVehDuplica, setTipoVehDuplica] = useState(null);
    const [marcaVehDuplica, setMarcaVehDuplica] = useState(null);
    const [annoVehDuplica, setAnnoVehDuplica] = useState(null);
    const [modeloVehDuplica, setModeloVehDuplica] = useState(null);
    const [cilindrajesVehDuplica, setCilindrajesVehDuplica] = useState(null);
    const [carroceriaVehDuplica, setCarroceriaVehDuplica] = useState(null);
    const [transmisionVehDuplica, setTransmisionVehDuplica] = useState(null);
    const [combustibleVehDuplica, setCombustibleVehDuplica] = useState(null);
    const [traccionVehDuplica, setTraccionVehDuplica] = useState(null);

    // Inicializamos el arrego de Tipos de Vehiculos
    const [marcas, setMarcas] = useState([]);
    const [carrocerias, setCarrocerias] = useState([]);
    const [cilindrajes, setCilindrajes] = useState([]);
    const [modelos, setModels] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    const [showCopy, setShowCopy] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const targetedit = useRef(null);
    const targetcopy = useRef(null);
    const targetdelete = useRef(null);
    const [cambia, setCambia] = useState(false);
    const [showModalMensajesValidar, setShowModalMensajesValidar] =
        useState(false);
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);
    const [cambio, setCambio] = useState(false);
    const [habilitarTipo, setHabilitarTipo] = useState(false);

    // Lee modelos de los Vehiculos del state
    const datoscrearproductosmodelos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_modelosvehiculos
    );

    // Lee modelos de los Vehiculos del state
    const datoscrearproductoscilindrajes = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales.vgl_cilindrajesvehiculos
    );

    const handleChangeNvaMarca = (e) => {
        setSearchTerm(e);

        const results = people.filter((person) =>
            person.toLowerCase().includes(e)
        );

        //console.log("VALOR : ",results)
        setSearchResults(results);
    };

    useEffect(() => {
        if (vehiculoBorrar && !duplicar && !vehiculoUnoEditar) {
            setVehiculoBorrar(false);
        }
    }, [vehiculoBorrar]);

    useEffect(() => {
        if (contador > 1) setHabilitarTipo(true);
        setSelectTipo(tipoVehiculoSeleccionado);
    }, [vehiculoUnoCrear]);

    useEffect(() => {
        if (vehiculoUnoCrear) {
            let dato = [];
            localStorage.setItem("informacionproducto", JSON.stringify(dato));
            localStorage.setItem(
                "datospublicacionproducto",
                JSON.stringify(dato)
            );
            setMarcaVeh("");
            setAnnoVeh("");
            setModeloVeh("");
            setCilindrajesVeh("");
            setCarroceriaVeh("");
            setTransmisionVeh("");
            setCombustibleVeh("");
            setTraccionVeh("");

            setMarcas([]);
            setModels([]);
            setCilindrajes([]);

            let tipo = 0;

            if (contador > 1) {
                let datosvehiculos = JSON.parse(
                    localStorage.getItem("datostiposvehiculos")
                );

                datosvehiculos &&
                    datosvehiculos.map((item) => {
                        if (item.text == tipoVehiculoSeleccionado) {
                            tipo = item.value;
                        }
                    });
                const newDet = [];
                listCarrocerias.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipo)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.carroceria,
                            text: row.carroceria,
                        };
                        newDet.push(item);
                    }
                });
                setCarrocerias(newDet);
            }

            if (contador < 2) setSelectTipo("Tipo Vehículo");
            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectAnno("Año");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");
            setSelectTransmision("Transmisión");
            setSelectCombustible("Combustible");
            setSelectTraccion("Tracción");
        }
    }, [vehiculoUnoCrear]);

    useEffect(() => {
        if (modelos.length == 0) {
            const newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(marcaVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);
        }
    }, [modelos]);

    useEffect(() => {
        if (vehiculoUnoEditar) {
            // AQUI ESTO SE AGREGO

            setMarcaVeh(marcaVehUno);
            setAnnoVeh(annoVehUno);
            setModeloVeh(modeloVehUno);
            setCilindrajesVeh(cilindrajeVehUno);
            setCarroceriaVeh(carroceriaVehUno);
            setTransmisionVeh(transmisionVehUno);
            setCombustibleVeh(combustibleVehUno);
            setTraccionVeh(traccionVehUno);

            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(carroceriaVehUno)
                ) {
                    setSelectCarroceria(row.carroceria);
                }
            });

            listMarcas.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(marcaVehUno)) {
                    setSelectMarca(row.text);
                }
            });

            annos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(annoVehUno)) {
                    setSelectAnno(row.anovehiculo);
                }
            });

            listModelos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(modeloVehUno)) {
                    setSelectModelo(row.modelo);
                }
            });

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(cilindrajeVehUno)
                ) {
                    setSelectCilindraje(row.cilindraje);
                }
            });

            if (transmisionVehUno == 1) {
                setSelectTransmision("Automática");
            } else if (transmisionVehUno == 2) {
                setSelectTransmision("Manual");
            } else {
                setSelectTransmision("");
            }

            if (combustibleVehUno == 1) {
                setSelectCombustible("Gasolina");
            } else if (combustibleVehUno == 2) {
                setSelectCombustible("Diesel");
            } else if (combustibleVehUno == 3) {
                setSelectCombustible("Gasolina - Gas");
            } else if (combustibleVehUno == 4) {
                setSelectCombustible("Gasolina – Eléctrico");
            } else {
                setSelectCombustible("");
            }

            if (traccionVehUno == 1) {
                setSelectTraccion("Tracción Delantera");
            } else if (traccionVehUno == 2) {
                setSelectTraccion("Tracción Trasera");
            } else if (traccionVehUno == 3) {
                setSelectTraccion("Tracción 4x4");
            } else if (traccionVehUno == 4) {
                setSelectTraccion("");
            }

            const newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVehUno) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDet.push(item);
                    }
                });
            setMarcas(newDet);

            const newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(marcaVehUno) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);

            const newDetCilindraje = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(modeloVehUno)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };

                        newDetCilindraje.push(item);
                    }
                });
            setCilindrajes(newDetCilindraje);

            if (tipoVehUno == 3 || tipoVehUno == 6) {
                if (showTransmision) {
                    setSelectTransmision("");
                    setSelectTraccion("");
                }
            }

            if (
                tipoVehUno == 1 ||
                tipoVehUno == 3 ||
                tipoVehUno == 4 ||
                tipoVehUno == 6
            ) {
                if (showTraccion) {
                    setSelectTraccion("");
                }
            }
        }
    }, [vehiculoUnoEditar]);
    //AQUI
    useEffect(() => {
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));
        setListMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));
        setListCarrocerias(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );
        setListModelos(datoscrearproductosmodelos);
        setListCilindrajes(datoscrearproductoscilindrajes);
        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
    }, [cambio]);

    useEffect(() => {
        if (editarTipo) {
            setMarcas([]);
            setCarrocerias([]);
            setCilindrajes([]);
            setModels([]);
            transmision = [];
            tipotraccion = [];
            setEditarMarcaVeh(null);
            setEditarAnnoVeh(null);
            setEditarModeloVeh(null);
            setEditarCilindrajesVeh(null);
            setEditarCarroceriaVeh(null);
            setEditarTransmisionVeh(null);

            setCarroceriaVeh(null);
            setMarcaVeh(null);
            setAnnoVeh(null);
            setModeloVeh(null);
            setCilindrajesVeh(null);
            setTransmisionVeh(null);
            setTraccionVeh(null);
            setCombustibleVeh(null);

            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

            const newDet = [];
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVeh[0])
                ) {
                    let item = {
                        id: row.id,
                        carroceria: row.carroceria,
                        tipoVeh: row.tipovehiculo,
                        estado: row.estado,
                        value: row.id,
                        label: row.carroceria,
                        text: row.carroceria,
                    };
                    newDet.push(item);
                }
            });
            setCarrocerias(newDet);
            setEditarTipo(false);
        }
    }, [editarTipo]);

    useEffect(() => {
        if (editarCarroceria) {
            setMarcas([]);
            setCilindrajes([]);
            setModels([]);
            setMarcaVeh(0);
            setEditarMarcaVeh(null);
            setEditarAnnoVeh(null);
            setEditarModeloVeh(null);
            setEditarCilindrajesVeh(null);
            setEditarTransmisionVeh(null);

            setSelectMarca("Marca");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

            const newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
                    ) {
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDet.push(item);
                    }
                });
            setMarcas(newDet);
            setEditarCarroceria(false);
        }
    }, [editarCarroceria]);

    useEffect(() => {
        if (editarMarca) {
            setCilindrajes([]);
            setModels([]);
            setCilindrajesVeh(null);
            setModeloVeh(null);
            transmision = [];
            tipotraccion = [];
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

            const newDetMod = [];
            listModelos &&
                listModelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(marcaVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVeh)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);
            setEditarMarca(false);
        }
    }, [editarMarca]);

    useEffect(() => {
        if (editarModelo) {
            setCilindrajes([]);
            transmision = [];
            tipotraccion = [];
            setEditarCilindrajesVeh(0);
            setSelectCilindraje("Cilindraje");

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(modeloVeh)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
            setEditarModelo(false);
        }
    }, [editarModelo]);

    useEffect(() => {
        if (duplicar) {
            setVehiculoUnoCrear(false);

            setTipoVeh(controlDuplicar.tipoVeh);
            setMarcaVeh(controlDuplicar.marcaVeh);
            setAnnoVeh(controlDuplicar.annoVeh);
            setModeloVeh(controlDuplicar.modeloVeh);
            setCilindrajesVeh(controlDuplicar.cilindrajesVeh);
            setCarroceriaVeh(controlDuplicar.carroceriaVeh);
            setTransmisionVeh(controlDuplicar.transmisionVeh);
            setCombustibleVeh(controlDuplicar.combustibleVeh);
            setTraccionVeh(controlDuplicar.traccionVeh);

            setSelectAnno(controlDuplicar.selectAnno);
            setSelectCarroceria(controlDuplicar.selectCarroceria);
            setSelectCilindraje(controlDuplicar.selectCilindraje);
            setSelectCombustible(controlDuplicar.selectCombustible);
            setSelectMarca(controlDuplicar.selectMarca);
            setSelectModelo(controlDuplicar.selectModelo);
            setSelectTipo(controlDuplicar.selectTipo);
            setSelectTraccion(controlDuplicar.selectTraccion);
            setSelectTransmision(controlDuplicar.selectTransmision);

            //Asignamos los valores iniciales para controlar que se cambie algin valor
            setTipoVehDuplica(controlDuplicar.tipoVeh);
            setMarcaVehDuplica(controlDuplicar.marcaVeh);
            setAnnoVehDuplica(controlDuplicar.annoVeh);
            setModeloVehDuplica(controlDuplicar.modeloVeh);
            setCilindrajesVehDuplica(controlDuplicar.cilindrajesVeh);
            setCarroceriaVehDuplica(controlDuplicar.carroceriaVeh);
            setTransmisionVehDuplica(controlDuplicar.transmisionVeh);
            setCombustibleVehDuplica(controlDuplicar.combustibleVeh);
            setTraccionVehDuplica(controlDuplicar.traccionVeh);

            let listadoMarcas = JSON.parse(
                localStorage.getItem("datosmarcasvehiculos")
            );

            //console.log("LISTADO MARCAS : ", listadoMarcas)

            const newDetMarcas = [];
            listadoMarcas &&
                listadoMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(controlDuplicar.tipoVeh) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(controlDuplicar.carroceriaVeh)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
                        let item = {
                            id: row.id,
                            text: row.text,
                            tipoVeh: row.tipovehiculo,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            url: row.url,
                        };
                        newDetMarcas.push(item);
                    }
                });
            setMarcas(newDetMarcas);

            const newDetMod = [];
            datoscrearproductosmodelos &&
                datoscrearproductosmodelos.forEach((row) => {
                    if (
                        Number.parseInt(row.marca) ===
                            Number.parseInt(controlDuplicar.marcaVeh) &&
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVehUno) &&
                        Number.parseInt(controlDuplicar.carroceriaVeh) ===
                            Number.parseInt(row.carroceria)
                    ) {
                        let item = {
                            id: row.id,
                            modelo: row.modelo,
                            tipoVeh: row.tipovehiculo,
                            marca: row.marca,
                            carroceria: row.carroceria,
                            estado: row.estado,
                            value: row.id,
                            label: row.modelo,
                        };
                        newDetMod.push(item);
                    }
                });
            setModels(newDetMod);

            const newDet = [];
            datoscrearproductoscilindrajes &&
                datoscrearproductoscilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(controlDuplicar.modeloVeh)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };
                        newDet.push(item);
                    }
                });
            setCilindrajes(newDet);
        }

        const list = JSON.parse(
            localStorage.getItem("datoscarroceriasvehiculos")
        );

        setListModelos(datoscrearproductosmodelos);
        setListCilindrajes(datoscrearproductoscilindrajes);
        setVehiculos(JSON.parse(localStorage.getItem("datostiposvehiculos")));

        let datosvehiculos = JSON.parse(
            localStorage.getItem("datostiposvehiculos")
        );

        {
            datosvehiculos &&
                datosvehiculos.map((item) => {
                    if (item.value == tipoVehUno) {
                        setSelectTipo(item.text);
                    }
                });
        }

        setListMarcas(JSON.parse(localStorage.getItem("datosmarcasvehiculos")));

        setListCarrocerias(
            JSON.parse(localStorage.getItem("datoscarroceriasvehiculos"))
        );

        setAnnos(JSON.parse(localStorage.getItem("datosannosvehiculos")));
        const newDetTipo = [];
        setTipoVeh(tipoVehUno);
        list.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(tipoVehUno)
            ) {
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipoVeh: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDetTipo.push(item);
            }
        });

        setCarrocerias(newDetTipo);
    }, [duplicar]);

    useEffect(() => {
        if (controlGrabar) {
            if (tipoVeh[0] != 1) {
                if (
                    !marcaVeh ||
                    !annoVeh ||
                    !modeloVeh ||
                    !cilindrajesVeh ||
                    !carroceriaVeh ||
                    !transmisionVeh ||
                    !combustibleVeh ||
                    !traccionVeh
                ) {
                    setcontrolGrabar(false);
                    return;
                }
            } else {
                if (
                    !marcaVeh ||
                    !annoVeh ||
                    !modeloVeh ||
                    !cilindrajesVeh ||
                    !carroceriaVeh ||
                    !transmisionVeh ||
                    !combustibleVeh
                ) {
                    setcontrolGrabar(false);
                    return;
                }
            }

            if (transmisionVeh == 1) {
                setNombreTransmisionVeh("Automática");
            } else if (transmisionVeh == 2) {
                setNombreTransmisionVeh("Manual");
            } else {
                setNombreTransmisionVeh("");
            }

            if (combustibleVeh == 1) {
                setNombreCombustibleVeh("Gasolina");
            } else if (combustibleVeh == 2) {
                setNombreCombustibleVeh("Diesel");
            } else if (combustibleVeh == 3) {
                setNombreCombustibleVeh("Gasolina - Gas");
            } else if (combustibleVeh == 4) {
                setNombreCombustibleVeh("Gasolina – Eléctrico");
            } else {
                setNombreCombustibleVeh("");
            }

            if (tipoVeh == 1 || tipoVeh == 3 || tipoVeh == 6) {
                setNombreTraccionVeh("");
            }

            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(carroceriaVeh)
                ) {
                    setNombreCarroceriaVeh(row.carroceria);
                }
            });

            listMarcas.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(marcaVeh)) {
                    setNombreMarcaVeh(row.text);
                }
            });

            annos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(annoVeh)) {
                    setNombreAnnoVeh(row.anovehiculo);
                }
            });

            listModelos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(modeloVeh)) {
                    setNombreModeloVeh(row.modelo);
                }
            });

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(cilindrajesVeh)
                ) {
                    setNombreCilindrajesVeh(row.cilindraje);
                }
            });

            setTipoVehUno(tipoVeh[0]);
            setMarcaVehUno(marcaVeh);
            setAnnoVehUno(annoVeh);
            setModeloVehUno(modeloVeh);
            setcilindrajeVehUno(cilindrajesVeh);
            setCarroceriaVehUno(carroceriaVeh);
            settransmisionVehUno(transmisionVeh);
            setcombustibleVehUno(combustibleVeh);
            settraccionVehUno(traccionVeh);

            if (traccionVeh == 1) {
                setNombreTraccionVeh("Tracción Delantera");
            } else if (traccionVeh == 2) {
                setNombreTraccionVeh("Tracción Trasera");
            } else if (traccionVeh == 3) {
                setNombreTraccionVeh("Tracción 4x4");
            } else if (traccionVeh == 4) {
                setNombreTraccionVeh("");
            }
            setcontrolGrabar(false);
        }
    }, [controlGrabar]);

    const guardarVehiculo = () => {
        setVehiculoUnoSelecc(true);
        setVehiculoUnoCrear(false);
        setVehiculoUnoEditar(false);
        setAgregarVehiculo(true);
        setControlAgregarVehiculo(true);
        setTipoVehUno(tipoVeh[0]);
        setMarcaVehUno(marcaVeh);
        setAnnoVehUno(annoVeh);
        setModeloVehUno(modeloVeh);
        setcilindrajeVehUno(cilindrajesVeh);
        setCarroceriaVehUno(carroceriaVeh);
        settransmisionVehUno(transmisionVeh);
        setcombustibleVehUno(combustibleVeh);
        settraccionVehUno(traccionVeh);
        //setcontrolGrabar(true);
    };

    let transmision = [
        { label: "Automática", value: 1 },
        { label: "Manual", value: 2 },
    ];

    let combustible = [
        { label: "Gasolina", value: 1 },
        { label: "Diesel", value: 2 },
        { label: "Gasolina – Gas", value: 3 },
        { label: "Gasolina – Eléctrico", value: 4 },
    ];

    let tipotraccion = [
        { label: "Tracción Delantera", value: 1 },
        { label: "Tracción Trasera", value: 2 },
        { label: "Tracción 4x4", value: 3 },
    ];

    let turbocompresor = [
        { label: "Turbo Sencillo", value: 1 },
        { label: "Turbo Doble", value: 2 },
        { label: "Turbo de Doble Entrada", value: 3 },
        { label: "Turbo de Geometría Variable", value: 4 },
        { label: "Turbo Variable de Doble Entrada", value: 5 },
        { label: "Turbo Eléctrico", value: 6 },
        { label: "No Aplica", value: 7 },
    ];

    const handleChange = (selectedOptions) => {
        const newTipo = [];
        newTipo.push(selectedOptions);
        localStorage.setItem("tipovehiculo", JSON.stringify(selectedOptions));

        if (
            selectedOptions == 1 ||
            selectedOptions == 3 ||
            selectedOptions == 6
        ) {
            setShowTraccion(true);
        } else {
            setShowTraccion(false);
        }

        if (selectedOptions == 3) {
            setShowTransmision(true);
            setSelectTransmision("");
            setSelectTraccion("");
        } else {
            setShowTransmision(false);
            setSelectTransmision("Transmisión");
            setSelectTraccion("Tracción");
        }

        if (selectedOptions == 1 || selectedOptions == 6) {
            setSelectTraccion("");
        }

        setEditarTipo(true);
        setTipoVeh(newTipo);

        const newDet = [];
        listCarrocerias.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(selectedOptions)
            ) {
                let item = {
                    id: row.id,
                    carroceria: row.carroceria,
                    tipoVeh: row.tipovehiculo,
                    estado: row.estado,
                    value: row.id,
                    label: row.carroceria,
                };
                newDet.push(item);
            }
        });
        setCarrocerias(newDet);
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setEditarCarroceria(true);
        setEditarCarroceriaVeh(selectedOptions);
        setCarroceriaVeh(selectedOptions);

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCarroceriaVeh(row.carroceria);
            }
        });

        if (vehiculoUnoEditar || vehiculoUnoDuplicar) {
            setEditarCambioCarroceria(1);
            setEditarCarroceria(true);
        }

        const newDet = [];
        listMarcas &&
            listMarcas.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                        Number.parseInt(tipoVeh) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(selectedOptions)
                ) {
                    let item = {
                        id: row.id,
                        text: row.text,
                        tipoVeh: row.tipovehiculo,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        url: row.url,
                    };
                    newDet.push(item);
                }
            });
        setMarcas(newDet);

        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeBrandNew = (e) => {
        //alert("ENTRE")
        console.log("VALOR: ", e.target.value);

        let valor = null;
        valor = e.target.value.toUpperCase();
        setSearchTerm(valor);

        if (valor.length == 0) setSearchTerm(null);

        let pre = [];

        marcas
            .filter((brand) => brand.text.includes(valor))
            .map((filteredPerson) => pre.push(filteredPerson));

        //person.toLowerCase().includes(searchTerm)

        //const results = marcas.filter(brand => brand.text.includes(valor));

        setSearchResults(pre);
        console.log("RESUL : ", pre);
    };

    const handleChangeBrand = (selectedOptions) => {
        setEditarMarcaVeh(selectedOptions);

        setMarcaVeh(selectedOptions);

        setEditarMarca(true);

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreMarcaVeh(row.text);
            }
        });

        if (vehiculoUnoEditar || vehiculoUnoDuplicar) {
            setEditarMarca(true);
            setEditarCambioMarca(2);
        }

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioMarca(1);

        const newDetMod = [];
        listModelos &&
            listModelos.forEach((row) => {
                if (
                    Number.parseInt(row.marca) ===
                        Number.parseInt(selectedOptions) &&
                    Number.parseInt(row.carroceria) ===
                        Number.parseInt(carroceriaVeh)
                ) {
                    let item = {
                        id: row.id,
                        modelo: row.modelo,
                        tipoVeh: row.tipovehiculo,
                        marca: row.marca,
                        carroceria: row.carroceria,
                        estado: row.estado,
                        value: row.id,
                        label: row.modelo,
                    };
                    newDetMod.push(item);
                }
            });
        setModels(newDetMod);

        if (vehiculoUnoEditar) {
            setEditarMarca(true);
            setEditarCambioMarca(2);
        }

        if (vehiculoUnoEditar && editarCambioCarroceria == 1)
            setEditarCambioMarca(1);

        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeAnno = (selectedOptions) => {
        setAnnoVeh(selectedOptions);
        setEditarAnnoVeh(selectedOptions);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioAnno(1);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioMarca == 2
        )
            setEditarCambioAnno(2);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioModelo == 3
        )
            setEditarCambioAnno(3);

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreAnnoVeh(row.anovehiculo);
            }
        });
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeModels = (selectedOptions) => {
        setEditarModeloVeh(selectedOptions);
        const newModelo = [];
        newModelo.push(selectedOptions);

        setModeloVeh(newModelo);
        setSelectCilindraje("Cilindraje");

        if (vehiculoUnoEditar || vehiculoUnoDuplicar) setEditarModelo(true);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioModelo(1);

        if (vehiculoUnoEditar && editarCambioCarroceria == 1)
            setEditarCambioModelo(1);

        if (vehiculoUnoEditar && editarCambioMarca == 2)
            setEditarCambioModelo(2);

        if (
            vehiculoUnoEditar &&
            editarCambioCarroceria == 0 &&
            editarCambioMarca == 0
        )
            setEditarCambioModelo(3);

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreModeloVeh(row.modelo);
            }
        });

        if (selectedOptions > 0) {
            let modelo = selectedOptions;

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) == Number.parseInt(modelo)
                    ) {
                        let item = {
                            id: row.id,
                            carroceria: row.carroceria,
                            tipoVeh: row.tipovehiculo,
                            estado: row.estado,
                            value: row.id,
                            label: row.cilindraje,
                            marca: row.marca,
                            modelo: row.modelo,
                        };
                        newDet.push(item);
                    }
                });

            setCilindrajes(newDet);
        }
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        setCilindrajesVeh(selectedOptions);
        setEditarCilindrajesVeh(selectedOptions);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioCilindraje(1);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioMarca == 2
        )
            setEditarCambioCilindraje(2);

        if (
            (vehiculoUnoEditar || vehiculoUnoDuplicar) &&
            editarCambioModelo == 3
        )
            setEditarCambioCilindraje(3);

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCilindrajesVeh(row.cilindraje);
            }
        });
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeTransmision = (selectedOptions) => {
        setTransmisionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (selectedOptions == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("");
        }

        if (tipoVehUno == 1 || tipoVehUno == 3 || tipoVehUno == 6) {
            setNombreTraccionVeh("");
            settraccionVehUno(4);

            setcontrolGrabar(true);
        }
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeCombustible = (selectedOptions) => {
        setCombustibleVeh(selectedOptions);
        if (tipoVeh == 3) {
            setTransmisionVeh(2);
            setTipoVehUno(tipoVeh);
        }

        if (selectedOptions == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (selectedOptions == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (selectedOptions == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (selectedOptions == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("");
        }

        if (tipoVeh == 1 || tipoVeh == 3 || tipoVeh == 6) {
            setNombreTraccionVeh("");
            settraccionVehUno(4);
        }
        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const handleChangeTraccion = (selectedOptions) => {
        setTraccionVeh(selectedOptions);

        if (selectedOptions == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (selectedOptions == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (selectedOptions == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (selectedOptions == 4) {
            setNombreTraccionVeh("");
        }

        if (!vehiculoUnoEditar && !vehiculoUnoDuplicar) setcontrolGrabar(true);
    };

    const editarDatosVehiculos = () => {
        setControlAgregarVehiculo(false);

        let count = 0;

        if (contador == 10) count = 0;
        else count = controlAccion + 1;

        setControlAccion(count);

        if (contador > 1) {
            setHabilitarTipo(true);
        }

        if (count > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo 24!"
            );
            return;
        }

        setVehiculoUnoEditar(true);
        setVehiculoUnoSelecc(false);
        setEditarMarcaVeh(marcaVehUno);
        setEditarAnnoVeh(annoVehUno);
        setEditarModeloVeh(modeloVehUno);
        setEditarCilindrajesVeh(cilindrajeVehUno);
        setEditarCarroceriaVeh(carroceriaVehUno);
        setEditarTransmisionVeh(transmisionVehUno);
        setEditarCombustibleVeh(combustibleVehUno);
        setEditarTraccionVeh(traccionVehUno);

        // AQUI ESTO SE AGREGO
        setMarcaVeh(marcaVehUno);
        setAnnoVeh(annoVehUno);
        setModeloVeh(modeloVehUno);
        setCilindrajesVeh(cilindrajeVehUno);
        setCarroceriaVeh(carroceriaVehUno);
        setTransmisionVeh(transmisionVehUno);
        setCombustibleVeh(combustibleVehUno);
        setTraccionVeh(traccionVehUno);

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(carroceriaVehUno)) {
                setSelectCarroceria(row.carroceria);
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehUno)) {
                setSelectMarca(row.text);
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehUno)) {
                setSelectAnno(row.anovehiculo);
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehUno)) {
                setSelectModelo(row.modelo);
            }
        });

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(cilindrajeVehUno)) {
                setSelectCilindraje(row.cilindraje);
            }
        });

        if (transmisionVehUno == 1) {
            setSelectTransmision("Automática");
        } else if (transmisionVehUno == 2) {
            setSelectTransmision("Manual");
        } else {
            setSelectTransmision("");
        }

        if (combustibleVehUno == 1) {
            setSelectCombustible("Gasolina");
        } else if (combustibleVehUno == 2) {
            setSelectCombustible("Diesel");
        } else if (combustibleVehUno == 3) {
            setSelectCombustible("Gasolina - Gas");
        } else if (combustibleVehUno == 4) {
            setSelectCombustible("Gasolina – Eléctrico");
        } else {
            setSelectCombustible("");
        }

        if (traccionVehUno == 1) {
            setSelectTraccion("Tracción Delantera");
        } else if (traccionVehUno == 2) {
            setSelectTraccion("Tracción Trasera");
        } else if (traccionVehUno == 3) {
            setSelectTraccion("Tracción 4x4");
        } else if (traccionVehUno == 4) {
            setSelectTraccion("");
        }
    };

    const duplicarDatosVehiculos = () => {
        if (contador == 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Número de vehículos no puede ser mayor a 10!");
            return;
        }

        let count = 1;
        setControlAccion(count);

        if (count > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo 22!"
            );
            return;
        }

        setAgregarDatos(true);
        setDuplicar(true);

        let duplicarCarroceria;
        let duplicarMarca;
        let duplicarAnno;
        let duplicarModelo;
        let duplicarCilindraje;
        let duplicarTransmision;
        let duplicarCombustible;
        let duplicarTraccion;

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(carroceriaVehUno)) {
                duplicarCarroceria = row.carroceria;
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehUno)) {
                duplicarMarca = row.text;
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehUno)) {
                duplicarAnno = row.anovehiculo;
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehUno)) {
                duplicarModelo = row.modelo;
            }
        });

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(cilindrajeVehUno)) {
                duplicarCilindraje = row.cilindraje;
            }
        });

        if (transmisionVehUno == 1) {
            duplicarTransmision = "Automática";
        } else if (transmisionVehUno == 2) {
            duplicarTransmision = "Manual";
        } else {
            duplicarTransmision = "";
        }

        if (combustibleVehUno == 1) {
            duplicarCombustible = "Gasolina";
        } else if (combustibleVehUno == 2) {
            duplicarCombustible = "Diesel";
        } else if (combustibleVehUno == 3) {
            duplicarCombustible = "Gasolina - Gas";
        } else if (combustibleVehUno == 4) {
            duplicarCombustible = "Gasolina – Eléctrico";
        } else {
            duplicarCombustible = "";
        }

        if (traccionVehUno == 1) {
            duplicarTraccion = "Tracción Delantera";
        } else if (traccionVehUno == 2) {
            duplicarTraccion = "Tracción Trasera";
        } else if (traccionVehUno == 3) {
            duplicarTraccion = "Tracción 4x4";
        } else if (traccionVehUno == 4) {
            duplicarTraccion = "";
        }

        let duplicar = {
            tipoVeh: tipoVeh,
            marcaVeh: marcaVehUno,
            annoVeh: annoVehUno,
            modeloVeh: modeloVehUno,
            cilindrajesVeh: cilindrajeVehUno,
            carroceriaVeh: carroceriaVehUno,
            transmisionVeh: transmisionVeh,
            combustibleVeh: combustibleVehUno,
            traccionVeh: traccionVehUno,
            selectTipo: selectTipo,
            selectCarroceria: duplicarCarroceria,
            selectMarca: duplicarMarca,
            selectAnno: duplicarAnno,
            selectModelo: duplicarModelo,
            selectCilindraje: duplicarCilindraje,
            selectTransmision: duplicarTransmision,
            selectCombustible: duplicarCombustible,
            selectTraccion: duplicarTraccion,
        };
        setControlDuplicar(duplicar);
    };

    useEffect(() => {
        if (continuarRegistro) {
            setShowModalMensajesValidar(false);
            setContinuarRegistro(false);
        }
    }, [continuarRegistro]);

    useEffect(() => {
        if (abandonarRegistro) {
            setShowModalMensajesValidar(false);
            setAbandonarRegistro(false);
            if (!editarVehiculo) eliminaDatosVehiculos();
            else {
                setControlAccion(0);
                retornaValoresVehiculo();
                setVehiculoUnoEditar(false);
                setVehiculoUnoSelecc(true);
            }
        }
    }, [abandonarRegistro]);

    const retornaValoresVehiculo = () => {
        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(carroceriaVehUno)) {
                setNombreCarroceriaVeh(row.carroceria);
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehUno)) {
                setNombreMarcaVeh(row.text);
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehUno)) {
                setNombreAnnoVeh(row.anovehiculo);
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehUno)) {
                setNombreModeloVeh(row.modelo);
            }
        });

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(cilindrajeVehUno)) {
                setNombreCilindrajesVeh(row.cilindraje);
            }
        });

        if (transmisionVehUno == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (transmisionVehUno == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("");
        }

        if (combustibleVehUno == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (combustibleVehUno == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (combustibleVehUno == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (combustibleVehUno == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("");
        }

        if (traccionVehUno == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (traccionVehUno == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (traccionVehUno == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (traccionVehUno == 4) {
            setNombreTraccionVeh("");
        }
    };

    const validaEliminaDatosVehiculos = () => {
        let cambio = false;

        if (
            !marcaVeh &&
            !annoVeh &&
            !modeloVeh &&
            !cilindrajesVeh &&
            !carroceriaVeh &&
            !transmisionVeh &&
            !combustibleVeh &&
            !traccionVeh
        )
            eliminaDatosVehiculos();

        if (
            marcaVeh ||
            annoVeh ||
            modeloVeh ||
            cilindrajesVeh ||
            carroceriaVeh ||
            transmisionVeh ||
            combustibleVeh ||
            traccionVeh
        ) {
            cambio = true;
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        }
    };

    const validaEliminaDatosVehiculosEditar = () => {
        if (
            marcaVeh === editarControlMarca &&
            annoVeh === editarControlAnno &&
            modeloVeh === editarControlModelo &&
            cilindrajesVeh === editarControlCilindraje &&
            carroceriaVeh === editarControlCarroceria &&
            transmisionVeh === editarControlTransmision &&
            combustibleVeh === editarControlCombustible &&
            traccionVeh === editarControlTraccion
        ) {
            setControlAccion(0);
            setVehiculoUnoEditar(false);
            setVehiculoUnoSelecc(true);
        }

        if (
            marcaVeh != editarControlMarca ||
            annoVeh != editarControlAnno ||
            modeloVeh != editarControlModelo ||
            cilindrajesVeh != editarControlCilindraje ||
            carroceriaVeh != editarControlCarroceria ||
            transmisionVeh != editarControlTransmision ||
            combustibleVeh != editarControlCombustible ||
            traccionVeh != editarControlTraccion
        ) {
            setEditarVehiculo(true);
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        }
    };

    const validaEliminaDatosVehiculosDuplicar = () => {
        let cambio = false;

        if (
            marcaVeh === marcaVehDuplica &&
            annoVeh === annoVehDuplica &&
            modeloVeh === modeloVehDuplica &&
            cilindrajesVeh === cilindrajesVehDuplica &&
            carroceriaVeh === carroceriaVehDuplica &&
            transmisionVeh === transmisionVehDuplica &&
            combustibleVeh === combustibleVehDuplica &&
            traccionVeh === traccionVehDuplica
        ) {
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        }

        if (
            marcaVeh != marcaVehDuplica ||
            annoVeh != annoVehDuplica ||
            modeloVeh != modeloVehDuplica ||
            cilindrajesVeh != cilindrajesVehDuplica ||
            carroceriaVeh != carroceriaVehDuplica ||
            transmisionVeh != transmisionVehDuplica ||
            combustibleVeh != combustibleVehDuplica ||
            traccionVeh != traccionVehDuplica
        ) {
            setShowModalMensajesValidar(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "¿Quieres cerrar el formulario? Si cierras los cambios no se guardaran!"
            );
        }
    };

    const eliminaDatosVehiculos = () => {
        setcontrolGrabar(false);
        setControlAgregarVehiculo(true);
        setDuplicar(false);
        setTipoVehUno(0);
        setMarcaVehUno(0);
        setAnnoVehUno(0);
        setModeloVehUno(0);
        setCarroceriaVehUno(0);
        setcilindrajeVehUno(0);
        settransmisionVehUno(0);
        setcombustibleVehUno(0);
        settraccionVehUno(0);
        setVehiculoBorrar(false);

        let count = 0;
        setControlAccion(count);

        let vehiculo = "000000000";
        const Detveh = vehiculosSeleccionados;

        {
            Detveh &&
                Detveh.map((items, index) => {
                    if (index == 0) {
                        setVehiculosSeleccionados(vehiculo);
                    } else {
                        setVehiculosSeleccionados(items);
                    }
                });
        }

        setEliminoDatos(true);
        setAgregarVehiculo(true);
        setVehiculoUnoCrear(false);
        setVehiculoUnoEditar(false);
        setVehiculoUnoDuplicar(false);
        setVehiculoUnoSelecc(false);
        setVehiculoUnoUbicar(true);
    };

    const eliminaDatosVehiculosAgregados = () => {
        if (controlAccion > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar, duplicar o eliminar! 25"
            );
            return;
        }

        setcontrolGrabar(false);
        setControlAgregarVehiculo(true);
        setDuplicar(false);
        setTipoVehUno(0);
        setMarcaVehUno(0);
        setAnnoVehUno(0);
        setModeloVehUno(0);
        setCarroceriaVehUno(0);
        setcilindrajeVehUno(0);
        settransmisionVehUno(0);
        setcombustibleVehUno(0);
        settraccionVehUno(0);

        let count = 0;
        setControlAccion(count);

        let vehiculo = "000000000";
        const Detveh = vehiculosSeleccionados;

        {
            Detveh &&
                Detveh.map((items, index) => {
                    if (index == 0) {
                        setVehiculosSeleccionados(vehiculo);
                    } else {
                        setVehiculosSeleccionados(items);
                    }
                });
        }

        setEliminoDatos(true);
        setAgregarVehiculo(true);
        setVehiculoUnoCrear(false);
        setVehiculoUnoEditar(false);
        setVehiculoUnoDuplicar(false);
        setVehiculoUnoSelecc(false);
        setVehiculoUnoUbicar(true);
    };

    const onClickTipo = () => {
        setAlertTipo("ml-2 alinearizquierda");
    };

    const onClickCarroceria = () => {
        setAlertCarroceria("ml-2 alinearizquierda");
    };

    const onClickMarca = () => {
        setAlertMarca("ml-2 alinearizquierda");
    };

    const onClickAnno = () => {
        setAlertAnno("tamañocajaoptionsitemssearch");
    };

    const onClickModelo = () => {
        setAlertModelo("ml-2 alinearizquierda");
    };

    const onClickCilindraje = () => {
        setAlertCilindraje("ml-2 alinearizquierda");
    };

    const onClickTransmision = () => {
        setAlertTransmision("ml-2 alinearizquierda");
    };

    const onClickCombustible = () => {
        setAlertCombustible("ml-2 alinearizquierda");
    };

    const onClickTraccion = () => {
        setAlertTraccion("ml-2 alinearizquierda");
    };

    const validaGrabarDatosVehiculosEditar = () => {
        if (
            editarMarcaVeh != marcaVeh ||
            editarAnnoVeh != annoVeh ||
            editarModeloVeh != modeloVeh ||
            editarCilindrajesVeh != cilindrajesVeh ||
            editarCarroceriaVeh != carroceriaVeh ||
            editarTransmisionVeh != transmisionVeh ||
            editarCombustibleVeh != combustibleVeh ||
            editarTraccionVeh != traccionVeh
        ) {
            grabarDatosVehiculos();
        } else {
            setVehiculoUnoEditar(false);
            setVehiculoUnoSelecc(true);
            let count = 0;
            setControlAccion(count);
        }
    };

    const grabarDatosVehiculos = () => {
        let count = 0;
        setControlAccion(count);

        if (!tipoVeh) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes("Heey, Selecciona el tipo de vehículo!");
            return;
        }

        if (!tipoVeh) {
            setAlertTipo("ml-2 alinearizquierda textoalert");
        }

        if (!carroceriaVeh) {
            setAlertCarroceria("ml-2 alinearizquierda textoalert");
        }

        if (!marcaVeh) {
            setAlertMarca("ml-2 alinearizquierda textoalert");
        }

        if (!annoVeh) {
            setAlertAnno("ml-2 alinearizquierda textoalert");
        }

        if (!modeloVeh) {
            setAlertModelo("ml-2 alinearizquierda textoalert");
        }

        if (!cilindrajesVeh) {
            setAlertCilindraje("ml-2 alinearizquierda textoalert");
        }

        if (tipoVeh[0] != 3)
            if (!transmisionVeh) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

        if (!combustibleVeh) {
            setAlertCombustible("ml-2 alinearizquierda textoalert");
        }

        if (tipoVeh[0] != 1 && tipoVeh[0] != 6 && tipoVeh[0] != 3)
            if (!traccionVeh) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

        if (tipoVeh[0] == 1 || tipoVeh[0] == 6) {
            if (
                !marcaVeh ||
                !annoVeh ||
                !modeloVeh ||
                !cilindrajesVeh ||
                !carroceriaVeh ||
                !transmisionVeh ||
                !combustibleVeh
            ) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Todos los datos del vehículo son requeridos!"
                );
                return;
            }
        } else if (tipoVeh[0] == 3) {
            if (
                !marcaVeh ||
                !annoVeh ||
                !modeloVeh ||
                !cilindrajesVeh ||
                !carroceriaVeh ||
                !combustibleVeh
            ) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Todos los datos del vehículo son requeridos!"
                );
                return;
            }
        } else {
            if (
                !marcaVeh ||
                !annoVeh ||
                !modeloVeh ||
                !cilindrajesVeh ||
                !carroceriaVeh ||
                !transmisionVeh ||
                !combustibleVeh ||
                !traccionVeh
            ) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Todos los datos del vehículo son requeridos!"
                );
                return;
            }
        }

        if (editarCambioModelo == 3) {
            if (editarCambioCilindraje == 3) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes("Heey, Ingresa los datos del Cilindraje!");
                return;
            }
        }

        if (editarCambioMarca == 2) {
            if (editarCambioModelo == 2 && editarCambioCilindraje == 2) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Ingresa los datos de Modelo y Cilindraje 1!"
                );
                return;
            }
        }
        settipoVehiculoSeleccionado(selectTipo);
        guardarVehiculo();
    };

    const guardarDatosVehiculosDuplicar = () => {
        let count = 0;
        setControlAccion(count);

        if (editarCambioCarroceria == 1) {
            if (
                editarCambioMarca == 1 &&
                editarCambioModelo == 1 &&
                editarCambioCilindraje == 1
            ) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Ingresa los datos de Marca, Modelo y Cilindraje!"
                );
                return;
            }
        }

        if (editarCambioModelo == 3) {
            if (editarCambioCilindraje == 3) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes("Heey, Ingresa los datos del Cilindraje!");
                return;
            }
        }

        let continua = true;

        let tipo = 0;

        if (contador > 1) {
            let datosvehiculos = JSON.parse(
                localStorage.getItem("datostiposvehiculos")
            );

            datosvehiculos &&
                datosvehiculos.map((item) => {
                    if (item.text == tipoVehiculoSeleccionado) {
                        tipo = item.value;
                    }
                });
        }

        let vehiculo =
            "" +
            tipo +
            marcaVeh +
            annoVeh +
            modeloVeh +
            carroceriaVeh +
            cilindrajesVeh +
            transmisionVeh +
            combustibleVeh +
            traccionVeh;

        {
            vehiculosSeleccionados &&
                vehiculosSeleccionados.map((items) => {
                    if (items.dato.valor == vehiculo) {
                        continua = false;
                        setShowModalMensajes(true);
                        setTituloMensajes("Información del producto");
                        setTextoMensajes(
                            "Heey, No puedes grabar dos vehícuos iguales 27!"
                        );
                        return;
                    }
                });
        }

        if (continua) {
            setVehiculoUnoEditar(false);
            setVehiculoUnoSelecc(true);
            setDuplicar(false);
            setcontrolGrabar(true);
        }
    };

    const onEdit = () => {
        setShowEdit(true);
    };
    const offEdit = () => {
        setShowEdit(false);
    };
    const onCopy = () => {
        setShowCopy(true);
    };
    const offCopy = () => {
        setShowCopy(false);
    };
    const onDelete = () => {
        setShowDelete(true);
    };
    const offDelete = () => {
        setShowDelete(false);
    };

    return (
        <div className="mt-2 ml-10">
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            <ModalMensajesValidar
                shown={showModalMensajesValidar}
                setContinuarRegistro={setContinuarRegistro}
                setAbandonarRegistro={setAbandonarRegistro}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
            {vehiculoUnoCrear ? (
                <Row>
                    <div>
                        <Col>
                            <div>
                                <Row>
                                    <Col xl={10} lg={10} md={10} xs={10}>
                                        <div>
                                            <Dropdown
                                                onSelect={handleChange}
                                                onClick={onClickTipo}>
                                                <Dropdown.Toggle
                                                    className="mt-1 dropdowncustom"
                                                    disabled={habilitarTipo}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div className={alertTipo}>
                                                        {selectTipo}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptions">
                                                    {vehiculos &&
                                                        vehiculos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectTipo(
                                                                                item.text
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.id
                                                                        }>
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                    <Col
                                        xl={1}
                                        lg={1}
                                        md={1}
                                        xs={1}
                                        className="mlmenos15">
                                        <div className="ps-form__input">
                                            <CheckIcon
                                                onClick={() => {
                                                    grabarDatosVehiculos();
                                                }}
                                                style={{
                                                    fontSize: 30,
                                                }}
                                                className="iconocancelarguardar mlmenos15"></CheckIcon>
                                        </div>
                                    </Col>
                                    <Col
                                        xl={1}
                                        lg={1}
                                        md={1}
                                        xs={1}
                                        className="mlmenos20">
                                        <div className="ps-form__input">
                                            <CloseIcon
                                                onClick={() =>
                                                    validaEliminaDatosVehiculos()
                                                }
                                                style={{
                                                    fontSize: 30,
                                                }}
                                                className="iconocancelarguardar mlmenos15"></CloseIcon>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={5} lg={5} md={5} xs={5}>
                                        <div>
                                            <Dropdown
                                                onSelect={
                                                    handleChangeCarroceria
                                                }
                                                onClick={onClickCarroceria}>
                                                <Dropdown.Toggle
                                                    className="mtmenos1 dropdowncustomitems"
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertCarroceria
                                                        }>
                                                        {selectCarroceria}
                                                    </div>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {carrocerias &&
                                                        carrocerias.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectCarroceria(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>

                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mlmenos13">
                                            <Dropdown>
                                                <Dropdown.Toggle>
                                                    <div
                                                        className={
                                                            alertCarroceria
                                                        }>
                                                        {searchTerm}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <input
                                                    type="text"
                                                    name="tempo"
                                                    className="mtmenos1 dropdowncustomitems"
                                                    placeholder="Search"
                                                    //value={searchTerm}
                                                    onChange={(e) =>
                                                        handleChangeBrandNew(e)
                                                    }
                                                />
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {searchResults &&
                                                        searchResults.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSearchTerm(
                                                                                item.text
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.id
                                                                        }>
                                                                        {
                                                                            item.text
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={5} lg={5} md={5} xs={5}>
                                        <div>
                                            <Dropdown
                                                onSelect={handleChangeAnno}
                                                onClick={onClickAnno}>
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    id="dropdown-custom-components"
                                                    arrowColor="#2D2E83"
                                                    className="mt-1 dropdowncustomitems"
                                                    variant="outline-light">
                                                    <div className={alertAnno}>
                                                        {selectAnno}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitemsdos">
                                                    {dataannos &&
                                                        dataannos.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectAnno(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mlmenos13">
                                            <Dropdown
                                                onSelect={handleChangeModels}
                                                onClick={onClickModelo}>
                                                <Dropdown.Toggle
                                                    onclick={CustomToggle}
                                                    id="dropdown-custom-components"
                                                    arrowColor="#2D2E83"
                                                    className="mt-1 dropdowncustomitems"
                                                    variant="outline-light">
                                                    <div
                                                        className={alertModelo}>
                                                        {selectModelo}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    as={CustomMenu}
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitemsdos">
                                                    {modelos &&
                                                        modelos.map((item) => {
                                                            return (
                                                                <Dropdown.Item
                                                                    className="itemsdropdowncustom"
                                                                    onClick={() =>
                                                                        setSelectModelo(
                                                                            item.label
                                                                        )
                                                                    }
                                                                    eventKey={
                                                                        item.value
                                                                    }>
                                                                    {item.label}
                                                                </Dropdown.Item>
                                                            );
                                                        })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={5} lg={5} md={5} xs={5}>
                                        <div className="mt-1">
                                            <Dropdown
                                                onSelect={
                                                    handleChangeVersionMotor
                                                }
                                                onClick={onClickCilindraje}>
                                                <Dropdown.Toggle
                                                    className="dropdowncustomitems"
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertCilindraje
                                                        }>
                                                        {selectCilindraje}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {cilindrajes &&
                                                        cilindrajes.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectCilindraje(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos13">
                                            <Dropdown
                                                onSelect={
                                                    handleChangeTransmision
                                                }
                                                onClick={onClickTransmision}>
                                                <Dropdown.Toggle
                                                    className="dropdowncustomitems"
                                                    disabled={showTransmision}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertTransmision
                                                        }>
                                                        {selectTransmision}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {transmision &&
                                                        transmision.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectTransmision(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={5} lg={5} md={5} xs={5}>
                                        <div className="mt-1">
                                            <Dropdown
                                                onSelect={
                                                    handleChangeCombustible
                                                }
                                                onClick={onClickCombustible}>
                                                <Dropdown.Toggle
                                                    className="dropdowncustomitemsizquierda"
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertCombustible
                                                        }>
                                                        {selectCombustible}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {combustible &&
                                                        combustible.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectCombustible(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                    <Col xl={6} lg={6} md={6} xs={6}>
                                        <div className="mt-1 mlmenos13">
                                            <Dropdown
                                                onSelect={handleChangeTraccion}
                                                onClick={onClickTraccion}>
                                                <Dropdown.Toggle
                                                    className="dropdowncustomitemsderecha"
                                                    disabled={showTraccion}
                                                    variant="outline-light"
                                                    id="dropdown-basic">
                                                    <div
                                                        className={
                                                            alertTraccion
                                                        }>
                                                        {selectTraccion}
                                                    </div>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    variant="outline-light"
                                                    className="tamañocajaoptionsitems">
                                                    {tipotraccion &&
                                                        tipotraccion.map(
                                                            (item) => {
                                                                return (
                                                                    <Dropdown.Item
                                                                        className="itemsdropdowncustom"
                                                                        onClick={() =>
                                                                            setSelectTraccion(
                                                                                item.label
                                                                            )
                                                                        }
                                                                        eventKey={
                                                                            item.value
                                                                        }>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Dropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            ) : vehiculoUnoSelecc ? (
                <div className="mt-3">
                    <Row>
                        <Col xl={9} lg={9} md={9} xs={9}>
                            <div className="ps-form__input mostrarvehiculoseleccionado">
                                <div className="mtmenos10 textomodalinfoproductos">
                                    {nombreCarroceriaVeh}&nbsp;
                                    {nombreMarcaVeh} &nbsp;
                                    {nombreAnnoVeh} &nbsp;
                                    {nombreModeloVeh} &nbsp;
                                    {nombreCilindrajesVeh} &nbsp;
                                    {nombreTransmisionVeh} &nbsp;
                                    {nombreCombustibleVeh} &nbsp;
                                    {nombreTraccionVeh}
                                </div>
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input textoeditardatosvehiculo tamañoiconoadvertencia">
                                <i
                                    onClick={() => editarDatosVehiculos()}
                                    class="ml-1 mt-1 fa fa-edit d-flex justify-content-center"
                                    data-tip
                                    data-for="registerEdit"
                                    onMouseMove={() => onEdit()}
                                    onMouseLeave={() => offEdit()}></i>
                            </div>
                            <ReactTooltip
                                className="ubicartooltipproducto"
                                id="registerEdit"
                                arrowColor="#2D2E83"
                                place="top"
                                effect="solid">
                                <h3 className="ml-50 mtmenos10 tamañotextotooltipproducto">
                                    {" "}
                                    Editar{" "}
                                </h3>
                            </ReactTooltip>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input mlmenos12 textoeditardatosvehiculo tamañoiconoadvertencia">
                                <i
                                    onClick={() => duplicarDatosVehiculos()}
                                    class="mt-1 fa fa-copy d-flex justify-content-center"
                                    data-tip
                                    data-for="registerCopy"
                                    onMouseMove={() => onCopy()}
                                    onMouseLeave={() => offCopy()}></i>
                            </div>
                            <ReactTooltip
                                className="ubicartooltipproducto"
                                id="registerCopy"
                                arrowColor="#2D2E83"
                                place="top"
                                effect="solid">
                                <h3 className="ml-40 mtmenos10 tamañotextotooltipproducto">
                                    {" "}
                                    Duplicar{" "}
                                </h3>
                            </ReactTooltip>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                            <div className="form-control ps-form__input textoeditardatosvehiculo mlmenos25 tamañoiconoadvertencia">
                                <i
                                    onClick={() =>
                                        eliminaDatosVehiculosAgregados()
                                    }
                                    class="mt-1 fa fa-trash d-flex justify-content-center"
                                    data-tip
                                    data-for="registerDelete"
                                    onMouseMove={() => onDelete()}
                                    onMouseLeave={() => offDelete()}></i>
                            </div>
                            <ReactTooltip
                                className="ubicartooltipproducto"
                                id="registerDelete"
                                arrowColor="#2D2E83"
                                place="top"
                                effect="solid">
                                <h3 className="mlmenos20 mtmenos10 tamañotextotooltipproducto">
                                    {" "}
                                    Eliminar{" "}
                                </h3>
                            </ReactTooltip>
                        </Col>
                    </Row>
                </div>
            ) : vehiculoUnoEditar ? (
                <Row>
                    <div className="ml-21">
                        <div>
                            <Row>
                                <Col xl={10} lg={10} md={10} xs={10}>
                                    <Dropdown
                                        onSelect={handleChange}
                                        onClick={onClickTipo}>
                                        <Dropdown.Toggle
                                            className="mt-1 dropdowncustom"
                                            disabled={habilitarTipo}
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTipo}>
                                                {selectTipo}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptions">
                                            {vehiculos &&
                                                vehiculos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTipo(
                                                                    item.text
                                                                )
                                                            }
                                                            eventKey={item.id}>
                                                            {item.text}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="mt-3 mlmenos18">
                                    <div className="ps-form__input mtmenos8">
                                        <CheckIcon
                                            onClick={() => {
                                                validaGrabarDatosVehiculosEditar();
                                            }}
                                            style={{
                                                fontSize: 30,
                                            }}
                                            className="iconocancelarguardar mlmenos15"></CheckIcon>
                                    </div>
                                </Col>
                                <Col
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    xs={1}
                                    className="mt-3 mlmenos20">
                                    <div className="ps-form__input mtmenos8">
                                        <CloseIcon
                                            onClick={() =>
                                                validaEliminaDatosVehiculosEditar()
                                            }
                                            style={{
                                                fontSize: 30,
                                            }}
                                            className="iconocancelarguardar mlmenos15"></CloseIcon>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div>
                                    <Dropdown
                                        onSelect={handleChangeCarroceria}
                                        onClick={onClickCarroceria}>
                                        <Dropdown.Toggle
                                            className="mtmenos2 dropdowncustomitems"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCarroceria}>
                                                {selectCarroceria}
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {carrocerias &&
                                                carrocerias.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCarroceria(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mlmenos14">
                                    <Dropdown
                                        onSelect={handleChangeBrand}
                                        onClick={onClickMarca}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mtmenos2 dropdowncustomitems"
                                            variant="outline-light"
                                            value={marcaVeh}>
                                            <div className={alertMarca}>
                                                {selectMarca}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {marcas &&
                                                marcas.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectMarca(
                                                                    item.text
                                                                )
                                                            }
                                                            eventKey={item.id}>
                                                            {item.text}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div>
                                    <Dropdown
                                        onSelect={handleChangeAnno}
                                        onClick={onClickAnno}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mt-1 dropdowncustomitems"
                                            variant="outline-light">
                                            <div className={alertAnno}>
                                                {selectAnno}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {dataannos &&
                                                dataannos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectAnno(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mlmenos14">
                                    <Dropdown
                                        onSelect={handleChangeModels}
                                        onClick={onClickModelo}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mt-1 dropdowncustomitems"
                                            variant="outline-light">
                                            <div className={alertModelo}>
                                                {selectModelo}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {modelos &&
                                                modelos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectModelo(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1">
                                    <Dropdown
                                        onSelect={handleChangeVersionMotor}
                                        onClick={onClickCilindraje}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitems"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCilindraje}>
                                                {selectCilindraje}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {cilindrajes &&
                                                cilindrajes.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCilindraje(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos14">
                                    <Dropdown
                                        onSelect={handleChangeTransmision}
                                        onClick={onClickTransmision}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitems"
                                            disabled={showTransmision}
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTransmision}>
                                                {selectTransmision}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {transmision &&
                                                transmision.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTransmision(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1">
                                    <Dropdown
                                        onSelect={handleChangeCombustible}
                                        onClick={onClickCombustible}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitemsizquierda"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCombustible}>
                                                {selectCombustible}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {combustible &&
                                                combustible.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCombustible(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1  mlmenos14">
                                    <Dropdown
                                        onSelect={handleChangeTraccion}
                                        onClick={onClickTraccion}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitemsderecha"
                                            disabled={showTraccion}
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTraccion}>
                                                {selectTraccion}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {tipotraccion &&
                                                tipotraccion.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTraccion(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        {/*
                        <div
                            className="ps-form__input mt-3 botonagregarotrovehiculo"
                            onClick={() => guardarDatosVehiculos()}>
                            {<h3>Guardar cambios</h3>}
                        </div>
                        */}
                    </div>
                </Row>
            ) : vehiculoUnoDuplicar ? (
                <Row>
                    <div className="ml-15">
                        <Row>
                            <Col xl={10} lg={10} md={10} xs={10}>
                                <div>
                                    <Dropdown
                                        onSelect={handleChange}
                                        onClick={onClickTipo}>
                                        <Dropdown.Toggle
                                            className="mt-1 dropdowncustom"
                                            disabled="disabled"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTipo}>
                                                {selectTipo}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptions">
                                            {vehiculos &&
                                                vehiculos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTipo(
                                                                    item.text
                                                                )
                                                            }
                                                            eventKey={item.id}>
                                                            {item.text}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                xs={1}
                                className="mlmenos21">
                                <div className="ps-form__input">
                                    <CheckIcon
                                        onClick={() => {
                                            guardarDatosVehiculosDuplicar();
                                        }}
                                        style={{
                                            fontSize: 30,
                                        }}
                                        className="iconocancelarguardar mlmenos15"></CheckIcon>
                                </div>
                            </Col>
                            <Col
                                xl={1}
                                lg={1}
                                md={1}
                                xs={1}
                                className="mlmenos20">
                                <div className="ps-form__input">
                                    <CloseIcon
                                        onClick={() =>
                                            validaEliminaDatosVehiculosDuplicar()
                                        }
                                        style={{
                                            fontSize: 30,
                                        }}
                                        className="iconocancelarguardar mlmenos15"></CloseIcon>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1 ">
                                    <Dropdown
                                        onSelect={handleChangeCarroceria}
                                        onClick={onClickCarroceria}>
                                        <Dropdown.Toggle
                                            className="mtmenos1 dropdowncustomitems"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCarroceria}>
                                                {selectCarroceria}
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {carrocerias &&
                                                carrocerias.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCarroceria(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos15">
                                    <Dropdown
                                        onSelect={handleChangeBrand}
                                        onClick={onClickMarca}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mtmenos1 dropdowncustomitems"
                                            variant="outline-light"
                                            value={marcaVeh}>
                                            <div className={alertMarca}>
                                                {selectMarca}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {marcas &&
                                                marcas.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectMarca(
                                                                    item.text
                                                                )
                                                            }
                                                            eventKey={item.id}>
                                                            {item.text}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1">
                                    <Dropdown
                                        onSelect={handleChangeAnno}
                                        onClick={onClickAnno}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mt-1 dropdowncustomitems"
                                            variant="outline-light">
                                            <div className={alertAnno}>
                                                {selectAnno}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {dataannos &&
                                                dataannos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectAnno(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos15">
                                    <Dropdown
                                        onSelect={handleChangeModels}
                                        onClick={onClickModelo}>
                                        <Dropdown.Toggle
                                            onclick={CustomToggle}
                                            id="dropdown-custom-components"
                                            arrowColor="#2D2E83"
                                            className="mt-1 dropdowncustomitems"
                                            variant="outline-light">
                                            <div className={alertModelo}>
                                                {selectModelo}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            as={CustomMenu}
                                            variant="outline-light"
                                            className="tamañocajaoptionsitemsdos">
                                            {modelos &&
                                                modelos.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectModelo(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1">
                                    <Dropdown
                                        onSelect={handleChangeVersionMotor}
                                        onClick={onClickCilindraje}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitems"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCilindraje}>
                                                {selectCilindraje}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {cilindrajes &&
                                                cilindrajes.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCilindraje(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos15">
                                    <Dropdown
                                        onSelect={handleChangeTransmision}
                                        onClick={onClickTransmision}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitems"
                                            disabled={showTransmision}
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTransmision}>
                                                {selectTransmision}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {transmision &&
                                                transmision.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTransmision(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div className="mt-1">
                                    <Dropdown
                                        onSelect={handleChangeCombustible}
                                        onClick={onClickCombustible}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitemsizquierda"
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertCombustible}>
                                                {selectCombustible}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {combustible &&
                                                combustible.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectCombustible(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={6}>
                                <div className="mt-1 mlmenos15">
                                    <Dropdown
                                        onSelect={handleChangeTraccion}
                                        onClick={onClickTraccion}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitemsderecha"
                                            disabled={showTraccion}
                                            variant="outline-light"
                                            id="dropdown-basic">
                                            <div className={alertTraccion}>
                                                {selectTraccion}
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            variant="outline-light"
                                            className="tamañocajaoptionsitems">
                                            {tipotraccion &&
                                                tipotraccion.map((item) => {
                                                    return (
                                                        <Dropdown.Item
                                                            className="itemsdropdowncustom"
                                                            onClick={() =>
                                                                setSelectTraccion(
                                                                    item.label
                                                                )
                                                            }
                                                            eventKey={
                                                                item.value
                                                            }>
                                                            {item.label}
                                                        </Dropdown.Item>
                                                    );
                                                })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            ) : vehiculoUnoUbicar ? (
                <div>
                    {console.log(
                        "DATOS UNO  : ",
                        nombreCarroceriaVeh,
                        nombreMarcaVeh,
                        nombreAnnoVeh,
                        nombreModeloVeh,
                        nombreCilindrajesVeh,
                        nombreTransmisionVeh,
                        nombreCombustibleVeh,
                        nombreTraccionVeh
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default DatosVehiculos;
