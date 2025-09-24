import React, { forwardRef } from 'react';
import './PlacaOfertaDupla.css';

const PlacaOfertaDupla = forwardRef(({ titulo, precoInicial, precoReal, precoCentavos, dataInicial, dataFinal,
    titulo2, precoInicial2, precoReal2, precoCentavos2, dataInicial2, dataFinal2
 }, ref) => {
  return (
    <div ref={ref} className="placa-ofertaDupla">
        <span className="sloganOfertaDupla">OFERTA</span>
        <div className="corpoOfertaDupla">
            <span className='tituloOfertaDupla'>{titulo}</span>
            <br></br>
            {precoInicial && <span className='cifraoOfertaDupla'>&nbsp;<s>De {precoInicial} </s>. Por R$</span>}
            {!precoInicial && <span className='cifraoOfertaDupla'>&nbsp; R$</span>}
            <div className='precoOfertaDupla'>
              <span className="precoOfertaRealDupla">{precoReal}</span>
              <span className="precoOfertaCentavosDupla">,{precoCentavos}</span>
            </div>    
        </div>
        <span className='footerOfertaDupla'>Oferta válida de {dataInicial} até {dataFinal}.</span>
        <span className="sloganOfertaDupla">OFERTA</span>
        <div className="corpoOfertaDupla">
            <span className='tituloOfertaDupla'>{titulo2}</span>
            <br></br>
            {precoInicial2 && <span className='cifraoOfertaDupla'>&nbsp;<s>De {precoInicial2} </s>. Por R$</span>}
            {!precoInicial2 && <span className='cifraoOfertaDupla'>&nbsp; R$</span>}
            <div className='precoOfertaDupla'>
              <span className="precoOfertaRealDupla">{precoReal2}</span>
              <span className="precoOfertaCentavosDupla">,{precoCentavos2}</span>
            </div>    
        </div>
        {(dataInicial2 && dataFinal2) && <span className='footerOfertaDupla'> Oferta válida de {dataInicial2} até {dataFinal2}.</span>}
    </div>
  );
});
 
export default PlacaOfertaDupla;