import React, { forwardRef } from 'react';
import './PlacaOferta.css';

const PlacaOferta = forwardRef(({ titulo, precoInicial, precoReal, precoCentavos, dataInicial, dataFinal }, ref) => {
  return (
    <div ref={ref} className="placa-oferta">
        <span className="sloganOferta">OFERTA</span>
        <div className="corpoOferta">
            <span className='tituloOferta'>{titulo}</span>
            <br></br>
            {precoInicial && <span className='cifraoOferta'>&nbsp;<s>De {precoInicial} </s>. Por R$</span>}
            {!precoInicial && <span className='cifraoOferta'>&nbsp; R$</span>}
            <div className='precoOferta'>
              <span className="precoOfertaReal">{precoReal} </span>
              <span className="precoOfertaCentavos">,{precoCentavos}</span>
            </div>    
        </div>
        <span className='footerOferta'>Oferta válida de {dataInicial} até {dataFinal}.</span>
    </div>
  );
});

export default PlacaOferta; 