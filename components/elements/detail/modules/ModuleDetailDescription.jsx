import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

// Change your description content here
const ModuleDetailDescription = ({product}) => {
    const [urlImagen, setUrlImagen] = useState("https://api.aal-estate.com") 
    const [urlImagenDos, setUrlImagenDos] = useState("https://api.aal-estate.com") 
    const [urlImagenTres, setUrlImagenTres] = useState("https://api.aal-estate.com") 
    // Lee variables generales MRP
    const variablesGeneralesMrp = useSelector(
        (state) => state.variablesgeneralesmrp.variablesgeneralesmrp
    );
    
    useEffect(() => {
        console.log("VARIABLE GENERAL : ", variablesGeneralesMrp)
        if(variablesGeneralesMrp.length > 0){
            setUrlImagen(variablesGeneralesMrp.direccionservidor+product.images[0].url);
            setUrlImagenDos(variablesGeneralesMrp.direccionservidor+product.images[1].url);
            setUrlImagenTres(variablesGeneralesMrp.direccionservidor+product.images[2].url);
            console.log("INFORMACION PRODUCTO : ", product)
            console.log("URL 1: ", variablesGeneralesMrp.direccionservidor+product.images[0].url)
        }else{
            setUrlImagen("https://api.aal-estate.com"+product.images[0].url);
            setUrlImagenDos("https://api.aal-estate.com"+product.images[1].url);
            setUrlImagenTres("https://api.aal-estate.com"+product.images[2].url);
            
            console.log("URL 2: ", "https://api.aal-estate.com"+product.images[0].url)
        }
       
    }, [variablesGeneralesMrp]);

    return (
        <div className="ps-product__description ps-document">
            <div className="row row-reverse">
                <div className="col-12 col-md-6">
                    <img
                        className="ps-thumbnail"
                        src={urlImagen}
                        alt=""
                    />
                </div>
                <div className="col-16 col-md-6">
                    <h2 className="titulodetaildescription">{product.name}</h2>
                    <div className="subtitulodetaildescription">
                        {product.short_description}
                    </div>
                    <p className="ps-desc">
                        {product.description}
                    </p>
                    <ul className="ps-list">
                        <li>
                            <img src="/static/img/iconmrp/carsvgrepo4.svg" alt="" />
                            <span>Incluye especificaciones tecnicas</span>
                        </li>
                        <li>
                            <img src="/static/img/iconmrp/carsvgrepo2.svg" alt="" />
                            <span>Certficado de calidad del producto</span>
                        </li>
                        <li>
                            <img src="/static/img/iconmrp/carsvgrepo3.svg" alt="" />
                            <span>Instrucciones de instalación</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="ps-item">
                        <img src={urlImagenDos} alt="" />
                        <a href="/">
                            Aplica Devoluciones.
                        </a>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="ps-item">
                        <img src={urlImagenTres} alt="" />
                        <a href="/">
                           Especialmente adaptado para el vehículo especificado.
                        </a>
                    </div>
                </div>
            </div>
            <div className="row m-0">
                <div className="col-12 col-md-4 p-0">
                    <div className="subtitulodetaildescription">
                        <span>{product.price}</span> El mejor precio
                    </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                    <div className="subtitulodetaildescription">
                        <span>{product.created_at}</span> <br/> Fecha de publicación
                    </div>
                </div>
                <div className="col-12 col-md-4 p-0">
                    <div className="subtitulodetaildescription">
                        <span>16 - </span>Es el número de visitas del producto
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetailDescription;
