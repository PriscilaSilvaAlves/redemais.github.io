import { useState, useRef, useEffect } from 'react';
import PlacaOferta from '../components/PlacaOferta';
import PlacaAproveite from '../components/PlacaAproveite';
import { useReactToPrint } from 'react-to-print';
import PlacaOfertaDupla from '../components/PlacaOfertaDupla';
import PlacaAproveiteDupla from '../components/PlacaAproveiteDupla';
import './Placas.css';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';

// ⚠️ Caminho relativo à pasta "public"
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const Placas = () => {
  const componentRef = useRef(); // Ref para o contêiner principal das placas
  const [placas, setPlacas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [precoInicial, setPrecoInicial] = useState('');
  const [precoReal, setPrecoReal] = useState('');
  const [precoCentavos, setPrecoCentavos] = useState('');
  const [precoPromocional, setPrecoPromocional] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [titulo2, setTitulo2] = useState('');
  const [precoInicial2, setPrecoInicial2] = useState('');
  const [precoReal2, setPrecoReal2] = useState('');
  const [precoCentavos2, setPrecoCentavos2] = useState('');
  const [precoPromocional2, setPrecoPromocional2] = useState('');
  const [dataInicial2, setDataInicial2] = useState('');
  const [dataFinal2, setDataFinal2] = useState('');
  const [tipo, setTipo] = useState('');
  const [submeteu, setSubmeteu] = useState(false); 
  const [segundaPlaca, setSegundaPlaca] = useState(false);

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async (event) => {
    const typedarray = new Uint8Array(event.target.result);
    const pdf = await getDocument({ data: typedarray }).promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join(' ') + '\n';
    }

    // Dividir em "linhas" com base no padrão de produtos
    const linhas = fullText
      .split(/(?=OfertaDupla|AproveiteDupla|Oferta|Aproveite)/g)
      .map((linha) => linha.trim())
      .filter(Boolean);

    console.log('Linhas extraídas do PDF:', linhas);

    const placasFinal = [];

    function formatarData(data) {
      if (!data) return '';
      const partes = data.split('-');
      return `${partes[2]}/${partes[1]}`; // DD/MM
    }

    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];

      const regex = /^(OfertaDupla|AproveiteDupla|Oferta|Aproveite)\s+([^\d]+?)\s+(\d{1,3},\d{2})\s+(\d{1,3},\d{2})\s+(\d{4}-\d{2}-\d{2})\s+(\d{4}-\d{2}-\d{2})$/;
      const match = linha.match(regex);

      if (!match) {
        console.warn(`Linha ignorada por não casar com regex: ${linha}`);
        continue;
      }

      const [_, tipo, titulo, precoInicial, precoPromocional, dataInicial, dataFinal] = match;
      const precoReal = parseInt(precoPromocional.split(',')[0], 10) || 0;
      const precoCentavos = parseInt(precoPromocional.split(',')[1], 10) || 0;

      // Se for uma placa dupla, pega a próxima linha também
      if ((tipo === 'OfertaDupla' || tipo === 'AproveiteDupla') &&
          i + 1 < linhas.length) {

        const linha2 = linhas[i + 1].match(regex);
        if (!linha2) {
          console.warn(`Segunda linha inválida para placa dupla: ${linhas[i + 1]}`);
          continue;
        }

        const [, , titulo2, precoInicial2, precoPromocional2, dataInicial2, dataFinal2] = linha2;
        const precoReal2 = parseInt(precoPromocional2.split(',')[0], 10) || 0;
        const precoCentavos2 = parseInt(precoPromocional2.split(',')[1], 10) || 0;

        placasFinal.push({
          tipo,
          titulo,
          precoInicial,
          precoPromocional,
          precoReal,
          precoCentavos,
          dataInicial: formatarData(dataInicial),
          dataFinal: formatarData(dataFinal),
          titulo2,
          precoInicial2,
          precoPromocional2,
          precoReal2,
          precoCentavos2,
          dataInicial2: formatarData(dataInicial2),
          dataFinal2: formatarData(dataFinal2),
        });

        i++; // pula a próxima linha, pois já foi usada

      } else {
        // Placa simples
        placasFinal.push({
          tipo,
          titulo,
          precoInicial,
          precoPromocional,
          precoReal,
          precoCentavos,
          dataInicial: formatarData(dataInicial),
          dataFinal: formatarData(dataFinal),
        });
      }
    }

    console.log('Placas processadas:', placasFinal);
    setPlacas(placasFinal);
  };

  reader.readAsArrayBuffer(file);
};

  
  const formatarData = (data) => {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}`; // dd/mm
  };

  function separarPreco(){
    let partes = precoPromocional.split(",");
    console.log(partes);
    let inteiro = parseInt(partes[0]);
    setPrecoReal(inteiro);
    let centavos = parseInt(partes[1]);
    setPrecoCentavos(centavos);
    if (precoPromocional2 != ''){
      let partes2 = precoPromocional2.split(",");
      console.log(partes2);
      let inteiro2 = parseInt(partes2[0]);
      setPrecoReal2(inteiro2);
      let centavos2 = parseInt(partes2[1]);
      setPrecoCentavos2(centavos2);
    }
    console.log(precoReal);
    console.log(precoCentavos);
  }
  
  const handleSubmit = (event) => {
    console.log("Entrou no handlesubmit")
    event.preventDefault();
    console.log("submit");
    separarPreco();
    setSubmeteu(true);
  }

      useEffect(()=>{
        if (!submeteu) return;
        if(tipo === "Oferta"){
          if (titulo && precoReal && precoCentavos && dataInicial && dataFinal && tipo) {
            // Atualizando o estado com a nova placa
            const placa = {
              titulo,
              precoInicial,
              precoReal,
              precoCentavos,
              dataInicial: formatarData(dataInicial),
              dataFinal: formatarData(dataFinal),
              tipo
            };
            setPlacas(prevPlacas => [
              ...prevPlacas, placa
            ]);
          } else {
            alert("Todos os campos precisam ser preenchidos.");
          }
        }
        if(tipo === "Aproveite"){
            if (titulo && precoReal && precoCentavos && tipo) {
              // Atualizando o estado com a nova placa
              setPlacas(prevPlacas => [
                ...prevPlacas,
                { titulo, precoReal, precoCentavos, tipo }
              ]);
            } else {
              alert("Todos os campos precisam ser preenchidos.");
            }
        }
        if(tipo === "AproveiteDupla"){
          if (titulo && precoReal && precoCentavos && tipo){
            console.log("Imprimindo precoReal");
            console.log(precoReal);
            setPlacas(prevPlacas => [
              ...prevPlacas,
              {titulo, precoReal, precoCentavos, titulo2, precoReal2, precoCentavos2, tipo}
            ]);
          } else {
            alert("Todos os campos precisam ser preenchidos.");
          }
        }
        if(tipo === "OfertaDupla"){
          if (titulo && precoReal && precoCentavos && dataInicial && dataFinal && tipo){
            const placa = {
              titulo,
              precoInicial,
              precoReal,
              precoCentavos,
              dataInicial: formatarData(dataInicial),
              dataFinal: formatarData(dataFinal),
              titulo2, 
              precoInicial2, 
              precoReal2, 
              precoCentavos2, 
              dataInicial2: formatarData(dataInicial2), 
              dataFinal2: formatarData(dataFinal2),
              tipo
            };
            setPlacas(prevPlacas => [
              ...prevPlacas, placa
            ]);
          } else{
            alert("Todos os campos precisam ser preenchidos.");
          }
        }

          setTitulo('');
          setPrecoInicial('');
          setPrecoReal('');
          setPrecoCentavos('');
          setPrecoPromocional('');
          setDataInicial('');
          setDataFinal('');
          setTitulo2('');
          setPrecoInicial2('');
          setPrecoReal2('');
          setPrecoCentavos2('');
          setPrecoPromocional2('');
          setDataInicial2('');
          setDataFinal2('');
          setTipo('');
          setSubmeteu(false);
     }, [precoReal, precoCentavos, dataFinal, dataInicial, submeteu, precoReal2, precoCentavos2, dataInicial2, dataFinal2]);

  function Data() {
    if (placas.length === 0) {
      return null; // Não renderiza nada se o array estiver vazio
    }

    return (
      <div ref={componentRef}> {/* Ref agora no contêiner das placas */}
        {placas.map((placa, index) => {
          if (placa.tipo === "Oferta") {
            return (
              <div className="background" key={index}>
                <PlacaOferta
                  titulo={placa.titulo}
                  precoInicial={placa.precoInicial}
                  precoReal={placa.precoReal}
                  precoCentavos={placa.precoCentavos}
                  dataInicial={placa.dataInicial}
                  dataFinal={placa.dataFinal}
                />
              </div>
            );
          }
          if (placa.tipo === "Aproveite") {
            return (
              <div className="background" key={index}>
                <PlacaAproveite
                  titulo={placa.titulo}
                  precoReal={placa.precoReal}
                  precoCentavos={placa.precoCentavos}
                />
              </div>
            );
          }
          if (placa.tipo === "OfertaDupla" || placa.tipo === "Oferta Dupla") {
            return (
              <div className="background" key={index}>
                <PlacaOfertaDupla
                  titulo={placa.titulo}
                  precoInicial={placa.precoInicial}
                  precoReal={placa.precoReal}
                  precoCentavos={placa.precoCentavos}
                  dataInicial={placa.dataInicial}
                  dataFinal={placa.dataFinal}
                  titulo2={placa.titulo2}
                  precoInicial2={placa.precoInicial2}
                  precoReal2={placa.precoReal2}
                  precoCentavos2={placa.precoCentavos2}
                  dataInicial2={placa.dataInicial2}
                  dataFinal2={placa.dataFinal2}
                />
              </div>
            );
          }
          if (placa.tipo === "AproveiteDupla" || placa.tipo === "Aproveite Dupla") {
            return (
              <div className="background" key={index}>
                <PlacaAproveiteDupla
                  titulo={placa.titulo}
                  precoReal={placa.precoReal}
                  precoCentavos={placa.precoCentavos}
                  titulo2={placa.titulo2}
                  precoReal2={placa.precoReal2}
                  precoCentavos2={placa.precoCentavos2}
                />
              </div>
            );
          }
          return null; // Caso não corresponda a nenhum tipo
        })}
      </div>
    );
  }
  const handlePrint = useReactToPrint({
      documentTitle: 'Title',
      contentRef: componentRef,
    })
    function addPlaca(){
      setSegundaPlaca(true);
    }
    function delPlaca(){
      setSegundaPlaca(false);
    }
  return (
    <div>
      <header className="App-header">
        <h1>Crie a sua placa abaixo:</h1>
        <form onSubmit={handleSubmit}>
          {segundaPlaca && <span className='alerta'>PRIMEIRA PLACA:</span>}
          <span className='info'>(Para as placas de Aproveite só é 
            obrigatório colocar Título, Preço Promocional e Tipo. Para as placas de Oferta 
            apenas o campo Preço Inicial é optativo.)</span>
          <label>
            <span>Título: </span>
            <input
              type="text"
              name="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              required
            />
          </label>
           <label>
            <span>Preço Inicial: </span>
            <input
              type="text"
              name="precoInicial"
              value={precoInicial}
              onChange={(event) => setPrecoInicial(event.target.value)}
              pattern="^\d+,\d{2}$"
              title="Use o formato com vírgula e dois dígitos após ela. Ex: 12,34"
            />
            </label>
          <label>
            <span>Preço Promocional: </span>
            <input
              type="text"
              name="precoReal"
              value={precoPromocional}
              onChange={(event) => setPrecoPromocional(event.target.value)}
              pattern="^\d+,\d{2}$"
              title="Use o formato com vírgula e dois dígitos após ela. Ex: 12,34"
              required
            />
            </label>
          <label>
            <span>Data Inicial: </span>
            <input
              type="date"
              name="dataInicial"
              value={dataInicial}
              onChange={(event) => setDataInicial(event.target.value)}
            />
          </label>
          <label>
            <span>Data Final: </span>
            <input
              type="date"
              name="dataFinal"
              value={dataFinal}
              onChange={(event) => setDataFinal(event.target.value)}
            />
          </label>
          <label>
            <span>Tipo: </span>
            <select name="tipo" value={tipo} onChange={(event) => setTipo(event.target.value)} required>
              <option value="Oferta">Selecione o tipo da placa</option>
              <option value="Oferta">Placa de Oferta</option>
              <option value="Aproveite">Placa de Aproveite</option>
              <option value="OfertaDupla">Placa de Oferta Dupla</option>
              <option value="AproveiteDupla">Placa de Aproveite Dupla</option>
            </select>
          </label>
          <label>
            <span>Enviar Arquivo em .PDF:</span>
            <input type="file" accept='.pdf' onChange={ handleFileChange } />
          </label>
          {segundaPlaca && (
            <>
            <span className='alerta'>SEGUNDA PLACA:</span>
            <label>
            <span>Título: </span>
            <input
              type="text"
              name="titulo"
              value={titulo2}
              onChange={(event) => setTitulo2(event.target.value)}
            />
          </label>
           <label>
            <span>Preço Inicial: </span>
            <input
              type="text"
              name="precoInicial"
              value={precoInicial2}
              onChange={(event) => setPrecoInicial2(event.target.value)}
              pattern="^\d+,\d{2}$"
              title="Use o formato com vírgula e dois dígitos após ela. Ex: 12,34"
            />
            </label>
          <label>
            <span>Preço Promocional: </span>
            <input
              type="text"
              name="precoReal"
              value={precoPromocional2}
              onChange={(event) => setPrecoPromocional2(event.target.value)}
              pattern="^\d+,\d{2}$"
              title="Use o formato com vírgula e dois dígitos após ela. Ex: 12,34"
            />
            </label>
          <label>
            <span>Data Inicial: </span>
            <input
              type="date"
              name="dataInicial"
              value={dataInicial2}
              onChange={(event) => setDataInicial2(event.target.value)}
            />
          </label>
          <label>
            <span>Data Final: </span>
            <input
              type="date"
              name="dataFinal"
              value={dataFinal2}
              onChange={(event) => setDataFinal2(event.target.value)}
            />
          </label>
          </>
          )}
          {!segundaPlaca && <button className='btnchecked' type="button" onClick={()=>addPlaca()}>Adicionar segunda placa horizontal</button>} 
          {segundaPlaca && <button className='btnchecked' type="button" onClick={()=>delPlaca()}>Remover segunda placa horizontal</button>}
        <button className='btnchecked' type="submit">Adicionar Placa</button>
        </form>
        <div id="buttons">
          <button className='btnchecked' onClick={ () => handlePrint() }>Imprimir Placa</button>
        </div>
        <br></br>
        <Data />
        <br></br>
        <footer>
          <span>Priscila Alves - priscila.contato@live.com</span>
        </footer>
      </header>
    </div>
  );
}

export default Placas;