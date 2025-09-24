import React, { forwardRef } from 'react';
import './PlacaAproveiteDupla.css';

const PlacaAproveiteDupla = forwardRef(({ titulo, precoReal, precoCentavos, 
    titulo2, precoReal2, precoCentavos2 }, ref) => {
    return (

            <div ref={ref} className="placa-aproveiteDupla">
                <span className="sloganAproveiteDupla">APROVEITE</span>
                <div className="corpoAproveiteDupla">
                    <span className='tituloAproveiteDupla'>{titulo}</span>
                    <span className='cifraoAproveiteDupla'>&nbsp; R$</span>
                    <div className='precoAproveiteDupla'>
                    <span className="precoAproveiteRealDupla">{precoReal} </span>
                    <span className="precoAproveiteCentavosDupla">,{precoCentavos}</span>
                    </div>    
                </div>
                <span className="sloganAproveiteDupla">APROVEITE</span>
                <div className="corpoAproveiteDupla">
                    <span className='tituloAproveiteDupla'>{titulo2}</span>
                    <span className='cifraoAproveiteDupla'>&nbsp; R$</span>
                    <div className='precoAproveiteDupla'>
                    <span className="precoAproveiteRealDupla">{precoReal2} </span>
                    <span className="precoAproveiteCentavosDupla">,{precoCentavos2}</span>
                    </div>    
                </div>
            </div>
    )
})
 
export default PlacaAproveiteDupla;