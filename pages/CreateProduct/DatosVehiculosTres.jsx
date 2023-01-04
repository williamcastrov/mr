import React, { useState, useEffect, useRef } from "react";
import swal from "sweetalert";
import { Row, Col, Dropdown, Form } from "react-bootstrap";
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

function DatosVehiculosTres(props) {
    const {
        vehiculoTresCrear,
        setVehiculoTresCrear,
        vehiculoTresEditar,
        setVehiculoTresEditar,
        vehiculoTresDuplicar,
        setVehiculoTresDuplicar,
        vehiculoTresSelecc,
        setVehiculoTresSelecc,
        agregarVehiculo,
        setAgregarVehiculo,
        setAgregarDatos,
        agregarDatos,
        setDuplicar,
        duplicar,
        vehiculoTresUbicar,
        setVehiculoTresUbicar,
        setTipoVehTres,
        setMarcaVehTres,
        setAnnoVehTres,
        setModeloVehTres,
        setCarroceriaVehTres,
        setcilindrajeVehTres,
        settransmisionVehTres,
        setcombustibleVehTres,
        settraccionVehTres,
        tipoVehSelec,
        showTraccion,
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
        controlDuplicar,
        setControlDuplicar,
        dataannos,
        tipoVehiculoSeleccionado,
        contador,
        setContador,
        marcaVehTres,
        annoVehTres,
        modeloVehTres,
        carroceriaVehTres,
        cilindrajeVehTres,
        transmisionVehTres,
        combustibleVehTres,
        traccionVehTres,
    } = props;

    // Asignar nombre de las opciones seleccionadas en lo vehiculos
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
    const [editarTipo, setEditarTipo] = useState(false);
    const [editarCarroceria, setEditarCarroceria] = useState(false);
    const [editarMarca, setEditarMarca] = useState(false);
    const [editarModelo, setEditarModelo] = useState(false);

    const [editarVehiculo, setEditarVehiculo] = useState(false);

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
    const [nombreTipoVeh, setNombreTipoVeh] = useState("");
    const [nombreMarcaVeh, setNombreMarcaVeh] = useState("");
    const [nombreAnnoVeh, setNombreAnnoVeh] = useState("");
    const [nombreModeloVeh, setNombreModeloVeh] = useState("");
    const [nombreCilindrajesVeh, setNombreCilindrajesVeh] = useState("");
    const [nombreCarroceriaVeh, setNombreCarroceriaVeh] = useState("");
    const [nombreTransmisionVeh, setNombreTransmisionVeh] = useState("");
    const [nombreCombustibleVeh, setNombreCombustibleVeh] = useState("");
    const [nombreTraccionVeh, setNombreTraccionVeh] = useState("");

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

    // Lee modelos de los Vehiculos del state
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

    useEffect(() => {
        if (vehiculoBorrar && !duplicar && !vehiculoTresEditar) {
            setVehiculoBorrar(false);
        }
    }, [vehiculoBorrar]);


    useEffect(() => {
        if (vehiculoTresCrear) {
            setMarcaVeh("");
            setAnnoVeh("");
            setModeloVeh("");
            setCilindrajesVeh("");
            setCarroceriaVeh("");
            setTransmisionVeh("");
            setCombustibleVeh("");
            setTraccionVeh("");

            setSelectTipo("Tipo Vehículo");
            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectAnno("Año");
            setSelectModelo("Modelo");
            if (showTransmision) {
                setSelectTransmision("");
                setSelectTraccion("");
            } else {
                setSelectTransmision("Transmisión");
                setSelectTraccion("Tracción");
            }
            setSelectCilindraje("Cilindraje");
            setSelectCombustible("Combustible");

            if (showTraccion) {
                setSelectTraccion("");
            }

            setMarcas([]);
            setCilindrajes([]);
            setModels([]);

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
        }
    }, [vehiculoTresCrear]);

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
        if (vehiculoTresEditar) {
            setMarcaVeh(marcaVehTres);
            setAnnoVeh(annoVehTres);
            setModeloVeh(modeloVehTres);
            setCilindrajesVeh(cilindrajeVehTres);
            setCarroceriaVeh(carroceriaVehTres);
            setTransmisionVeh(transmisionVehTres);
            setCombustibleVeh(combustibleVehTres);
            setTraccionVeh(traccionVehTres);
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(carroceriaVehTres)
                ) {
                    setSelectCarroceria(row.carroceria);
                }
            });

            listMarcas.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(marcaVehTres)) {
                    setSelectMarca(row.text);
                }
            });

            annos.forEach((row) => {
                if (Number.parseInt(row.id) === Number.parseInt(annoVehTres)) {
                    setSelectAnno(row.anovehiculo);
                }
            });

            listModelos.forEach((row) => {
                if (
                    Number.parseInt(row.id) === Number.parseInt(modeloVehTres)
                ) {
                    setSelectModelo(row.modelo);
                }
            });

            listCilindrajes.forEach((row) => {
                if (
                    Number.parseInt(row.id) ===
                    Number.parseInt(cilindrajeVehTres)
                ) {
                    setSelectCilindraje(row.cilindraje);
                }
            });

            if (transmisionVehTres == 1) {
                setSelectTransmision("Automática");
            } else if (transmisionVehTres == 2) {
                setSelectTransmision("Manual");
            } else {
                setSelectTransmision("");
            }

            if (combustibleVehTres == 1) {
                setSelectCombustible("Gasolina");
            } else if (combustibleVehTres == 2) {
                setSelectCombustible("Diesel");
            } else if (combustibleVehTres == 3) {
                setSelectCombustible("Gasolina - Gas");
            } else if (combustibleVehTres == 4) {
                setSelectCombustible("Gasolina – Eléctrico");
            } else {
                setSelectCombustible("");
            }

            if (traccionVehTres == 1) {
                setSelectTraccion("Tracción Delantera");
            } else if (traccionVehTres == 2) {
                setSelectTraccion("Tracción Trasera");
            } else if (traccionVehTres == 3) {
                setSelectTraccion("Tracción 4x4");
            } else if (traccionVehTres == 4) {
                setSelectTraccion("");
            }

            const newDet = [];
            listMarcas &&
                listMarcas.forEach((row) => {
                    if (
                        Number.parseInt(row.tipovehiculo) ===
                            Number.parseInt(tipoVehSelec) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehTres)
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
                            Number.parseInt(marcaVehTres) &&
                        Number.parseInt(row.carroceria) ===
                            Number.parseInt(carroceriaVehTres)
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
                        Number.parseInt(modeloVehTres)
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

            if (tipoVehSelec == 3 || tipoVehSelec == 6) {
                if (showTransmision) {
                    setSelectTransmision("");
                    setSelectTraccion("");
                }
            }
         
            if (tipoVehSelec == 1 || tipoVehSelec == 3 || tipoVehSelec == 4 || tipoVehSelec == 6) {
                if (showTraccion) {
                    setSelectTraccion("");
                }
            }
        }
    }, [vehiculoTresEditar]);

    useEffect(() => {
        if (duplicar) {

            setVehiculoTresCrear(false);

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
                            Number.parseInt(tipoVehSelec) &&
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
                    if (item.value == tipoVehSelec) {
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
        setTipoVeh(tipoVehSelec);
        list.forEach((row) => {
            if (
                Number.parseInt(row.tipovehiculo) ===
                Number.parseInt(tipoVehSelec)
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

        if (tipoVehSelec == 3 || tipoVehSelec == 6) {
            if (showTransmision) {
                setSelectTransmision("");
                setSelectTraccion("");
            }
        }
     
        if (tipoVehSelec == 1 || tipoVehSelec == 3 || tipoVehSelec == 4 || tipoVehSelec == 6) {
            if (showTraccion) {
                setSelectTraccion("");
            }
        }
    }, [duplicar]);

    useEffect(() => {
        if (controlGrabar) {
            if (tipoVehSelec != 1 && tipoVehSelec != 3 && tipoVehSelec != 6) {
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
                    !combustibleVeh
                ) {
                    setcontrolGrabar(false);
                    return;
                }
            }

            if (traccionVeh == 1) {
                setNombreTraccionVeh("Tracción Delantera");
            } else if (traccionVeh == 2) {
                setNombreTraccionVeh("Tracción Trasera");
            } else if (traccionVeh == 3) {
                setNombreTraccionVeh("Tracción 4x4");
            } else if (traccionVeh == 4) {
                setNombreTraccionVeh("");
            }

            let continuar = true;
            let vehiculo =
                "" +
                tipoVehSelec +
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
                            setShowModalMensajes(true);
                            setTituloMensajes("Información del producto");
                            setTextoMensajes(
                                "Heey, No puedes grabar dos vehícuos iguales 31!"
                            );
                            continuar = false;
                            return;
                            setcontrolGrabar(false);
                        }
                    });
            }

            setTipoVehTres(tipoVehSelec);
            setMarcaVehTres(marcaVeh);
            setAnnoVehTres(annoVeh);
            setModeloVehTres(modeloVeh);
            setcilindrajeVehTres(cilindrajesVeh);
            setCarroceriaVehTres(carroceriaVeh);
            settransmisionVehTres(transmisionVeh);
            setcombustibleVehTres(combustibleVeh);
            settraccionVehTres(traccionVeh);

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

            if (tipoVehSelec == 1 || tipoVehSelec == 3 || tipoVehSelec == 6) {
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

            setcontrolGrabar(false);
        } else if (
            !marcaVeh ||
            !annoVeh ||
            !modeloVeh ||
            !cilindrajesVeh ||
            !carroceriaVeh ||
            !combustibleVeh
        ) {
            setcontrolGrabar(false);
            return;
        }
    }, [controlGrabar]);

    const guardarVehiculo = () => {
        setAgregarVehiculo(true);
        setVehiculoTresCrear(false);
        setVehiculoTresEditar(false);
        setVehiculoTresSelecc(true);
        setControlAgregarVehiculo(true);
        setTipoVehTres(tipoVehSelec);
        setMarcaVehTres(marcaVeh);
        setAnnoVehTres(annoVeh);
        setModeloVehTres(modeloVeh);
        setcilindrajeVehTres(cilindrajesVeh);
        setCarroceriaVehTres(carroceriaVeh);
        settransmisionVehTres(transmisionVeh);
        setcombustibleVehTres(combustibleVeh);
        settraccionVehTres(traccionVeh);
    };

    useEffect(() => {
        if (editarTipo) {
            setMarcas([]);
            setCarrocerias([]);
            setCilindrajes([]);
            setModels([]);
            setEditarMarcaVeh("");
            setEditarAnnoVeh("");
            setEditarModeloVeh("");
            setEditarCilindrajesVeh("");
            setEditarCarroceriaVeh("");

            setSelectCarroceria("Carroceria");
            setSelectMarca("Marca");
            setSelectModelo("Modelo");
            setSelectCilindraje("Cilindraje");

            const newDet = [];
            listCarrocerias.forEach((row) => {
                if (
                    Number.parseInt(row.tipovehiculo) ===
                    Number.parseInt(tipoVehSelec)
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
            //console.log("DATOS : ", newDet);

            setEditarTipo(false);
        }
    }, [editarTipo]);

    useEffect(() => {
        if (editarCarroceria) {
            setMarcas([]);
            setCilindrajes([]);
            setModels([]);
            //transmision = [];
            //tipotraccion = [];
            setEditarMarcaVeh("");
            setEditarAnnoVeh("");
            setEditarModeloVeh("");
            setEditarCilindrajesVeh("");
            //setEditarCarroceriaVeh("");
            //setEditarTransmisionVeh("");
            setMarcaVeh("");
            //setAnnoVeh("");
            setModeloVeh("");
            setCilindrajesVeh("");

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
            setModeloVeh("");
            setCilindrajesVeh("");

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
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
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
            setEditarCilindrajesVeh(0);
            setSelectCilindraje("Cilindraje");

            const newDet = [];
            listCilindrajes &&
                listCilindrajes.forEach((row) => {
                    if (
                        Number.parseInt(row.modelo) ===
                        Number.parseInt(modeloVeh)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
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
            //console.log("CILINDRAJE : ", newDet);
            setCilindrajes(newDet);
            setEditarModelo(false);
        }
    }, [editarModelo]);

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

    const [selected, setSelected] = useState(1);

    const handleChange = (selectedOptions) => {
        //console.log("SELECTED OPTION : ",selectedOptions)
        setTipoVeh(selectedOptions);

        setEditarTipo(true);

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
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeCarroceria = (selectedOptions) => {
        setCarroceriaVeh(selectedOptions);
        setEditarCarroceria(true);

        if (vehiculoTresEditar || vehiculoTresDuplicar) {
            setEditarCambioCarroceria(1);
            setEditarCarroceria(true);
        }

        listCarrocerias.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCarroceriaVeh(row.carroceria);
            }
        });

        setEditarCarroceria(true);

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
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeBrand = (selectedOptions) => {
        setMarcaVeh(selectedOptions);
        setEditarMarca(true);

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreMarcaVeh(row.text);
            }
        });

        if (vehiculoTresEditar || vehiculoTresDuplicar) {
            setEditarMarca(true);
            setEditarCambioMarca(2);
        }

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
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

        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeAnno = (selectedOptions) => {
        setAnnoVeh(selectedOptions);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioAnno(1);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioMarca == 2
        )
            setEditarCambioAnno(2);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioModelo == 3
        )
            setEditarCambioAnno(3);

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreAnnoVeh(row.anovehiculo);
          
            }
        });
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeModels = (selectedOptions) => {
       
        const newModelo = [];
        newModelo.push(selectedOptions);

        setModeloVeh(newModelo);
        setSelectCilindraje("Cilindraje");

        setEditarModelo(true);

        if (vehiculoTresEditar || vehiculoTresDuplicar) setEditarModelo(true);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioModelo(1);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioMarca == 2
        )
            setEditarCambioModelo(2);

        if (
            vehiculoTresEditar &&
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
                        Number.parseInt(row.modelo) === Number.parseInt(modelo)
                    ) {
                        //console.log("TIPO DE PRODUCTO SelecDO ES : ", row.tipodeproducto)
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
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeVersionMotor = (selectedOptions) => {
        setCilindrajesVeh(selectedOptions);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioCarroceria == 1
        )
            setEditarCambioCilindraje(1);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioMarca == 2
        )
            setEditarCambioCilindraje(2);

        if (
            (vehiculoTresEditar || vehiculoTresDuplicar) &&
            editarCambioModelo == 3
        )
            setEditarCambioCilindraje(3);

        listCilindrajes.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(selectedOptions)) {
                setNombreCilindrajesVeh(row.cilindraje);
                //console.log("NOMBRE CARROCERIA SELECCIONADA : ", row.carroceria);
            }
        });
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
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
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const handleChangeCombustible = (selectedOptions) => {
        setCombustibleVeh(selectedOptions);

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

        if (tipoVehSelec == 1 || tipoVehSelec == 3 || tipoVehSelec == 6) {
            setNombreTraccionVeh("");
            settraccionVehTres(4);
        }
        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
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

        if (!vehiculoTresEditar && !vehiculoTresDuplicar)
            setcontrolGrabar(true);
    };

    const editarDatosVehiculos = () => {
        setControlAgregarVehiculo(false);

        let count = 0;

        if (contador == 10) count = 0;
        else count = controlAccion + 1;

        setControlAccion(count);

        if (count > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo 31!"
            );
            return;
        }

        setVehiculoTresEditar(true);
        setVehiculoTresSelecc(false);
        setEditarTipoVeh(tipoVeh);
        setEditarMarcaVeh(marcaVehTres);
        setEditarAnnoVeh(annoVehTres);
        setEditarModeloVeh(modeloVehTres);
        setEditarCilindrajesVeh(cilindrajeVehTres);
        setEditarCarroceriaVeh(carroceriaVehTres);
        setEditarTransmisionVeh(transmisionVehTres);
        setEditarCombustibleVeh(combustibleVehTres);
        setEditarTraccionVeh(traccionVehTres);

        setMarcaVeh(marcaVehTres);
        setAnnoVeh(annoVehTres);
        setModeloVeh(modeloVehTres);
        setCilindrajesVeh(cilindrajeVehTres);
        setCarroceriaVeh(carroceriaVehTres);
        setTransmisionVeh(transmisionVehTres);
        setCombustibleVeh(combustibleVehTres);
        setTraccionVeh(traccionVehTres);

        //retornaValoresVehiculo();

        listCarrocerias.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(carroceriaVehTres)
            ) {
                setSelectCarroceria(row.carroceria);
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehTres)) {
                setSelectMarca(row.text);
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehTres)) {
                setSelectAnno(row.anovehiculo);
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehTres)) {
                setSelectModelo(row.modelo);
            }
        });

        listCilindrajes.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(cilindrajeVehTres)
            ) {
                setSelectCilindraje(row.cilindraje);
            }
        });

        if (transmisionVehTres == 1) {
            setSelectTransmision("Automática");
        } else if (transmisionVehTres == 2) {
            setSelectTransmision("Manual");
        } else {
            setSelectTransmision("");
        }

        if (combustibleVehTres == 1) {
            setSelectCombustible("Gasolina");
        } else if (combustibleVehTres == 2) {
            setSelectCombustible("Diesel");
        } else if (combustibleVehTres == 3) {
            setSelectCombustible("Gasolina - Gas");
        } else if (combustibleVehTres == 4) {
            setSelectCombustible("Gasolina – Eléctrico");
        } else {
            setSelectCombustible("");
        }

        if (traccionVehTres == 1) {
            setSelectTraccion("Tracción Delantera");
        } else if (traccionVehTres == 2) {
            setSelectTraccion("Tracción Trasera");
        } else if (traccionVehTres == 3) {
            setSelectTraccion("Tracción 4x4");
        } else if (traccionVehTres == 4) {
            setSelectTraccion("");
        }
    };

    const duplicarDatosVehiculos = () => {

        if (contador == 10) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Número de vehículos no puede ser mayor a 10!"
            );
            return;
        }
       
        let count = 1;
        setControlAccion(count);

        if (
            !vehiculoTresCrear &&
            !vehiculoTresDuplicar &&
            !vehiculoTresEditar
        ) {
            let count = controlAccion + 1;
            setControlAccion(count);
        }

        if (count > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar o duplicar vehículo 32!"
            );
            console.log("VALOR CONTREOL : ", count);
            return;
        }

        setDuplicar(true);
        setAgregarDatos(true);

        let duplicarCarroceria;
        let duplicarMarca;
        let duplicarAnno;
        let duplicarModelo;
        let duplicarCilindraje;
        let duplicarTransmision;
        let duplicarCombustible;
        let duplicarTraccion;

        listCarrocerias.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(carroceriaVehTres)
            ) {
                duplicarCarroceria = row.carroceria;
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehTres)) {
                duplicarMarca = row.text;
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehTres)) {
                duplicarAnno = row.anovehiculo;
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehTres)) {
                duplicarModelo = row.modelo;
            }
        });

        listCilindrajes.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(cilindrajeVehTres)
            ) {
                duplicarCilindraje = row.cilindraje;
            }
        });

        if (transmisionVehTres == 1) {
            duplicarTransmision = "Automática";
        } else if (transmisionVehTres == 2) {
            duplicarTransmision = "Manual";
        } else {
            duplicarTransmision = "";
        }

        if (combustibleVehTres == 1) {
            duplicarCombustible = "Gasolina";
        } else if (combustibleVehTres == 2) {
            duplicarCombustible = "Diesel";
        } else if (combustibleVehTres == 3) {
            duplicarCombustible = "Gasolina - Gas";
        } else if (combustibleVehTres == 4) {
            duplicarCombustible = "Gasolina – Eléctrico";
        } else {
            duplicarCombustible = "";
        }

        if (traccionVehTres == 1) {
            duplicarTraccion = "Tracción Delantera";
        } else if (traccionVehTres == 2) {
            duplicarTraccion = "Tracción Trasera";
        } else if (traccionVehTres == 3) {
            duplicarTraccion = "Tracción 4x4";
        } else if (traccionVehTres == 4) {
            duplicarTraccion = "";
        }

        let duplicar = {
            tipoVeh: tipoVeh,
            marcaVeh: marcaVehTres,
            annoVeh: annoVehTres,
            modeloVeh: modeloVehTres,
            cilindrajesVeh: cilindrajeVehTres,
            carroceriaVeh: carroceriaVehTres,
            transmisionVeh: transmisionVehTres,
            combustibleVeh: combustibleVehTres,
            traccionVeh: traccionVehTres,
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
                setVehiculoTresEditar(false);
                setVehiculoTresSelecc(true);
            }
        }
    }, [abandonarRegistro]);

    const retornaValoresVehiculo = () => {
        listCarrocerias.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(carroceriaVehTres)
            ) {
                setNombreCarroceriaVeh(row.carroceria);
            }
        });

        listMarcas.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(marcaVehTres)) {
                setNombreMarcaVeh(row.text);
            }
        });

        annos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(annoVehTres)) {
                setNombreAnnoVeh(row.anovehiculo);
            }
        });

        listModelos.forEach((row) => {
            if (Number.parseInt(row.id) === Number.parseInt(modeloVehTres)) {
                setNombreModeloVeh(row.modelo);
            }
        });

        listCilindrajes.forEach((row) => {
            if (
                Number.parseInt(row.id) === Number.parseInt(cilindrajeVehTres)
            ) {
                setNombreCilindrajesVeh(row.cilindraje);
            }
        });

        if (transmisionVehTres == 1) {
            setNombreTransmisionVeh("Automática");
        } else if (transmisionVehTres == 2) {
            setNombreTransmisionVeh("Manual");
        } else {
            setNombreTransmisionVeh("");
        }

        if (combustibleVehTres == 1) {
            setNombreCombustibleVeh("Gasolina");
        } else if (combustibleVehTres == 2) {
            setNombreCombustibleVeh("Diesel");
        } else if (combustibleVehTres == 3) {
            setNombreCombustibleVeh("Gasolina - Gas");
        } else if (combustibleVehTres == 4) {
            setNombreCombustibleVeh("Gasolina – Eléctrico");
        } else {
            setNombreCombustibleVeh("");
        }

        if (traccionVehTres == 1) {
            setNombreTraccionVeh("Tracción Delantera");
        } else if (traccionVehTres == 2) {
            setNombreTraccionVeh("Tracción Trasera");
        } else if (traccionVehTres == 3) {
            setNombreTraccionVeh("Tracción 4x4");
        } else if (traccionVehTres == 4) {
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

    const eliminaDatosVehiculos = () => {
        setcontrolGrabar(false);
        setControlAgregarVehiculo(true);
        setDuplicar(false);
        setTipoVehTres(0);
        setMarcaVehTres(0);
        setAnnoVehTres(0);
        setModeloVehTres(0);
        setCarroceriaVehTres(0);
        setcilindrajeVehTres(0);
        settransmisionVehTres(0);
        setcombustibleVehTres(0);
        settraccionVehTres(0);
        setVehiculoBorrar(false);

        let count = 0;
        setControlAccion(count);

        let vehiculo = "000000000";
        const Detveh = vehiculosSeleccionados;

        {
            Detveh &&
                Detveh.map((items, index) => {
                    if (index == 1) {
                        setVehiculosSeleccionados(vehiculo);
                    } else {
                        setVehiculosSeleccionados(items);
                    }
                    setDuplicar;
                });
        }

        setEliminoDatos(true);
        setAgregarVehiculo(true);
        setVehiculoTresCrear(false);
        setVehiculoTresEditar(false);
        setVehiculoTresDuplicar(false);
        setVehiculoTresSelecc(false);
        setVehiculoTresUbicar(true);
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
            setVehiculoTresEditar(false);
            setVehiculoTresSelecc(true);
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
            eliminaDatosVehiculos();
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

    const eliminaDatosVehiculosAgregado = () => {
        if (controlAccion > 1) {
            setShowModalMensajes(true);
            setTituloMensajes("Información del producto");
            setTextoMensajes(
                "Heey, solo una acción a la vez, crear, editar, duplicar o eliminar 35!"
            );
            return;
        }

        setcontrolGrabar(false);
        setControlAgregarVehiculo(true);
        setDuplicar(false);
        setTipoVehTres(0);
        setMarcaVehTres(0);
        setAnnoVehTres(0);
        setModeloVehTres(0);
        setCarroceriaVehTres(0);
        setcilindrajeVehTres(0);
        settransmisionVehTres(0);
        setcombustibleVehTres(0);
        settraccionVehTres(0);

        let count = 0;
        setControlAccion(count);

        let vehiculo = "000000000";

        const Detveh = vehiculosSeleccionados;

        {
            Detveh &&
                Detveh.map((items, index) => {
                    if (index == 2) {
                        setVehiculosSeleccionados(vehiculo);
                    } else {
                        setVehiculosSeleccionados(items);
                    }
                });
        }

        setEliminoDatos(true);
        setAgregarVehiculo(true);
        setVehiculoTresCrear(false);
        setVehiculoTresEditar(false);
        setVehiculoTresDuplicar(false);
        setVehiculoTresSelecc(false);
        setVehiculoTresUbicar(true);
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
        setAlertAnno("ml-2 alinearizquierda");
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
        /*
        console.log("Marca : ", marcaVeh)
        console.log("Año : ", annoVeh)
        console.log("Modelo : ",modeloVeh)
        console.log("Cilindraje : ", cilindrajesVeh)
        console.log("Carroceria : ", carroceriaVeh)
        console.log("Transmision : ", transmisionVeh)
        console.log("Combustible : ", combustibleVeh)
        console.log("Traccioón : ", traccionVeh)
        */

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
            setVehiculoTresEditar(false);
            setVehiculoTresSelecc(true);
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

        if (tipoVehSelec != 3)
            if (!transmisionVeh) {
                setAlertTransmision("ml-2 alinearizquierda textoalert");
            }

        if (!combustibleVeh) {
            setAlertCombustible("ml-2 alinearizquierda textoalert");
        }

        if (tipoVehSelec != 1 && tipoVehSelec != 6 && tipoVehSelec != 3)
            if (!traccionVeh) {
                setAlertTraccion("ml-2 alinearizquierda textoalert");
            }

        if (tipoVehSelec != 1 && tipoVehSelec != 3 && tipoVehSelec != 6) {
            if (
                //tipoVeh ||
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
                let count = 1;
                setControlAccion(count);
                return;
            }
        } else {
            if (
                //tipoVeh ||
                !marcaVeh ||
                !annoVeh ||
                !modeloVeh ||
                !cilindrajesVeh ||
                !carroceriaVeh ||
                //!transmisionVeh ||
                !combustibleVeh
            ) {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Todos los datos del vehículo son requeridos!"
                );
                let count = 1;
                setControlAccion(count);
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
                let count = 1;
                setControlAccion(count);
            }
        }

        if (editarCambioMarca == 2) {
            if (editarCambioModelo == 2 && editarCambioCilindraje == 2) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Ingresa los datos de Modelo y Cilindraje!"
                );
                let count = 1;
                setControlAccion(count);
                return;
            }
        }

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

        if (editarCambioMarca == 2) {
            if (editarCambioModelo == 2 && editarCambioCilindraje == 2) {
                console.log("OK");
            } else {
                setShowModalMensajes(true);
                setTituloMensajes("Información del producto");
                setTextoMensajes(
                    "Heey, Ingresa los datos de Modelo y Cilindraje!"
                );
                return;
            }
        }

        let continua = true;

        let vehiculo =
            "" +
            tipoVehSelec +
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
                            "Heey, No puedes grabar dos vehícuos iguales 37!"
                        );
                        return;
                    }
                });
        }

        if (continua) {
            setVehiculoTresEditar(false);
            setVehiculoTresSelecc(true);
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
         <div className="mt-4 ml-10">
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
            {vehiculoTresCrear ? (
                <Row>
                    <div className="mtmenos12">
                        {" "}
                        <Col>
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
                                                    {tipoVehiculoSeleccionado}
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
                                                                eventKey={
                                                                    item.id
                                                                }>
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
                                    className="mt-3 mlmenos14">
                                    <div className="ps-form__input mtmenos8">
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
                                    className="mt-3 mlmenos20">
                                    <div className="ps-form__input mtmenos8">
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
                                    <div className="mtmenos5">
                                        <Dropdown
                                            onSelect={handleChangeCarroceria}
                                            onClick={onClickCarroceria}>
                                            <Dropdown.Toggle
                                                className="mt-1 dropdowncustomitems"
                                                variant="outline-light"
                                                id="dropdown-basic">
                                                <div
                                                    className={alertCarroceria}>
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
                                    <div className="mtmenos2 mlmenos15">
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
                                                                eventKey={
                                                                    item.id
                                                                }>
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
                                    <div className="mlmenos15">
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
                                                <div
                                                    className={alertCilindraje}>
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
                        </Col>
                    </div>
                </Row>
            ) : vehiculoTresSelecc ? (
                <div className="mtmenos10">
                    <Row>
                        <Col xl={9} lg={9} md={9} xs={9}>
                            <div className="ps-form__input mostrarvehiculoseleccionado ">
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
                                <h3 className="mlmenos20 mtmenos10 tamañotextotooltipproducto">
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
                                <h3 className="mlmenos20 mtmenos10 tamañotextotooltipproducto">
                                    {" "}
                                    Duplicar{" "}
                                </h3>
                            </ReactTooltip>
                        </Col>
                        <Col xl={1} lg={1} md={1} xs={1}>
                        <div className="form-control ps-form__input textoeditardatosvehiculo mlmenos25 tamañoiconoadvertencia">
                                <i
                                    onClick={() =>
                                        eliminaDatosVehiculosAgregado()
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
            ) : vehiculoTresEditar ? (
                <Row>
                    <div className="mtmenos10 ml-17">
                        <div>
                            <Row>
                                <Col xl={10} lg={10} md={10} xs={10}>
                                    <Dropdown
                                        onSelect={handleChange}
                                        onClick={onClickTipo}>
                                        <Dropdown.Toggle
                                            disabled="disabled"
                                            className="mt-1 dropdowncustom"
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
                                    className="mt-3 mlmenos15">
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
                        <Row className="mtmenos3">
                            <Col xl={5} lg={5} md={5} xs={5}>
                                <div>
                                    <Dropdown
                                        onSelect={handleChangeCarroceria}
                                        onClick={onClickCarroceria}>
                                        <Dropdown.Toggle
                                            className="dropdowncustomitems"
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
                                <div className="mlmenos15">
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
                        <Row className="mtmenos3">
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
                                <div className="mt-1  mlmenos15">
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
            ) : vehiculoTresDuplicar ? (
                <Row>
                    <div className="ml-14">
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
                                className="mlmenos14">
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
                                <div>
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
                                <div className="mlmenos15">
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
                                <div >
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
                                <div className="mlmenos15">
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
            ) : vehiculoTresUbicar ? (
                <div>
                    {console.log(
                        "DATOS TRES  : ",
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

export default DatosVehiculosTres;
