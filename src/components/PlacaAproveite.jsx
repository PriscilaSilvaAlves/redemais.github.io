import React, { forwardRef } from 'react';
import './PlacaAproveite.css';

const PlacaAproveite = forwardRef(({ titulo, precoReal, precoCentavos, dataInicial, dataFinal }, ref) => {
  return (
    <div ref={ref} className="placa-aproveite">
        <span className="sloganAproveite">APROVEITE</span>
        <div className="corpoAproveite">
            <span className='tituloAproveite'>{titulo}</span>
            <span className='cifraoAproveite'>&nbsp; R$</span>
            <div className='precoAproveite'>
              <span className="precoAproveiteReal">{precoReal} </span>
              <span className="precoAproveiteCentavos">,{precoCentavos}</span>
            </div>    
        </div>
    </div>
  );
});

export default PlacaAproveite;